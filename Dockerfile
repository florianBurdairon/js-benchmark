# Node image
FROM node:22 AS node
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install @prisma/client
RUN npx prisma generate
CMD ["node", "index.js"]

# Deno image
FROM denoland/deno:2.0.6 AS deno
WORKDIR /usr/src/app
COPY . .
COPY ./prisma/schema.deno.prisma ./prisma/schema.prisma
COPY ./prisma/prisma.deno.js ./prisma/prisma.js
RUN apt-get update -y && apt-get install -y openssl
RUN deno install
RUN deno run -A --unstable npm:prisma generate
CMD ["deno", "--allow-all","index.js" ]

# Bun image
FROM oven/bun:latest AS bun
WORKDIR /usr/src/app
COPY . .
RUN bun install
RUN bun add @prisma/client
RUN bunx prisma generate
CMD ["bun", "index.js"]