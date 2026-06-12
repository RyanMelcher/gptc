# gptcplays.com

Great Plains Theatre Commons site. Payload 3 + Next.js 16.

## Dev
- `pnpm install`
- `cp .env.example .env` and fill secrets
- `pnpm db:up`
- `pnpm dev` → http://localhost:3000
- Visit `/admin/create-first-user` to seed an admin account.

## Production deploy
Requires Docker on the host plus an existing Traefik instance with an
`external` network named `traefik` and a `letsencrypt` certresolver.

```bash
docker compose build
docker compose up -d
```

Traefik routes `gptcplays.com` (and `www.gptcplays.com` → apex) to the app
container's `:3000`. Postgres + media live on named volumes (`pgdata`, `media`).

Set `POSTGRES_PASSWORD`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL=https://gptcplays.com`,
`RESEND_API_KEY`, and `EMAIL_FROM` in `.env` before bringing the stack up.
