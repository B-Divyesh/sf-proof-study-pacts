import './styles.css';

type Member = { name: string; role: string; joined: boolean };
type Snapshot = { label: string; proofState: string };
type Attempt = { id: number; author: string; role: string; proofText: string; explanation: string; createdAt: string; snapshots: Snapshot[] };
type Pact = {
  id: string; exerciseTitle: string; exerciseUrl: string; theorem: string; weekOf: string;
  status: string; demo: boolean; expiresAt?: string; currentMember: Member; members: Member[]; attempts: Attempt[];
};
type SessionResponse = { pact: Pact; memberToken: string };

class ApiRequestError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

const app = document.querySelector<HTMLDivElement>('#app')!;
const routeStatus = document.querySelector<HTMLDivElement>('#route-status')!;
const baseUrl = 'https://proof-study-pacts.sociobot.in';

const exercises = [
  {
    title: 'Natural Number Game — Add zero',
    url: 'https://adam.math.hhu.de/#/g/leanprover-community/nng4/world/Tutorial/level/4',
    theorem: 'theorem add_zero (n : ℕ) : n + 0 = n := by'
  },
  {
    title: 'Theorem Proving in Lean — Rewriting',
    url: 'https://leanprover.github.io/theorem_proving_in_lean4/tactics.html',
    theorem: 'example (a b c : Nat) (h₁ : a = b) (h₂ : b = c) : a = c := by'
  },
  {
    title: 'Mathematics in Lean — Sets and Functions',
    url: 'https://leanprover-community.github.io/mathematics_in_lean/C04_Sets_and_Functions.html',
    theorem: 'example (f : α → β) (s t : Set α) : f \` (s ∩ t) ⊆ f \` s ∩ f \` t := by'
  }
];

function esc(value: unknown): string {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]!);
}

function shell(content: string, demo = false): string {
  return `
    ${demo ? `<aside class="demo-banner" aria-label="Demo mode"><strong>Demo — sample data, nothing is saved</strong><span><button class="text-button" id="reset-demo" type="button">Reset demo</button><button class="text-button" id="start-real" type="button">Start for real</button></span></aside>` : ''}
    <header class="site-header">
      <a class="wordmark" href="/" data-link aria-label="Proof Pact home"><img src="/assets/pact-mark.svg" width="40" height="40" alt=""><span>Proof Pact</span></a>
      <nav aria-label="Main navigation"><a href="/demo" data-link>Demo</a><a href="/#make">Make a pact</a><a href="/privacy" data-link>Privacy</a></nav>
    </header>
    ${!navigator.onLine ? '<div class="network-banner" role="status">You are offline. Saved pages remain visible, but pact changes need a connection.</div>' : ''}
    ${content}
    <footer class="site-footer">
      <p><strong>Proof Pact</strong> <span>Weekly Lean proof work for pairs.</span></p>
      <nav aria-label="Footer navigation"><a href="/privacy" data-link>Privacy</a><a href="/terms" data-link>Terms</a><a href="https://sociobot.in">Built by Param Factory <span class="visually-hidden">(external site)</span></a></nav>
      <p class="build-note">Version 1.0 · Original generated illustration</p>
    </footer>`;
}

function setMeta(title: string, description: string, path: string): void {
  document.title = title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')!.content = description;
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')!.href = `${baseUrl}${path}`;
  for (const [selector, value] of [
    ['meta[property="og:title"]', title], ['meta[property="og:description"]', description],
    ['meta[property="og:url"]', `${baseUrl}${path}`], ['meta[name="twitter:title"]', title],
    ['meta[name="twitter:description"]', description]
  ]) document.querySelector<HTMLMetaElement>(selector)!.content = value;
}

function navigate(path: string, replace = false): void {
  const scrollKey = `route-scroll:${location.pathname}${location.search}${location.hash}`;
  const isDemoQuery = location.search.includes('demo=1');
  const recordedScroll = isDemoQuery ? scrollY : Math.max(scrollY, Number(sessionStorage.getItem(scrollKey) || 0));
  if (isDemoQuery) sessionStorage.removeItem(scrollKey); else sessionStorage.setItem(scrollKey, String(recordedScroll));
  history.replaceState({ ...(history.state || {}), scrollY: recordedScroll }, '', location.href);
  if (replace) history.replaceState({ scrollY: 0 }, '', path); else history.pushState({ scrollY: 0 }, '', path);
  render(0);
}

