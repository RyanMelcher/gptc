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
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/payload ./node_modules/payload
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@payloadcms ./node_modules/@payloadcms
COPY --from=builder --chown=nextjs:nodejs /app/src/payload.config.ts ./src/payload.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/src/payload-types.ts ./src/payload-types.ts
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh && mkdir -p ./media && chown nextjs:nodejs ./media

# Next.js standalone tracing drops sharp's libvips native lib (@img/sharp-libvips-*)
# on linux/musl, so the binding fails to dlopen at runtime. Install a complete
# sharp for this platform in isolation and place it in node_modules, replacing
# the partial pnpm-linked copy so resolution is flat and self-contained.
RUN rm -rf node_modules/sharp node_modules/@img \
 && mkdir -p /tmp/sharp-install && cd /tmp/sharp-install \
 && npm init -y >/dev/null 2>&1 \
 && npm install --no-audit --no-fund --include=optional sharp@0.35.1 \
 && cp -R /tmp/sharp-install/node_modules/. /app/node_modules/ \
 && chown -R nextjs:nodejs /app/node_modules/sharp /app/node_modules/@img /app/node_modules/detect-libc \
 && rm -rf /tmp/sharp-install

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

ENTRYPOINT ["/sbin/tini", "--", "./docker-entrypoint.sh"]
