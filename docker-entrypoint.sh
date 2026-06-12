#!/bin/sh
set -e

# Apply Payload migrations if any exist.
# Schema auto-sync is disabled in production; commit migrations under src/migrations/.
if [ -d /app/src/migrations ] && [ -n "$(ls -A /app/src/migrations 2>/dev/null)" ]; then
  echo "[entrypoint] applying payload migrations..."
  node ./node_modules/payload/bin.js migrate || {
    echo "[entrypoint] migrate failed" >&2
    exit 1
  }
fi

exec node server.js