async function api<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  let response: Response;
  try { response = await fetch(path, { ...options, headers }); }
  catch { throw new Error('The server could not be reached. Check your connection and try again.'); }
  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: 'The server returned an unreadable error. Try again.' }));
    throw new ApiRequestError(body.error || 'The request failed. Try again.', response.status);
  }
  const type = response.headers.get('content-type') || '';
  return (type.includes('json') ? response.json() : response.text()) as Promise<T>;
}

function landing(restoreScroll = 0): void {
  setMeta('Proof Pact — Work through Lean proofs together', 'Make a weekly Lean proof pact, compare attempts, record proof states, and export one Markdown note.', '/');
  const monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const prefill = JSON.parse(localStorage.getItem('pact:next-prefill') || 'null') as Partial<Pact & { creatorName: string; partnerName: string }> | null;
  const week = prefill?.weekOf || monday.toISOString().slice(0, 10);
  const recent = JSON.parse(localStorage.getItem('pact:recent') || '[]') as { id: string; title: string; weekOf: string }[];
  app.innerHTML = shell(`
    <main id="main">
      <section class="hero" aria-labelledby="page-title">
        <div class="hero-copy">
          <p class="eyebrow"><span class="lamp" aria-hidden="true"></span>Weekly Lean routine</p>
          <h1 id="page-title" tabindex="-1">Work one Lean proof with a partner</h1>
          <p class="lede">For independent Lean learners who need a weekly routine for attempts, proof states, and explanations in their own words.</p>
          <div class="hero-actions"><a class="button primary" href="/demo" data-link>Try it with sample data</a><span>A ready pact opens in one click.</span></div>
          <ul class="plain-facts" aria-label="Product facts"><li>Free to use</li><li>Partner-visible notes need consent</li><li>Records work; run Lean to check it</li></ul>
        </div>
        <figure class="hero-art">
          <picture><source media="(max-width: 700px)" srcset="/assets/hero-console-720.webp"><img src="/assets/hero-console-1280.webp" width="1280" height="853" alt="Two proof-work instruments connected to one shared theorem dial." fetchpriority="high" decoding="async"></picture>
          <figcaption>Two attempts become one shared Markdown note.</figcaption>
        </figure>
      </section>

      <section class="make-pact" id="make" aria-labelledby="make-title">
        <div class="section-number" aria-hidden="true">01</div>
        <div class="section-intro"><p class="eyebrow">Create a pact</p><h2 id="make-title">Make this week’s pact</h2><p>Choose one public exercise. One person is Prover. The other is Explainer.</p></div>
        <form id="create-form" class="instrument-form">
          <div class="field-pair">
            <label>Your name<input name="creatorName" autocomplete="name" value="${esc(prefill?.creatorName || '')}" minlength="2" maxlength="60" required></label>
            <label>Partner name<input name="partnerName" autocomplete="off" value="${esc(prefill?.partnerName || '')}" minlength="2" maxlength="60" required></label>
          </div>
          <label>Public Lean exercise<select name="exercise" id="exercise-select">${exercises.map((e, i) => `<option value="${i}">${esc(e.title)}</option>`).join('')}</select></label>
          <label>Exercise link<input name="exerciseUrl" id="exercise-url" type="url" value="${exercises[0].url}" required></label>
          <label>Theorem to attempt<textarea name="theorem" id="theorem" rows="3" maxlength="800" required>${esc(exercises[0].theorem)}</textarea></label>
          <label>Week of<input name="weekOf" type="date" value="${week}" required></label>
          <label class="check-row"><input name="consent" type="checkbox" required><span>I agree that my partner can read the notes I add to this pact.</span></label>
          <div class="form-end"><button class="button primary" type="submit">Create pact and invite</button><p>This browser saves your private access link.</p></div>
          <p id="form-status" class="form-status" role="status" aria-live="polite"></p>
        </form>
      </section>

      <section class="procedure" aria-labelledby="procedure-title">
        <div class="section-number" aria-hidden="true">02</div>
        <div class="section-intro"><p class="eyebrow">Three steps</p><h2 id="procedure-title">How the pair routine works</h2></div>
        <ol class="steps">
          <li><span>1</span><div><h3>Commit to one theorem</h3><p>Pick a public Lean exercise and send the invite link.</p></div></li>
          <li><span>2</span><div><h3>Bring separate attempts</h3><p>The Prover records code. The Explainer names each reasoning step.</p></div></li>
          <li><span>3</span><div><h3>Export the shared note</h3><p>Keep the proof states, attempts, and explanations in Markdown.</p></div></li>
        </ol>
      </section>

      <section class="limits" aria-labelledby="limits-title">
        <div class="limit-dial" aria-hidden="true"><span></span></div>
        <div><p class="eyebrow">What Proof Pact does not do</p><h2 id="limits-title">A routine, not a proof judge</h2><p>Proof Pact records your work. Run Lean to check it. Partners decide whether an explanation makes sense.</p></div>
      </section>
      ${recent.length ? `<section class="recent-pacts" aria-labelledby="recent-title"><p class="eyebrow">Your recent work</p><h2 id="recent-title">Return to a saved pact</h2><ul>${recent.map(item => `<li><a data-link href="/pact/${esc(item.id)}">${esc(item.title)} <span>Week of ${esc(item.weekOf)}</span></a></li>`).join('')}</ul></section>` : ''}
    </main>`);

  bindNavigation();
  const select = document.querySelector<HTMLSelectElement>('#exercise-select')!;
  select.addEventListener('change', () => {
    const exercise = exercises[Number(select.value)];
    document.querySelector<HTMLInputElement>('#exercise-url')!.value = exercise.url;
    document.querySelector<HTMLTextAreaElement>('#theorem')!.value = exercise.theorem;
  });
  document.querySelector<HTMLFormElement>('#create-form')!.addEventListener('submit', createPact);
  if (restoreScroll >= 0) focusHeading(restoreScroll);
}

