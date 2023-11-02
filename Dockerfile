FROM node:20.9-slim AS dependency
WORKDIR /app
COPY . .
RUN npm ci

FROM node:20.9-slim AS builder
WORKDIR /app
COPY . .
COPY --from=dependency /app/node_modules ./node_modules
RUN npm run build

FROM node:20.9-slim AS deploy
RUN apt-get -y update
RUN apt-get install -y ghostscript
WORKDIR /app
COPY --from=dependency /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY package.json .
EXPOSE 5000
ENTRYPOINT [ "npm", "start" ]