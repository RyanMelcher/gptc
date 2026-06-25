FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm generate:types && pnpm generate:importmap && pnpm build

# Production node_modules for both the server and the `payload migrate` CLI. Next's
# standalone output only traces what the app imports, so the migrate CLI is missing
# deps (croner, the db adapter, …) and sharp is missing its libvips native lib.
# A full prod install has all of it intact. tsx is a dev dep that `payload migrate`
# needs to load the TS migrations, so it's added on top.
FROM node:22-alpine AS prod-deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
RUN cd /tmp && npm init -y >/dev/null 2>&1 \
 && npm install --no-audit --no-fund tsx@4.22.4 \
 && cp -R /tmp/node_modules/. /app/node_modules/ \
 && rm -rf /tmp/node_modules /tmp/package.json

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache libc6-compat tini
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Full prod node_modules replaces the slim traced copy bundled in .next/standalone,
# so both the server and the migrate CLI resolve everything they need.
COPY --from=prod-deps --chown=nextjs:nodejs /app/node_modules ./node_modules
# docker-entrypoint.sh runs `payload migrate` on start, which loads the TS config
# and its imports (collections, globals, migrations) via tsx. That needs the full
# source tree plus tsconfig.json for the @/* path aliases.
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh && mkdir -p ./media && chown nextjs:nodejs ./media

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

ENTRYPOINT ["/sbin/tini", "--", "./docker-entrypoint.sh"]
