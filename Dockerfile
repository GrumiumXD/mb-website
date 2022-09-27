# backend image
FROM rust:1.64.0-slim-buster AS backend

# build the backend
WORKDIR /usr/src/mb-website
COPY ./Cargo.toml ./
COPY ./Cargo.lock ./
COPY ./src ./src
RUN cargo install --path .

# frontend image
FROM node:18.9.1-alpine3.15 AS frontend

# download dependencies
COPY ./frontend/package.json ./
COPY ./frontend/tsconfig.json ./
COPY ./frontend/tsconfig.node.json ./
COPY ./frontend/vite.config.ts ./
COPY ./frontend/yarn.lock ./
RUN yarn

# build the frontend
COPY ./frontend/index.html ./
COPY ./frontend/public ./public
COPY ./frontend/src ./src
RUN yarn build

# deployment image
FROM debian:11.5-slim

EXPOSE 8080

COPY --from=backend /usr/local/cargo/bin/mb-website /usr/local/bin/mb-website
COPY --from=frontend /dist /frontend

CMD ["mb-website", "-f", "/frontend"]