async function createPact(event: SubmitEvent): Promise<void> {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const status = form.querySelector<HTMLParagraphElement>('#form-status')!;
  const data = new FormData(form);
  const exercise = exercises[Number(data.get('exercise'))];
  button.disabled = true; button.textContent = 'Creating pact…'; status.textContent = '';
  try {
    const session = await api<SessionResponse>('/api/pacts', { method: 'POST', body: JSON.stringify({
      creatorName: data.get('creatorName'), partnerName: data.get('partnerName'),
      exerciseTitle: exercise.title, exerciseUrl: data.get('exerciseUrl'), theorem: data.get('theorem'),
      weekOf: data.get('weekOf'), consent: data.get('consent') === 'on'
    }) });
    localStorage.setItem(`pact:${session.pact.id}:token`, session.memberToken);
    rememberPact(session.pact);
    navigate(`/pact/${session.pact.id}`);
  } catch (reason) { status.textContent = (reason as Error).message; button.disabled = false; button.textContent = 'Create pact and invite'; }
}

async function demoPage(reset = false): Promise<void> {
  setMeta('Demo — Proof Pact', 'Try a complete Lean study pact with sample attempts and proof states.', '/demo');
  app.innerHTML = shell(`<main id="main" class="loading-page"><h1 tabindex="-1">Loading the sample pact</h1><div class="loader" aria-hidden="true"><span></span></div><p>The two sample learners are already at work.</p></main>`, true);
  bindNavigation(); bindDemoActions();
  try {
    const saved = !reset ? sessionStorage.getItem('demo:pact') : null;
    let session: SessionResponse;
    if (saved) {
      try {
        const { id, token } = JSON.parse(saved) as { id: string; token: string };
        const pact = await api<Pact>(`/api/pacts/${id}`, {}, token);
        session = { pact, memberToken: token };
      } catch (reason) {
        if (!(reason instanceof ApiRequestError) || ![404, 410].includes(reason.status)) throw reason;
        sessionStorage.removeItem('demo:pact');
        session = await createDemoSession();
      }
    } else {
      session = await createDemoSession();
    }
    renderWorkspace(session.pact, session.memberToken, true);
  } catch (reason) { renderError('The sample pact did not load', (reason as Error).message, '/demo', 'Try the sample again'); }
}

