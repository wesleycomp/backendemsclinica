#!/usr/bin/env bash
set -e
REPO="/home/app/backendemsclinica"

echo "== EMS Clínica: Deploy (repo-cwd) =="
cd "$REPO"

# stash automático se houver alterações locais
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo ">> working tree sujo: fazendo stash..."
  git stash push -u -m "deploy-$(date +%F-%H%M%S)" || true
fi

git fetch --all --prune
git checkout master || git checkout -t origin/master
git pull --rebase

npm ci
npm run build

# PM2 rodando a partir do repositório (ecosystem local, NÃO versionado)
if pm2 describe apiems >/dev/null 2>&1; then
  pm2 startOrReload "$REPO/ecosystem.repo.config.js" --update-env
else
  pm2 start "$REPO/ecosystem.repo.config.js"
fi

pm2 save
echo "OK."
