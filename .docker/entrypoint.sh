#!/usr/bin/env bash
set -e

echo "Iniciando API EMS Clínica…"

# NÃO rodar migrations em produção
if [ "$NODE_ENV" = "production" ] && [ "$RUN_MIGRATIONS" = "1" ]; then
  echo "🚫 Em produção migrations são bloqueadas. Defina RUN_MIGRATIONS=0."
  exit 1
fi

# Teste rápido de banco
if command -v nc >/dev/null 2>&1; then
  echo "Aguardando Postgres em ${DB_HOST}:${DB_PORT}…"
  while ! nc -z "$DB_HOST" "$DB_PORT"; do sleep 1; done
  echo "Postgres OK."
fi

# NÃO rodar migrations em produção
if [ "${RUN_MIGRATIONS}" = "1" ]; then
  echo "Executando migrations (RUN_MIGRATIONS=1)…"
  npm run typeorm migration:run || true
else
  echo "Sem migrations (RUN_MIGRATIONS != 1)."
fi

npm run dev