async function createDemoSession(): Promise<SessionResponse> {
  const session = await api<SessionResponse>('/api/demo', { method: 'POST' });
  sessionStorage.setItem('demo:pact', JSON.stringify({ id: session.pact.id, token: session.memberToken }));
  return session;
}

async function pactPage(id: string): Promise<void> {
  let token = localStorage.getItem(`pact:${id}:token`) || '';
  if (location.hash.startsWith('#key=')) {
    token = decodeURIComponent(location.hash.slice(5));
    localStorage.setItem(`pact:${id}:token`, token);
    history.replaceState({}, '', location.pathname);
  }
  if (!token) { renderError('Your private pact key is missing', 'Open the private link you received when this pact was created or joined.', '/', 'Make a new pact'); return; }
  loading('Loading your pact', 'Reading the latest partner notes.');
  try { renderWorkspace(await api<Pact>(`/api/pacts/${id}`, {}, token), token, false); }
  catch (reason) { renderError('Your pact did not load', (reason as Error).message, '/', 'Return home'); }
}

async function joinPage(id: string): Promise<void> {
  setMeta('Join a pact — Proof Pact', 'Join your partner for one weekly Lean proof exercise.', `/join/${id}`);
  loading('Join one Lean proof pact', 'Reading the invitation.');
  try {
    const info = await api<{ exerciseTitle: string; weekOf: string; creatorName: string; partnerName: string; status: string }>(`/api/pacts/${id}/public`);
    app.innerHTML = shell(`<main id="main" class="join-page"><section class="join-panel"><p class="eyebrow">Invitation from ${esc(info.creatorName)}</p><h1 tabindex="-1">Join one Lean proof pact</h1><dl><div><dt>Exercise</dt><dd>${esc(info.exerciseTitle)}</dd></div><div><dt>Week of</dt><dd>${esc(formatDate(info.weekOf))}</dd></div><div><dt>Your role</dt><dd>Explainer</dd></div></dl>
      <form id="join-form"><label>Your name<input name="partnerName" value="${esc(info.partnerName)}" minlength="2" maxlength="60" required></label><label class="check-row"><input name="consent" type="checkbox" required><span>I agree that my partner can read the notes I add to this pact.</span></label><button class="button primary" type="submit">Join pact as Explainer</button><p class="form-status" role="status" aria-live="polite"></p></form></section></main>`);
    bindNavigation();
    document.querySelector<HTMLFormElement>('#join-form')!.addEventListener('submit', async event => {
      event.preventDefault(); const form = event.currentTarget as HTMLFormElement; const data = new FormData(form); const button = form.querySelector<HTMLButtonElement>('button')!; const status = form.querySelector<HTMLParagraphElement>('.form-status')!;
      button.disabled = true; button.textContent = 'Joining pact…';
      try {
        const session = await api<SessionResponse>(`/api/pacts/${id}/join`, { method: 'POST', body: JSON.stringify({ partnerName: data.get('partnerName'), consent: data.get('consent') === 'on' }) });
        localStorage.setItem(`pact:${id}:token`, session.memberToken); navigate(`/pact/${id}`);
      } catch (reason) { status.textContent = (reason as Error).message; button.disabled = false; button.textContent = 'Join pact as Explainer'; }
    });
    focusHeading();
  } catch (reason) { renderError('This invitation did not load', (reason as Error).message, '/', 'Return home'); }
}

