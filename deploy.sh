#!/usr/bin/env bash
set -e
REPO="/home/app/backendemsclinica"
RUNTIME="/srv/emsclinica"

echo "== EMS Clínica: Deploy =="
cd "$REPO"
git fetch --all --prune
git checkout master || git checkout -t origin/master
git pull --rebase

npm ci
npm run build

mkdir -p "$RUNTIME"
rsync -a --delete \
  --exclude ".git" --exclude "src" --exclude "node_modules" --exclude "dist_*" \
  --exclude "uploads" --exclude "xml" --exclude "certificado" --exclude ".env*" \
  "$REPO/package.json" "$REPO/package-lock.json" "$REPO/dist/" "$RUNTIME/"

cd "$RUNTIME"
npm ci --omit=dev
[ -f "$RUNTIME/.env" ] || { echo "FALTA $RUNTIME/.env"; exit 1; }

pm2 startOrReload /srv/emsclinica/ecosystem.config.js
pm2 save
echo "OK."
