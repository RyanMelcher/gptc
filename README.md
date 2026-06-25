# gptcplays.com

Great Plains Theatre Commons site. Payload 3 + Next.js 16.

## Dev
- `pnpm install`
- `cp .env.example .env` and fill secrets
- `pnpm db:up`
- `pnpm dev` → http://localhost:3000
- Visit `/admin/create-first-user` to seed an admin account.

## Production deploy
CI builds and pushes the app image to GHCR (`ghcr.io/<owner>/gtcp`) on every
push to `main`. The server pulls that image — it never builds.

Requires Docker on the host plus an existing Traefik instance with an
`external` network named `traefik` and a `letsencrypt` certresolver.

First time:
```bash
cp .env.example .env   # then fill secrets (see below)
# if the GHCR package is private, log the host in once:
echo "$GHCR_PAT" | docker login ghcr.io -u <github-user> --password-stdin
docker compose pull
docker compose up -d
```

Subsequent deploys (after CI publishes a new image):
```bash
docker compose pull && docker compose up -d
```

Traefik routes `gptcplays.com` (and `www.gptcplays.com` → apex) to the app
container's `:3000`. Postgres + media live on named volumes (`pgdata`, `media`).
Payload migrations under `src/migrations/` run automatically on container start.

Set these in `.env` before bringing the stack up:
`APP_IMAGE=ghcr.io/<owner>/gtcp:latest`, `POSTGRES_PASSWORD`, `PAYLOAD_SECRET`,
`NEXT_PUBLIC_SERVER_URL=https://gptcplays.com`, `RESEND_API_KEY`, `EMAIL_FROM`.

The GHCR package defaults to private. Either make it public in the repo's package
settings, or create a read-only PAT (`read:packages`) and `docker login` on the host
as shown above.