function renderWorkspace(pact: Pact, token: string, demo: boolean): void {
  setMeta(`${demo ? 'Demo' : pact.exerciseTitle} — Proof Pact`, 'Record proof attempts, proof states, and partner explanations.', demo ? '/demo' : `/pact/${pact.id}`);
  const joined = pact.members.filter(member => member.joined).length;
  const invite = `${location.origin}/join/${pact.id}`;
  const privateLink = `${location.origin}/pact/${pact.id}#key=${encodeURIComponent(token)}`;
  app.innerHTML = shell(`<main id="main" class="workspace">
    <section class="work-head"><div><p class="eyebrow"><span class="lamp active" aria-hidden="true"></span>${demo ? 'Sample session' : `Week of ${esc(formatDate(pact.weekOf))}`}</p><h1 tabindex="-1">${esc(pact.exerciseTitle)}</h1><p class="theorem"><code>${esc(pact.theorem)}</code></p><a href="${esc(pact.exerciseUrl)}" target="_blank" rel="noreferrer">Open the public exercise <span class="visually-hidden">(new tab)</span> ↗</a></div><div class="session-dial" aria-label="Session status: ${esc(pact.status)}"><span class="needle ${pact.status}"></span><strong>${esc(pact.status)}</strong></div></section>
    <section class="pair-strip" aria-labelledby="pair-title"><div><p class="eyebrow">Pair channel</p><h2 id="pair-title">Two roles, one session</h2></div><ul>${pact.members.map(m => `<li><span class="role-light ${m.joined ? 'on' : ''}" aria-hidden="true"></span><strong>${esc(m.name)}</strong><span>${esc(m.role)} · ${m.joined ? 'joined' : 'waiting'}</span></li>`).join('')}</ul>${!demo && joined < 2 ? `<div class="invite-box"><label>Partner invite link<input id="invite-link" readonly value="${esc(invite)}"></label><button class="button secondary" id="copy-invite" type="button">Copy invite link</button></div>` : ''}${!demo ? `<button class="text-button private-link" id="copy-private" type="button" data-private-link="${esc(privateLink)}">Copy my private link</button>` : ''}<p id="copy-status" class="form-status" role="status" aria-live="polite"></p></section>
    <section class="attempt-bench" aria-labelledby="attempts-title"><div class="bench-title"><div><p class="eyebrow">Attempt recorder</p><h2 id="attempts-title">Compare the work, not just the answer</h2></div><span class="counter">${pact.attempts.length} attempt${pact.attempts.length === 1 ? '' : 's'}</span></div>
      <div class="attempt-list">${pact.attempts.length ? pact.attempts.map(attemptTemplate).join('') : `<div class="empty-state"><div class="empty-tape" aria-hidden="true"></div><h3>No attempts recorded yet</h3><p>Add your proof code, one failed state, and your explanation.</p></div>`}</div>
    </section>
    <section class="record-panel" aria-labelledby="record-title"><div><p class="eyebrow">Your station · ${esc(pact.currentMember.role)}</p><h2 id="record-title">Record an independent attempt</h2><p>Paste what you tried. Explain why each key step should work.</p></div>
      <form id="attempt-form"><label>Lean proof attempt<textarea name="proofText" rows="8" maxlength="10000" required placeholder="by\n  ..."></textarea></label><label>Explanation in your own words<textarea name="explanation" rows="5" minlength="10" maxlength="4000" required></textarea></label><fieldset id="snapshots"><legend>Proof-state snapshots</legend><div class="snapshot-row"><label>Snapshot label<input name="snapshotLabel" value="First stuck state" maxlength="80" required></label><label>Proof state<textarea name="proofState" rows="4" maxlength="4000" required></textarea></label><button class="text-button remove-snapshot" type="button">Remove snapshot</button></div></fieldset><button class="button secondary" id="add-snapshot" type="button">Add another proof state</button><div class="form-end"><button class="button primary" type="submit">Save proof attempt</button><p>Both partners can read saved notes.</p></div><p class="form-status" role="status" aria-live="polite"></p></form>
    </section>
    <section class="export-panel" aria-labelledby="export-title"><div><p class="eyebrow">Session output</p><h2 id="export-title">Keep one readable record</h2><p>The Markdown note includes the theorem, both roles, every attempt, and each proof state.</p></div><div class="export-actions"><button class="button primary" id="export-notes" type="button">Export Markdown note</button><button class="button secondary" id="finish-session" type="button" ${pact.attempts.length < 2 ? 'disabled' : ''}>Mark session complete</button>${!demo && pact.status === 'complete' ? '<button class="button secondary" id="next-week" type="button">Create next week’s pact</button>' : ''}<p class="form-status" role="status" aria-live="polite">${pact.attempts.length < 2 ? 'Two attempts are needed before the session can finish.' : ''}</p></div></section>
  </main>`, demo);
  bindNavigation(); if (demo) bindDemoActions();
  document.querySelector('#copy-invite')?.addEventListener('click', () => copyText(invite, 'Invite link copied.'));
  document.querySelector('#copy-private')?.addEventListener('click', () => copyText(privateLink, 'Private link copied. Keep it private.'));
  document.querySelector<HTMLButtonElement>('#add-snapshot')!.addEventListener('click', addSnapshot);
  document.querySelectorAll<HTMLButtonElement>('.remove-snapshot').forEach(button => button.addEventListener('click', removeSnapshot));
  document.querySelector<HTMLFormElement>('#attempt-form')!.addEventListener('submit', event => saveAttempt(event, pact, token, demo));
  document.querySelector<HTMLButtonElement>('#export-notes')!.addEventListener('click', () => exportNotes(pact, token));
  document.querySelector<HTMLButtonElement>('#finish-session')!.addEventListener('click', () => finishSession(pact, token, demo));
  document.querySelector<HTMLButtonElement>('#next-week')?.addEventListener('click', () => startNextWeek(pact));
  if (!demo) rememberPact(pact);
  focusHeading();
}

