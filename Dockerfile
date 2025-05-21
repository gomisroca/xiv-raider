##### DEPENDENCIES
FROM --platform=linux/amd64 node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

RUN npm ci

##### BUILDER
FROM --platform=linux/amd64 node:20-alpine AS builder

ARG DATABASE_URL
ARG DIRECT_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG DISCORD_ID
ARG DISCORD_SECRET
ARG BASE_URL

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV BASE_URL=${BASE_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}

RUN SKIP_ENV_VALIDATION=1 npm run build

##### RUNNER
FROM --platform=linux/amd64 node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["server.js"]
