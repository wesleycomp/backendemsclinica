#!/usr/bin/env bash
set -e

echo "Aguardando Postgres em ${DB_HOST:-db}:${DB_PORT:-5432}..."
until nc -z "${DB_HOST:-db}" "${DB_PORT:-5432}"; do
  sleep 1
done
echo "Postgres OK."

# extensão opcional (não falha se já existir)
psql -h "${DB_HOST:-db}" -p "${DB_PORT:-5432}" -U "${DB_USER:-postgres}" -d "${DB_NAME:-emsclinica}" -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;" >/dev/null 2>&1 || true

if [ "${RUN_MIGRATIONS}" = "1" ]; then
  echo "Rodando migrations..."
  node -r ts-node/register -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run || true
else
  echo "Sem migrations (RUN_MIGRATIONS != 1)."
fi

exec npm run dev