function attemptTemplate(attempt: Attempt): string {
  return `<article class="attempt"><header><div><span class="role-tag">${esc(attempt.role)}</span><h3>${esc(attempt.author)}’s attempt</h3></div><time datetime="${esc(attempt.createdAt)}">${esc(new Date(attempt.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }))}</time></header><div class="attempt-columns"><div><h4>Lean code</h4><pre><code>${esc(attempt.proofText)}</code></pre></div><div><h4>Explanation</h4><p>${esc(attempt.explanation)}</p></div></div>${attempt.snapshots.length ? `<details><summary>${attempt.snapshots.length} proof-state snapshot${attempt.snapshots.length === 1 ? '' : 's'}</summary>${attempt.snapshots.map(s => `<section class="snapshot"><h4>${esc(s.label)}</h4><pre>${esc(s.proofState)}</pre></section>`).join('')}</details>` : ''}</article>`;
}

function addSnapshot(): void {
  const fieldset = document.querySelector<HTMLFieldSetElement>('#snapshots')!;
  if (fieldset.querySelectorAll('.snapshot-row').length >= 8) return;
  const row = document.createElement('div'); row.className = 'snapshot-row';
  row.innerHTML = `<label>Snapshot label<input name="snapshotLabel" value="Next proof state" maxlength="80" required></label><label>Proof state<textarea name="proofState" rows="4" maxlength="4000" required></textarea></label><button class="text-button remove-snapshot" type="button">Remove snapshot</button>`;
  fieldset.append(row); row.querySelector<HTMLButtonElement>('button')!.addEventListener('click', removeSnapshot); row.querySelector<HTMLInputElement>('input')!.focus();
}

function removeSnapshot(event: Event): void {
  const rows = document.querySelectorAll('.snapshot-row');
  if (rows.length === 1) { (event.currentTarget as HTMLButtonElement).closest('.snapshot-row')?.querySelector<HTMLTextAreaElement>('textarea')?.focus(); return; }
  (event.currentTarget as HTMLButtonElement).closest('.snapshot-row')?.remove();
}

async function saveAttempt(event: SubmitEvent, pact: Pact, token: string, demo: boolean): Promise<void> {
  event.preventDefault(); const form = event.currentTarget as HTMLFormElement; const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!; const status = form.querySelector<HTMLParagraphElement>('.form-status')!; const data = new FormData(form);
  const labels = data.getAll('snapshotLabel'); const states = data.getAll('proofState');
  button.disabled = true; button.textContent = 'Saving attempt…'; status.textContent = '';
  try {
    const updated = await api<Pact>(`/api/pacts/${pact.id}/attempts`, { method: 'POST', body: JSON.stringify({ proofText: data.get('proofText'), explanation: data.get('explanation'), snapshots: labels.map((label, index) => ({ label, proofState: states[index] })) }) }, token);
    renderWorkspace(updated, token, demo); document.querySelector('#attempts-title')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  } catch (reason) { status.textContent = (reason as Error).message; button.disabled = false; button.textContent = 'Save proof attempt'; }
}

