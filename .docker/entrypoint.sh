#!/usr/bin/env bash
set -e

echo "Aguardando Postgres..."
until nc -z "$DB_HOST" "${DB_PORT:-5432}"; do sleep 1; done
echo "Postgres OK."

if [ "$RUN_MIGRATIONS" = "1" ]; then
  echo "Rodando migrations (RUN_MIGRATIONS=1)..."
  npm run migrate:run || true
else
  echo "Sem migrations (RUN_MIGRATIONS != 1)."
fi

exec npm run dev
