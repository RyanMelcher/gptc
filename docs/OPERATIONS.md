# Operations runbook (production)

Production runs via `docker-compose.yml`: `app` (from GHCR), `db` (Postgres 16),
and `db-backup` (scheduled dumps), behind Traefik.

## Where data lives (and why the server folder is nearly empty)

Data is **not** in the project folder. It's in named Docker volumes on the host:

| Volume | Contents | Mounted at |
|--------|----------|------------|
| `<project>_pgdata` | Postgres database (all content, users, versions) | `db:/var/lib/postgresql/data` |
| `<project>_media`  | Uploaded files + generated image sizes | `app:/app/media` |

`<project>` is the compose project name (the folder name, unless `COMPOSE_PROJECT_NAME` is set). On disk: `/var/lib/docker/volumes/<project>_pgdata/_data`.

Inspect: `docker volume ls` · `docker volume inspect <project>_pgdata`.

**Persistence guarantees**
- ✅ Survives `docker compose pull` + `docker compose up -d` (app image upgrades).
- ✅ Survives `docker compose down` (no `-v`), host reboots, container recreation.
- ❌ Destroyed by `docker compose down -v` or `docker volume rm`. **Never run `down -v` in production.** Use `docker compose down` (no flag) or `docker compose restart`.

## Deploying a new version

CI publishes `ghcr.io/RyanMelcher/gptc:latest` on every push to `main`. On the server:

```bash
docker compose pull app          # fetch the new image
docker compose up -d app         # recreate only the app container
docker compose logs -f app       # watch migrations + startup
```

The app entrypoint runs `payload migrate` on start, then serves. The DB volume is untouched by image changes — content persists.

## Database migrations

- Schema changes ship as committed files in `src/migrations/` and apply automatically on container start (`docker-entrypoint.sh` → `payload migrate`).
- Migrations are additive/tracked in the `payload_migrations` table; they do **not** wipe data.
- **Before a risky/large migration, take a manual snapshot first** (see below), so you can roll back.

## Backups

The `db-backup` service dumps Postgres on a schedule (`BACKUP_SCHEDULE`, default every 6h) into **`./backups`** on the host, with retention (`BACKUP_KEEP_DAYS/WEEKS/MONTHS`). Dumps use `--clean --if-exists --no-owner --no-privileges` so they restore cleanly.

**Verify it's running**
```bash
docker compose ps db-backup
ls -lh ./backups/last/          # newest dumps (daily/weekly/monthly symlinks)
```

**Take a manual snapshot on demand**
```bash
docker compose exec -T db pg_dump -U gptc -d gptc \
  --clean --if-exists --no-owner --no-privileges \
  | gzip > backups/manual-$(date +%Y%m%d-%H%M%S).sql.gz
```

**Copy backups off-host (do this — a backup on the same box isn't a backup):**
```bash
rsync -avz user@server:/path/to/project/backups/ ./offsite-backups/
```
(or point a nightly job / object-storage sync at `./backups`.)

## Restore from a backup

```bash
# from a plain .sql
gunzip -c backups/<file>.sql.gz | docker compose exec -T db psql -U gptc -d gptc

# or a dump produced by db-backup (already includes DROP/CREATE)
zcat backups/daily/gptc-<timestamp>.sql.gz | docker compose exec -T db psql -U gptc -d gptc
```

Media files are separate — restore them into the `media` volume if lost:
```bash
tar -C /var/lib/docker/volumes/<project>_media/_data -xzf media-backup.tar.gz
```

## Admin auth ("You are not allowed to do this action")

Payload rejects admin saves whose browser Origin isn't in its CORS/CSRF allow-list. That list is built from `APP_DOMAIN` (apex + www) and `NEXT_PUBLIC_SERVER_URL`. If saves intermittently fail:

1. Confirm the running container's env:
   ```bash
   docker compose exec app printenv | grep -E 'NEXT_PUBLIC_SERVER_URL|APP_DOMAIN'
   ```
2. `NEXT_PUBLIC_SERVER_URL` must be the exact public origin (`https://greatplainstheatrecommons.org`), and `APP_DOMAIN` the bare apex. Fix `.env`, then `docker compose up -d app`.
3. Always use the canonical apex host for `/admin` (Traefik redirects `www` → apex).

## Safety checklist

- `PAYLOAD_SECRET` ≥ 32 chars and **stable** — changing it invalidates all admin sessions/tokens.
- `POSTGRES_PASSWORD` strong; the `db` service is on the `internal` network only (never published to the host) — good, keep it that way.
- Keep `.env` off git (it is) and backed up securely — it holds the DB password + Payload secret.
- Off-host backup copies configured.