async function exportNotes(pact: Pact, token: string): Promise<void> {
  const status = document.querySelector<HTMLDivElement>('.export-actions .form-status')!;
  try {
    const markdown = await api<string>(`/api/pacts/${pact.id}/export`, { method: 'POST' }, token);
    const href = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown' }));
    const link = document.createElement('a'); link.href = href; link.download = `proof-pact-${pact.id}.md`; document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(href); status.textContent = 'Markdown note exported.';
  } catch (reason) { status.textContent = (reason as Error).message; }
}

async function finishSession(pact: Pact, token: string, demo: boolean): Promise<void> {
  const status = document.querySelector<HTMLDivElement>('.export-actions .form-status')!;
  try { renderWorkspace(await api<Pact>(`/api/pacts/${pact.id}/complete`, { method: 'POST' }, token), token, demo); }
  catch (reason) { status.textContent = (reason as Error).message; }
}

async function copyText(text: string, message: string): Promise<void> {
  const status = document.querySelector<HTMLParagraphElement>('#copy-status')!;
  try { await navigator.clipboard.writeText(text); status.textContent = message; }
  catch { status.textContent = 'The link could not be copied. Select the link and copy it manually.'; }
}

function privacy(): void {
  setMeta('Privacy — Proof Pact', 'How Proof Pact stores pact notes and access links.', '/privacy');
  app.innerHTML = shell(`<main id="main" class="policy-page"><p class="eyebrow">Plain policy</p><h1 tabindex="-1">Privacy for pact partners</h1><p class="policy-date">Effective 28 August 2026</p><section><h2>What the service stores</h2><p>Proof Pact stores names, exercise details, roles, attempts, explanations, proof states, consent, session dates, status, and pact IDs.</p><p>It also stores record IDs, ordering, timestamps, and one-way access-key hashes.</p><p>It does not ask for or store email addresses.</p></section><section><h2>Who can read a pact</h2><p>Each partner gets a private access link. Anyone with that link can read and change the pact. Keep it private.</p></section><section><h2>Demo data</h2><p>Demo pacts use a separate server workspace. They expire within 24 hours. The browser keeps the demo key in session storage.</p></section><section><h2>Network and tracking</h2><p>The app sends pact changes to this service. It does not load third-party analytics, fonts, or scripts.</p></section><section><h2>Removal</h2><p>Contact <a href="mailto:privacy@sociobot.in">privacy@sociobot.in</a> with the pact ID to request removal.</p></section></main>`);
  bindNavigation(); focusHeading();
}

function terms(): void {
  setMeta('Terms — Proof Pact', 'The terms for using Proof Pact with a study partner.', '/terms');
  app.innerHTML = shell(`<main id="main" class="policy-page"><p class="eyebrow">Use agreement</p><h1 tabindex="-1">Terms for using Proof Pact</h1><p class="policy-date">Effective 28 August 2026</p><section><h2>Use public exercises</h2><p>Add only Lean exercises that you may share. Do not paste private course or assessment material.</p></section><section><h2>Respect your partner</h2><p>Get consent before sharing notes. Do not send an invitation to someone who did not expect it.</p></section><section><h2>No proof guarantee</h2><p>Proof Pact records study work. It does not check that code compiles or that an explanation is correct. Use Lean to check proofs.</p></section><section><h2>Availability</h2><p>This free service may change or stop. Export notes you need to keep.</p></section><section><h2>Contact</h2><p>Questions can go to <a href="mailto:support@sociobot.in">support@sociobot.in</a>.</p></section></main>`);
  bindNavigation(); focusHeading();
}

function notFound(restoreScroll = 0): void {
  setMeta('Page not found — Proof Pact', 'Return to Proof Pact and make a weekly Lean study pact.', '/404');
  app.innerHTML = shell(`<main id="main" class="not-found"><div class="broken-dial" aria-hidden="true"><span></span></div><p class="eyebrow">Reading 404</p><h1 tabindex="-1">This dial points nowhere</h1><p>The page may have moved, or the pact link is incomplete.</p><a class="button primary" href="/" data-link>Return to Proof Pact</a></main>`);
  bindNavigation(); focusHeading(restoreScroll);
}

