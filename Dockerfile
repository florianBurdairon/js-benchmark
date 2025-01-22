# Node image
FROM node:22 AS node
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["node", "index.js"]

# Deno image
FROM denoland/deno:2.1.4 AS deno
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["deno", "index.js"]

# Bun image
FROM oven/bun:latest AS bun
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["bun", "index.js"]