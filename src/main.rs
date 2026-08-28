use axum::{
    extract::{Path, Request, State},
    http::{header, HeaderMap, HeaderValue, StatusCode},
    middleware::{self, Next},
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use chrono::{Duration, Utc};
use rand::{distributions::Alphanumeric, rngs::OsRng, Rng};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use sqlx::{sqlite::SqliteConnectOptions, FromRow, SqlitePool};
use std::{
    collections::{HashMap, VecDeque},
    net::SocketAddr,
    path::PathBuf,
    str::FromStr,
    sync::Arc,
    time::{Duration as StdDuration, Instant},
};
use tokio::sync::Mutex;
use tower_http::{
    services::{ServeDir, ServeFile},
    trace::TraceLayer,
};
use tracing::{info, warn};

const BUILD_SHA: &str = match option_env!("BUILD_SHA") {
    Some(value) => value,
    None => "dev",
};

#[derive(Clone)]
struct AppState {
    db: SqlitePool,
    limits: Arc<Mutex<HashMap<String, VecDeque<Instant>>>>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct ApiError {
    error: String,
}

fn error(status: StatusCode, message: impl Into<String>) -> Response {
    (
        status,
        Json(ApiError {
            error: message.into(),
        }),
    )
        .into_response()
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CreatePact {
    creator_name: String,
    partner_name: String,
    exercise_title: String,
    exercise_url: String,
    theorem: String,
    week_of: String,
    consent: bool,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct JoinPact {
    partner_name: String,
    consent: bool,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct SaveAttempt {
    proof_text: String,
    explanation: String,
    snapshots: Vec<SnapshotInput>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct SnapshotInput {
    label: String,
    proof_state: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct SessionResponse {
    pact: PactView,
    member_token: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct PactView {
    id: String,
    exercise_title: String,
    exercise_url: String,
    theorem: String,
    week_of: String,
    status: String,
    demo: bool,
    expires_at: Option<String>,
    current_member: MemberView,
    members: Vec<MemberView>,
    attempts: Vec<AttemptView>,
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct MemberView {
    name: String,
    role: String,
    joined: bool,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct AttemptView {
    id: i64,
    author: String,
    role: String,
    proof_text: String,
    explanation: String,
    created_at: String,
    snapshots: Vec<SnapshotView>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct SnapshotView {
    label: String,
    proof_state: String,
}

#[derive(Debug, Serialize, FromRow)]
struct PactRow {
    id: String,
    exercise_title: String,
    exercise_url: String,
    theorem: String,
    week_of: String,
    creator_name: String,
    partner_name: String,
    status: String,
    demo: i64,
    expires_at: Option<String>,
}

#[derive(Debug, FromRow)]
struct MemberRow {
    name: String,
    role: String,
    joined_at: Option<String>,
    token_hash: Option<String>,
}

#[derive(Debug, FromRow)]
struct AttemptRow {
    id: i64,
    author: String,
    role: String,
    proof_text: String,
    explanation: String,
    created_at: String,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .json()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let supplied_db_path = std::env::var("DATABASE_PATH").ok();
    let db_source = if supplied_db_path.is_some() {
        "supplied"
    } else {
        "generated default"
    };
    let db_path = supplied_db_path.unwrap_or_else(|| {
        if std::fs::create_dir_all("/data").is_ok() {
            "/data/proof-pact.db".to_string()
        } else {
            "proof-pact.db".to_string()
        }
    });
    let options = SqliteConnectOptions::from_str(&format!("sqlite://{db_path}"))
        .expect("valid database path")
        .create_if_missing(true)
        .foreign_keys(true);
    let db = SqlitePool::connect_with(options)
        .await
        .expect("open database");
    migrate(&db).await.expect("migrate database");
    cleanup_expired(&db).await.ok();

    let state = AppState {
        db,
        limits: Arc::new(Mutex::new(HashMap::new())),
    };
    let static_dir = std::env::var("STATIC_DIR").unwrap_or_else(|_| "frontend/dist".into());
    let index_path = PathBuf::from(&static_dir).join("index.html");
    let files = ServeDir::new(&static_dir).fallback(ServeFile::new(index_path));

    let app = Router::new()
        .route("/health", get(health))
        .route("/api/demo", post(create_demo))
        .route("/api/pacts", post(create_pact))
        .route("/api/pacts/{id}", get(get_pact))
        .route("/api/pacts/{id}/public", get(get_public_pact))
        .route("/api/pacts/{id}/join", post(join_pact))
        .route("/api/pacts/{id}/attempts", post(save_attempt))
        .route("/api/pacts/{id}/complete", post(complete_pact))
        .route("/api/pacts/{id}/export", post(export_pact))
        .fallback_service(files)
        .layer(middleware::from_fn(security_headers))
        .layer(middleware::from_fn_with_state(state.clone(), rate_limit))
        .layer(TraceLayer::new_for_http())
        .with_state(state);

    let port = std::env::var("PORT")
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(8080);
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("bind server");
    info!(port, build_sha = BUILD_SHA, database = %db_path, database_config = db_source, token_config = "generated per pact", "configuration ready");
    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .expect("serve application");
}

async fn migrate(db: &SqlitePool) -> Result<(), sqlx::Error> {
    sqlx::query("PRAGMA journal_mode = WAL").execute(db).await?;
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS pacts (
            id TEXT PRIMARY KEY, exercise_title TEXT NOT NULL, exercise_url TEXT NOT NULL,
            theorem TEXT NOT NULL, week_of TEXT NOT NULL, creator_name TEXT NOT NULL,
            partner_name TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'waiting',
            demo INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL, expires_at TEXT
        )",
    )
    .execute(db)
    .await?;
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS members (
            id INTEGER PRIMARY KEY AUTOINCREMENT, pact_id TEXT NOT NULL, name TEXT NOT NULL,
            role TEXT NOT NULL, consent INTEGER NOT NULL, token_hash TEXT UNIQUE,
            joined_at TEXT, FOREIGN KEY(pact_id) REFERENCES pacts(id) ON DELETE CASCADE
        )",
    )
    .execute(db)
    .await?;
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT, pact_id TEXT NOT NULL,
            member_token_hash TEXT NOT NULL, proof_text TEXT NOT NULL,
            explanation TEXT NOT NULL, created_at TEXT NOT NULL,
            FOREIGN KEY(pact_id) REFERENCES pacts(id) ON DELETE CASCADE
        )",
    )
    .execute(db)
    .await?;
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS snapshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT, attempt_id INTEGER NOT NULL,
            label TEXT NOT NULL, proof_state TEXT NOT NULL, position INTEGER NOT NULL,
            FOREIGN KEY(attempt_id) REFERENCES attempts(id) ON DELETE CASCADE
        )",
    )
    .execute(db)
    .await?;
    Ok(())
}

async fn cleanup_expired(db: &SqlitePool) -> Result<(), sqlx::Error> {
    sqlx::query("DELETE FROM pacts WHERE expires_at IS NOT NULL AND expires_at < ?")
        .bind(Utc::now().to_rfc3339())
        .execute(db)
        .await?;
    Ok(())
}

async fn health() -> Json<serde_json::Value> {
    Json(serde_json::json!({"status": "ok", "buildSha": BUILD_SHA}))
}

async fn create_pact(State(state): State<AppState>, Json(input): Json<CreatePact>) -> Response {
    if let Err(message) = validate_create(&input) {
        return error(StatusCode::UNPROCESSABLE_ENTITY, message);
    }
    let id = random_code(10).to_lowercase();
    let token = random_code(40);
    let token_hash = hash_token(&token);
    let now = Utc::now().to_rfc3339();
    let mut tx = match state.db.begin().await {
        Ok(tx) => tx,
        Err(_) => {
            return error(
                StatusCode::INTERNAL_SERVER_ERROR,
                "The pact could not be created. Try again.",
            )
        }
    };
    let result = sqlx::query("INSERT INTO pacts (id, exercise_title, exercise_url, theorem, week_of, creator_name, partner_name, status, demo, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'waiting', 0, ?)")
        .bind(&id).bind(input.exercise_title.trim()).bind(input.exercise_url.trim())
        .bind(input.theorem.trim()).bind(input.week_of.trim()).bind(input.creator_name.trim())
        .bind(input.partner_name.trim()).bind(&now).execute(&mut *tx).await;
    if result.is_err() {
        return error(
            StatusCode::INTERNAL_SERVER_ERROR,
            "The pact could not be created. Try again.",
        );
    }
    if sqlx::query("INSERT INTO members (pact_id, name, role, consent, token_hash, joined_at) VALUES (?, ?, 'Prover', 1, ?, ?)")
        .bind(&id).bind(input.creator_name.trim()).bind(&token_hash).bind(&now).execute(&mut *tx).await.is_err()
    {
        return error(StatusCode::INTERNAL_SERVER_ERROR, "The pact could not be created. Try again.");
    }
    if sqlx::query(
        "INSERT INTO members (pact_id, name, role, consent) VALUES (?, ?, 'Explainer', 0)",
    )
    .bind(&id)
    .bind(input.partner_name.trim())
    .execute(&mut *tx)
    .await
    .is_err()
        || tx.commit().await.is_err()
    {
        return error(
            StatusCode::INTERNAL_SERVER_ERROR,
            "The pact could not be created. Try again.",
        );
    }
    session_response(&state.db, &id, &token).await
}

async fn join_pact(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(input): Json<JoinPact>,
) -> Response {
    if !input.consent {
        return error(
            StatusCode::UNPROCESSABLE_ENTITY,
            "Agree to share your pact notes with your partner before joining.",
        );
    }
    if let Err(message) = validate_short("Your name", &input.partner_name, 2, 60) {
        return error(StatusCode::UNPROCESSABLE_ENTITY, message);
    }
    let pact = match fetch_pact_row(&state.db, &id).await {
        Ok(Some(row)) => row,
        _ => {
            return error(
                StatusCode::NOT_FOUND,
                "This pact was not found. Ask your partner for a fresh link.",
            )
        }
    };
    if pact
        .expires_at
        .as_ref()
        .is_some_and(|date| date < &Utc::now().to_rfc3339())
    {
        return error(
            StatusCode::GONE,
            "This demo pact expired. Open a fresh demo to continue.",
        );
    }
    let member = sqlx::query_as::<_, MemberRow>("SELECT name, role, joined_at, token_hash FROM members WHERE pact_id = ? AND role = 'Explainer'")
        .bind(&id).fetch_optional(&state.db).await.ok().flatten();
    let Some(member) = member else {
        return error(
            StatusCode::NOT_FOUND,
            "This pact has no open partner place.",
        );
    };
    if member.joined_at.is_some() {
        return error(
            StatusCode::CONFLICT,
            "Your partner already joined this pact. Ask them for their saved pact link.",
        );
    }
    if member.name.to_lowercase() != input.partner_name.trim().to_lowercase() {
        return error(
            StatusCode::UNPROCESSABLE_ENTITY,
            "Enter the partner name shown on the invitation.",
        );
    }
    let token = random_code(40);
    let result = sqlx::query("UPDATE members SET consent = 1, token_hash = ?, joined_at = ? WHERE pact_id = ? AND role = 'Explainer' AND joined_at IS NULL")
        .bind(hash_token(&token)).bind(Utc::now().to_rfc3339()).bind(&id).execute(&state.db).await;
    if result.is_err() {
        return error(
            StatusCode::INTERNAL_SERVER_ERROR,
            "The pact could not be joined. Try again.",
        );
    }
    sqlx::query("UPDATE pacts SET status = 'active' WHERE id = ?")
        .bind(&id)
        .execute(&state.db)
        .await
        .ok();
    session_response(&state.db, &id, &token).await
}

async fn get_public_pact(State(state): State<AppState>, Path(id): Path<String>) -> Response {
    match fetch_pact_row(&state.db, &id).await {
        Ok(Some(row)) => Json(serde_json::json!({
            "id": row.id, "exerciseTitle": row.exercise_title, "weekOf": row.week_of,
            "creatorName": row.creator_name, "partnerName": row.partner_name,
            "status": row.status, "demo": row.demo == 1
        }))
        .into_response(),
        _ => error(
            StatusCode::NOT_FOUND,
            "This pact was not found. Ask your partner for a fresh link.",
        ),
    }
}

async fn get_pact(
    State(state): State<AppState>,
    Path(id): Path<String>,
    headers: HeaderMap,
) -> Response {
    let Some(token) = bearer(&headers) else {
        return error(
            StatusCode::UNAUTHORIZED,
            "This pact link is missing its access key. Open your saved pact link.",
        );
    };
    pact_response(&state.db, &id, token).await
}

async fn save_attempt(
    State(state): State<AppState>,
    Path(id): Path<String>,
    headers: HeaderMap,
    Json(input): Json<SaveAttempt>,
) -> Response {
    let Some(token) = bearer(&headers) else {
        return error(
            StatusCode::UNAUTHORIZED,
            "Open your saved pact link before adding an attempt.",
        );
    };
    if let Err(message) = validate_attempt(&input) {
        return error(StatusCode::UNPROCESSABLE_ENTITY, message);
    }
    let token_hash = hash_token(token);
    if !is_member(&state.db, &id, &token_hash).await {
        return error(
            StatusCode::FORBIDDEN,
            "This access key does not belong to the pact. Open your saved pact link.",
        );
    }
    let mut tx = match state.db.begin().await {
        Ok(tx) => tx,
        Err(_) => {
            return error(
                StatusCode::INTERNAL_SERVER_ERROR,
                "The attempt was not saved. Try again.",
            )
        }
    };
    let result = sqlx::query("INSERT INTO attempts (pact_id, member_token_hash, proof_text, explanation, created_at) VALUES (?, ?, ?, ?, ?)")
        .bind(&id).bind(&token_hash).bind(input.proof_text.trim()).bind(input.explanation.trim()).bind(Utc::now().to_rfc3339())
        .execute(&mut *tx).await;
    let attempt_id = match result {
        Ok(value) => value.last_insert_rowid(),
        Err(_) => {
            return error(
                StatusCode::INTERNAL_SERVER_ERROR,
                "The attempt was not saved. Try again.",
            )
        }
    };
    for (position, snapshot) in input.snapshots.iter().enumerate() {
        if sqlx::query(
            "INSERT INTO snapshots (attempt_id, label, proof_state, position) VALUES (?, ?, ?, ?)",
        )
        .bind(attempt_id)
        .bind(snapshot.label.trim())
        .bind(snapshot.proof_state.trim())
        .bind(position as i64)
        .execute(&mut *tx)
        .await
        .is_err()
        {
            return error(
                StatusCode::INTERNAL_SERVER_ERROR,
                "The proof states were not saved. Try again.",
            );
        }
    }
    if tx.commit().await.is_err() {
        return error(
            StatusCode::INTERNAL_SERVER_ERROR,
            "The attempt was not saved. Try again.",
        );
    }
    pact_response(&state.db, &id, token).await
}

async fn complete_pact(
    State(state): State<AppState>,
    Path(id): Path<String>,
    headers: HeaderMap,
) -> Response {
    let Some(token) = bearer(&headers) else {
        return error(
            StatusCode::UNAUTHORIZED,
            "Open your saved pact link before finishing the session.",
        );
    };
    if !is_member(&state.db, &id, &hash_token(token)).await {
        return error(
            StatusCode::FORBIDDEN,
            "This access key does not belong to the pact.",
        );
    }
    let attempt_count: i64 = sqlx::query_scalar(
        "SELECT COUNT(DISTINCT member_token_hash) FROM attempts WHERE pact_id = ?",
    )
    .bind(&id)
    .fetch_one(&state.db)
    .await
    .unwrap_or(0);
    if attempt_count < 2 {
        return error(
            StatusCode::UNPROCESSABLE_ENTITY,
            "Add two independent attempts before finishing the session.",
        );
    }
    sqlx::query("UPDATE pacts SET status = 'complete' WHERE id = ?")
        .bind(&id)
        .execute(&state.db)
        .await
        .ok();
    pact_response(&state.db, &id, token).await
}

async fn export_pact(
    State(state): State<AppState>,
    Path(id): Path<String>,
    headers: HeaderMap,
) -> Response {
    let Some(token) = bearer(&headers) else {
        return error(
            StatusCode::UNAUTHORIZED,
            "Open your saved pact link before exporting notes.",
        );
    };
    let view = match build_view(&state.db, &id, token).await {
        Ok(view) => view,
        Err(response) => return response,
    };
    let mut out = format!("# Proof Pact — {}\n\n", view.exercise_title);
    out.push_str(&format!(
        "- Week of: {}\n- Exercise: [{}]({})\n- Status: {}\n- Pair: {}\n\n",
        view.week_of,
        view.exercise_title,
        view.exercise_url,
        view.status,
        view.members
            .iter()
            .map(|m| format!("{} ({})", m.name, m.role))
            .collect::<Vec<_>>()
            .join(" and ")
    ));
    out.push_str(&format!(
        "## Theorem\n\n````lean\n{}\n````\n\n",
        view.theorem
    ));
    for attempt in view.attempts {
        out.push_str(&format!(
            "## {} — {}\n\n### Attempt\n\n````lean\n{}\n````\n\n### Explanation\n\n{}\n\n",
            attempt.author, attempt.role, attempt.proof_text, attempt.explanation
        ));
        if !attempt.snapshots.is_empty() {
            out.push_str("### Proof-state snapshots\n\n");
            for snapshot in attempt.snapshots {
                out.push_str(&format!(
                    "#### {}\n\n````text\n{}\n````\n\n",
                    snapshot.label, snapshot.proof_state
                ));
            }
        }
    }
    out.push_str("---\nExported from Proof Pact. Lean checks proof acceptance; partners explain the reasoning.\n");
    let mut response = out.into_response();
    response.headers_mut().insert(
        header::CONTENT_TYPE,
        HeaderValue::from_static("text/markdown; charset=utf-8"),
    );
    response.headers_mut().insert(
        header::CONTENT_DISPOSITION,
        HeaderValue::from_str(&format!("attachment; filename=proof-pact-{}.md", id)).unwrap(),
    );
    response
}

async fn create_demo(State(state): State<AppState>) -> Response {
    cleanup_expired(&state.db).await.ok();
    let id = format!("demo-{}", random_code(8).to_lowercase());
    let prover_token = random_code(40);
    let explainer_token = random_code(40);
    let prover_hash = hash_token(&prover_token);
    let explainer_hash = hash_token(&explainer_token);
    let now = Utc::now();
    let expires = (now + Duration::hours(24)).to_rfc3339();
    let mut tx = match state.db.begin().await {
        Ok(tx) => tx,
        Err(_) => {
            return error(
                StatusCode::INTERNAL_SERVER_ERROR,
                "The sample pact could not start. Try again.",
            )
        }
    };
    if sqlx::query("INSERT INTO pacts (id, exercise_title, exercise_url, theorem, week_of, creator_name, partner_name, status, demo, created_at, expires_at) VALUES (?, 'Natural Number Game — Add zero', 'https://adam.math.hhu.de/#/g/leanprover-community/nng4/world/Tutorial/level/4', 'theorem add_zero (n : ℕ) : n + 0 = n := by', ?, 'Mira', 'Theo', 'active', 1, ?, ?)")
        .bind(&id).bind(now.format("%Y-%m-%d").to_string()).bind(now.to_rfc3339()).bind(&expires).execute(&mut *tx).await.is_err() { return error(StatusCode::INTERNAL_SERVER_ERROR, "The sample pact could not start. Try again."); }
    for (name, role, hash) in [
        ("Mira", "Prover", &prover_hash),
        ("Theo", "Explainer", &explainer_hash),
    ] {
        if sqlx::query("INSERT INTO members (pact_id, name, role, consent, token_hash, joined_at) VALUES (?, ?, ?, 1, ?, ?)")
            .bind(&id).bind(name).bind(role).bind(hash).bind(now.to_rfc3339()).execute(&mut *tx).await.is_err() { return error(StatusCode::INTERNAL_SERVER_ERROR, "The sample pact could not start. Try again."); }
    }
    let first = sqlx::query("INSERT INTO attempts (pact_id, member_token_hash, proof_text, explanation, created_at) VALUES (?, ?, '  induction n with\n  | zero => rfl\n  | succ n ih => simp', 'I tried induction first. The goal closed, but this proof uses more machinery than the theorem needs.', ?)")
        .bind(&id).bind(&prover_hash).bind(now.to_rfc3339()).execute(&mut *tx).await;
    let attempt_id = match first {
        Ok(value) => value.last_insert_rowid(),
        Err(_) => {
            return error(
                StatusCode::INTERNAL_SERVER_ERROR,
                "The sample pact could not start. Try again.",
            )
        }
    };
    sqlx::query("INSERT INTO snapshots (attempt_id, label, proof_state, position) VALUES (?, 'Before simp', 'n : ℕ\n⊢ n + 0 = n', 0), (?, 'After induction', 'case succ n ih\n⊢ n + 1 = Nat.succ n', 1)")
        .bind(attempt_id).bind(attempt_id).execute(&mut *tx).await.ok();
    if sqlx::query("INSERT INTO attempts (pact_id, member_token_hash, proof_text, explanation, created_at) VALUES (?, ?, '  simpa using Nat.add_zero n', 'The library theorem states this equality directly. The simpa step matches its conclusion to our goal.', ?)")
        .bind(&id).bind(&explainer_hash).bind((now + Duration::minutes(8)).to_rfc3339()).execute(&mut *tx).await.is_err() {
        return error(StatusCode::INTERNAL_SERVER_ERROR, "The sample pact could not start. Try again.");
    }
    if tx.commit().await.is_err() {
        return error(
            StatusCode::INTERNAL_SERVER_ERROR,
            "The sample pact could not start. Try again.",
        );
    }
    session_response(&state.db, &id, &prover_token).await
}

async fn session_response(db: &SqlitePool, id: &str, token: &str) -> Response {
    match build_view(db, id, token).await {
        Ok(pact) => Json(SessionResponse {
            pact,
            member_token: token.to_string(),
        })
        .into_response(),
        Err(response) => response,
    }
}

async fn pact_response(db: &SqlitePool, id: &str, token: &str) -> Response {
    match build_view(db, id, token).await {
        Ok(pact) => Json(pact).into_response(),
        Err(response) => response,
    }
}

async fn build_view(db: &SqlitePool, id: &str, token: &str) -> Result<PactView, Response> {
    let pact = fetch_pact_row(db, id)
        .await
        .map_err(|_| {
            error(
                StatusCode::INTERNAL_SERVER_ERROR,
                "The pact could not be loaded. Try again.",
            )
        })?
        .ok_or_else(|| {
            error(
                StatusCode::NOT_FOUND,
                "This pact was not found. Ask your partner for a fresh link.",
            )
        })?;
    if pact
        .expires_at
        .as_ref()
        .is_some_and(|date| date < &Utc::now().to_rfc3339())
    {
        return Err(error(
            StatusCode::GONE,
            "This demo pact expired. Open a fresh demo to continue.",
        ));
    }
    let token_hash = hash_token(token);
    let members = sqlx::query_as::<_, MemberRow>(
        "SELECT name, role, joined_at, token_hash FROM members WHERE pact_id = ? ORDER BY id",
    )
    .bind(id)
    .fetch_all(db)
    .await
    .map_err(|_| {
        error(
            StatusCode::INTERNAL_SERVER_ERROR,
            "The pact members could not be loaded. Try again.",
        )
    })?;
    let current = members
        .iter()
        .find(|m| m.token_hash.as_deref() == Some(&token_hash))
        .ok_or_else(|| {
            error(
                StatusCode::FORBIDDEN,
                "This access key does not belong to the pact. Open your saved pact link.",
            )
        })?;
    let current_member = MemberView {
        name: current.name.clone(),
        role: current.role.clone(),
        joined: true,
    };
    let member_views = members
        .iter()
        .map(|m| MemberView {
            name: m.name.clone(),
            role: m.role.clone(),
            joined: m.joined_at.is_some(),
        })
        .collect();
    let rows = sqlx::query_as::<_, AttemptRow>("SELECT a.id, m.name AS author, m.role, a.proof_text, a.explanation, a.created_at FROM attempts a JOIN members m ON m.token_hash = a.member_token_hash WHERE a.pact_id = ? ORDER BY a.id")
        .bind(id).fetch_all(db).await.map_err(|_| error(StatusCode::INTERNAL_SERVER_ERROR, "The pact attempts could not be loaded. Try again."))?;
    let mut attempts = Vec::new();
    for row in rows {
        let snapshots = sqlx::query_as::<_, (String, String)>(
            "SELECT label, proof_state FROM snapshots WHERE attempt_id = ? ORDER BY position",
        )
        .bind(row.id)
        .fetch_all(db)
        .await
        .unwrap_or_default()
        .into_iter()
        .map(|(label, proof_state)| SnapshotView { label, proof_state })
        .collect();
        attempts.push(AttemptView {
            id: row.id,
            author: row.author,
            role: row.role,
            proof_text: row.proof_text,
            explanation: row.explanation,
            created_at: row.created_at,
            snapshots,
        });
    }
    Ok(PactView {
        id: pact.id,
        exercise_title: pact.exercise_title,
        exercise_url: pact.exercise_url,
        theorem: pact.theorem,
        week_of: pact.week_of,
        status: pact.status,
        demo: pact.demo == 1,
        expires_at: pact.expires_at,
        current_member,
        members: member_views,
        attempts,
    })
}

async fn fetch_pact_row(db: &SqlitePool, id: &str) -> Result<Option<PactRow>, sqlx::Error> {
    sqlx::query_as("SELECT id, exercise_title, exercise_url, theorem, week_of, creator_name, partner_name, status, demo, expires_at FROM pacts WHERE id = ?")
        .bind(id).fetch_optional(db).await
}

async fn is_member(db: &SqlitePool, id: &str, token_hash: &str) -> bool {
    sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM members WHERE pact_id = ? AND token_hash = ? AND consent = 1",
    )
    .bind(id)
    .bind(token_hash)
    .fetch_one(db)
    .await
    .unwrap_or(0)
        == 1
}

fn validate_create(input: &CreatePact) -> Result<(), String> {
    validate_short("Your name", &input.creator_name, 2, 60)?;
    validate_short("Partner name", &input.partner_name, 2, 60)?;
    validate_short("Exercise title", &input.exercise_title, 3, 120)?;
    validate_short("Theorem", &input.theorem, 8, 800)?;
    if input
        .creator_name
        .trim()
        .eq_ignore_ascii_case(input.partner_name.trim())
    {
        return Err("Use two different names for the pact partners.".into());
    }
    if !input.consent {
        return Err("Agree to share pact notes with your partner before creating the pact.".into());
    }
    let parsed = url::Url::parse(input.exercise_url.trim())
        .map_err(|_| "Enter a valid public Lean exercise link.".to_string())?;
    let allowed = [
        "leanprover-community.github.io",
        "leanprover.github.io",
        "github.com",
        "adam.math.hhu.de",
        "lean-lang.org",
    ];
    if parsed.scheme() != "https"
        || !parsed
            .host_str()
            .is_some_and(|host| allowed.contains(&host))
    {
        return Err(
            "Use an HTTPS exercise link from Lean, Mathlib, GitHub, or Natural Number Game.".into(),
        );
    }
    chrono::NaiveDate::parse_from_str(input.week_of.trim(), "%Y-%m-%d")
        .map_err(|_| "Choose a valid week date.".to_string())?;
    Ok(())
}

fn validate_attempt(input: &SaveAttempt) -> Result<(), String> {
    validate_short("Proof attempt", &input.proof_text, 3, 10_000)?;
    validate_short("Explanation", &input.explanation, 10, 4_000)?;
    if input.snapshots.is_empty() {
        return Err("Add at least one proof-state snapshot before saving your attempt.".into());
    }
    if input.snapshots.len() > 8 {
        return Err("Keep each attempt to eight proof-state snapshots or fewer.".into());
    }
    for snapshot in &input.snapshots {
        validate_short("Snapshot label", &snapshot.label, 2, 80)?;
        validate_short("Proof state", &snapshot.proof_state, 2, 4_000)?;
    }
    Ok(())
}

fn validate_short(label: &str, value: &str, min: usize, max: usize) -> Result<(), String> {
    let count = value.trim().chars().count();
    if count < min {
        return Err(format!("{label} needs at least {min} characters."));
    }
    if count > max {
        return Err(format!("{label} must stay under {max} characters."));
    }
    Ok(())
}

fn bearer(headers: &HeaderMap) -> Option<&str> {
    headers
        .get(header::AUTHORIZATION)?
        .to_str()
        .ok()?
        .strip_prefix("Bearer ")
}

fn random_code(length: usize) -> String {
    OsRng
        .sample_iter(&Alphanumeric)
        .take(length)
        .map(char::from)
        .collect()
}

fn hash_token(token: &str) -> String {
    format!("{:x}", Sha256::digest(token.as_bytes()))
}

async fn rate_limit(State(state): State<AppState>, request: Request, next: Next) -> Response {
    if !request.uri().path().starts_with("/api/") {
        return next.run(request).await;
    }
    let key = request
        .headers()
        .get("x-forwarded-for")
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.split(',').next())
        .unwrap_or("local")
        .trim()
        .to_string();
    let now = Instant::now();
    let mut limits = state.limits.lock().await;
    let events = limits.entry(key).or_default();
    while events
        .front()
        .is_some_and(|time| now.duration_since(*time) > StdDuration::from_secs(1))
    {
        events.pop_front();
    }
    let cap = if request.method() == axum::http::Method::GET {
        40
    } else {
        20
    };
    if events.len() >= cap {
        drop(limits);
        let mut response = error(
            StatusCode::TOO_MANY_REQUESTS,
            "Too many requests arrived at once. Wait one second and try again.",
        );
        response
            .headers_mut()
            .insert(header::RETRY_AFTER, HeaderValue::from_static("1"));
        return response;
    }
    events.push_back(now);
    drop(limits);
    next.run(request).await
}

async fn security_headers(request: Request, next: Next) -> Response {
    let asset = request.uri().path().starts_with("/assets/");
    let mut response = next.run(request).await;
    let headers = response.headers_mut();
    headers.insert(
        "x-content-type-options",
        HeaderValue::from_static("nosniff"),
    );
    headers.insert(
        "referrer-policy",
        HeaderValue::from_static("strict-origin-when-cross-origin"),
    );
    headers.insert("x-frame-options", HeaderValue::from_static("DENY"));
    headers.insert(
        "permissions-policy",
        HeaderValue::from_static("camera=(), microphone=(), geolocation=()"),
    );
    headers.insert("content-security-policy", HeaderValue::from_static("default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"));
    if asset {
        headers.insert(
            header::CACHE_CONTROL,
            HeaderValue::from_static("public, max-age=31536000, immutable"),
        );
    }
    response
}

async fn shutdown_signal() {
    let ctrl_c = async {
        tokio::signal::ctrl_c()
            .await
            .expect("install Ctrl+C handler");
    };
    #[cfg(unix)]
    let terminate = async {
        tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
            .expect("install signal handler")
            .recv()
            .await;
    };
    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();
    tokio::select! { _ = ctrl_c => {}, _ = terminate => {} }
    warn!("shutdown signal received");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rejects_non_public_exercise_host() {
        let input = CreatePact {
            creator_name: "Ada".into(),
            partner_name: "Emmy".into(),
            exercise_title: "A theorem".into(),
            exercise_url: "https://example.com/private".into(),
            theorem: "theorem one_eq_one : 1 = 1 := by".into(),
            week_of: "2026-08-24".into(),
            consent: true,
        };
        assert!(
            validate_create(&input).unwrap_err().contains("public")
                || validate_create(&input).unwrap_err().contains("Lean")
        );
    }

    #[test]
    fn requires_a_proof_state() {
        let input = SaveAttempt {
            proof_text: "by rfl".into(),
            explanation: "Both sides reduce to the same term.".into(),
            snapshots: vec![],
        };
        assert!(validate_attempt(&input)
            .unwrap_err()
            .contains("proof-state"));
    }
}