function loading(title: string, note: string): void {
  app.innerHTML = shell(`<main id="main" class="loading-page"><h1 tabindex="-1">${esc(title)}</h1><div class="loader" aria-hidden="true"><span></span></div><p>${esc(note)}</p></main>`);
  bindNavigation();
}

function renderError(title: string, detail: string, href: string, label: string): void {
  setMeta('Problem — Proof Pact', detail, location.pathname);
  app.innerHTML = shell(`<main id="main" class="error-page"><p class="eyebrow">The signal stopped</p><h1 tabindex="-1">${esc(title)}</h1><p role="alert">${esc(detail)}</p><a class="button primary" href="${esc(href)}" data-link>${esc(label)}</a></main>`);
  bindNavigation(); focusHeading();
}

function bindDemoActions(): void {
  document.querySelector('#reset-demo')?.addEventListener('click', () => { sessionStorage.removeItem('demo:pact'); demoPage(true); });
  document.querySelector('#start-real')?.addEventListener('click', () => { sessionStorage.removeItem('demo:pact'); navigate('/#make'); setTimeout(() => document.querySelector('#make')?.scrollIntoView(), 0); });
}

function bindNavigation(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[data-link]').forEach(link => link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || link.target) return;
    const url = new URL(link.href); if (url.origin !== location.origin) return; event.preventDefault(); navigate(url.pathname + url.search + url.hash);
  }));
}

function focusHeading(restoreScroll = 0): void {
  const heading = document.querySelector<HTMLHeadingElement>('main h1');
  if (heading) { heading.focus({ preventScroll: true }); routeStatus.textContent = heading.textContent || ''; }
  scrollTo({ top: restoreScroll, behavior: 'auto' });
  requestAnimationFrame(() => scrollTo({ top: restoreScroll, behavior: 'auto' }));
}

function rememberPact(pact: Pact): void {
  if (pact.demo) return;
  const saved = JSON.parse(localStorage.getItem('pact:recent') || '[]') as { id: string; title: string; weekOf: string }[];
  localStorage.setItem('pact:recent', JSON.stringify([{ id: pact.id, title: pact.exerciseTitle, weekOf: pact.weekOf }, ...saved.filter(item => item.id !== pact.id)].slice(0, 8)));
}

function startNextWeek(pact: Pact): void {
  const next = new Date(`${pact.weekOf}T12:00:00`); next.setDate(next.getDate() + 7);
  localStorage.setItem('pact:next-prefill', JSON.stringify({ creatorName: pact.currentMember.name, partnerName: pact.members.find(member => member.name !== pact.currentMember.name)?.name || '', exerciseTitle: pact.exerciseTitle, exerciseUrl: pact.exerciseUrl, theorem: pact.theorem, weekOf: next.toISOString().slice(0, 10) }));
  navigate('/#make');
  setTimeout(() => document.querySelector('#make')?.scrollIntoView(), 0);
}

function formatDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
}

function render(restoreScroll = 0): void {
  const path = location.pathname;
  if (location.search.includes('demo=1')) { sessionStorage.removeItem(`route-scroll:${location.pathname}${location.search}${location.hash}`); navigate('/demo', true); return; }
  if (path === '/') landing(restoreScroll);
  else if (path === '/demo') demoPage();
  else if (path === '/privacy') privacy();
  else if (path === '/terms') terms();
  else if (path === '/404' || path === '/404.html') notFound(restoreScroll);
  else if (/^\/pact\/[^/]+$/.test(path)) pactPage(path.split('/')[2]);
  else if (/^\/join\/[^/]+$/.test(path)) joinPage(path.split('/')[2]);
  else notFound(restoreScroll);
}

addEventListener('popstate', event => {
  const stored = Number(sessionStorage.getItem(`route-scroll:${location.pathname}${location.search}${location.hash}`) || 0);
  const stateScroll = (event.state as { scrollY?: number } | null)?.scrollY || 0;
  render(Math.max(stored, stateScroll));
});
addEventListener('scroll', () => {
  if (!location.search.includes('demo=1')) sessionStorage.setItem(`route-scroll:${location.pathname}${location.search}${location.hash}`, String(scrollY));
}, { passive: true });
addEventListener('online', () => render());
addEventListener('offline', () => render());
if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => undefined));
render(-1);
