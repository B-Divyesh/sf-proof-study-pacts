FROM node:22-alpine AS frontend
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY frontend ./frontend
RUN npm run build

FROM rust:1.88-bookworm AS backend
WORKDIR /build
ARG BUILD_SHA=dev
ENV BUILD_SHA=${BUILD_SHA}
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release --locked
RUN mkdir -p /runtime-data && chown 65532:65532 /runtime-data

FROM gcr.io/distroless/cc-debian12:nonroot
WORKDIR /app
ARG BUILD_SHA=dev
ENV BUILD_SHA=${BUILD_SHA}
ENV STATIC_DIR=/app/public
COPY --from=backend --chown=65532:65532 /build/target/release/proof-pact /app/proof-pact
COPY --from=frontend --chown=65532:65532 /build/frontend/dist /app/public
COPY --from=backend --chown=65532:65532 /runtime-data /data
VOLUME ["/data"]
EXPOSE 8080
ENTRYPOINT ["/app/proof-pact"]
