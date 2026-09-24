FROM rust:1-slim-trixie@sha256:f47a8de237dcbb0b0ce1099901e60a89728e3d51f24e664b40e947171538ade7 AS build
RUN apt-get update && apt-get install -y --no-install-recommends g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /src
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release --locked
ENV FASTEMBED_CACHE_DIR=/models
RUN ./target/release/awesome-alternatives-api fetch-model

FROM gcr.io/distroless/cc-debian13:nonroot@sha256:54df941ed0d06a1bd95ef5e0ce391fd8d9f94b64782dc9a60062727849ee3f97
COPY --from=build /src/target/release/awesome-alternatives-api /usr/local/bin/awesome-alternatives-api
COPY --from=build /models /models
ENV BIND=0.0.0.0:3000 \
    FASTEMBED_CACHE_DIR=/models
EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/awesome-alternatives-api"]
