EMS CLÍNICA – OPERAÇÃO DA API (PRODUÇÃO)
============================================

Caminhos importantes
--------------------
• Repositório (código + build): /home/app/backendemsclinica
• Runtime (.env de produção):   /srv/emsclinica/.env
• PM2 ecosystem (local):        /home/app/backendemsclinica/ecosystem.repo.config.js
• Logs da app (PM2):            /var/log/emsclinica/{out.log,err.log}
• Porta da API:                 3333 (definida em .env e no ecosystem)

Arquivos protegidos (NÃO apagar/alterar)
----------------------------------------
• /srv/emsclinica/.env      (segredos/variáveis)
• /home/app/backendemsclinica/ormconfig.js     (skip-worktree no Git)
• /home/app/backendemsclinica/ecosystem.repo.config.js  (não versionado)
• pastas de dados: uploads/, xml/, certificado/, tecnospeedTxts/

1) Deploy (pull + build + reload PM2)
-------------------------------------
bash /home/app/backendemsclinica/deploy.sh

O script faz:
- stash automático se houver mudanças locais
- git pull --rebase (branch master)
- npm ci && npm run build
- pm2 startOrReload ecosystem.repo.config.js --update-env
- pm2 save

2) Healthcheck
--------------
• Local (direto na API):
  curl -fsS http://127.0.0.1:3333/sessions/health && echo OK || echo FAIL

• Via domínio (passa pelo Nginx):
  curl -fsS https://backapiemsclinica.back.clinicaems.com.br/sessions/health && echo OK || echo FAIL

3) Logs e Status
----------------
• Status rápido:
  pm2 status
  pm2 describe apiems | egrep 'exec cwd|script path'

• Seguir logs:
  pm2 logs apiems -f

• Últimas N linhas:
  pm2 logs apiems --lines 200

• Logs nos arquivos:
  tail -n 200 /var/log/emsclinica/out.log
  tail -n 200 /var/log/emsclinica/err.log

4) Reinícios e variáveis de ambiente
------------------------------------
• Reiniciar mantendo env:
  pm2 restart apiems --update-env

• Alterar .env (ex.: PORT) e recarregar:
  sudo nano /srv/emsclinica/.env
  pm2 reload apiems --update-env

5) Diagnóstico rápido
---------------------
• Porta ouvindo?
  sudo ss -ltnp | grep :3333 || sudo lsof -i -P -n | grep :3333

• API subiu mas erro 5xx?
  pm2 logs apiems --lines 200

• 404 via domínio e 200 local?
  questão de proxy/Nginx (API OK)

6) Rollback rápido (Git)
------------------------
cd /home/app/backendemsclinica
git log --oneline -n 5         # escolha um commit estável
git checkout <SHA>
npm ci && npm run build
pm2 reload apiems --update-env
# voltar ao fluxo padrão depois:
git checkout master

(Use tags para marcar releases: git tag -a prod-YYYY-MM-DD -m "release")

7) Limpeza segura (sem derrubar serviço)
----------------------------------------
• Mover sobras para “lixo seguro”:
  SAFE="/home/app/_trash_$(date +%F-%H%M)"; mkdir -p "$SAFE"
  mv -v dist_*/ build/ _cfg_backup_*/ *_copy.json "$SAFE" 2>/dev/null || true
  # não mover dist/ (build atual), node_modules/ e arquivos da seção “protegidos”.

8) Boas práticas (janela de manutenção)
---------------------------------------
• Atualizar Node para 18 LTS (estabilidade + remove EBADENGINE):
  nvm install 18 && nvm alias default 18 && npm i -g pm2 && pm2 startOrReload /home/app/backendemsclinica/ecosystem.repo.config.js && pm2 save
• Planejar atualização de libs legadas (multer@^2, rimraf@^4, glob@^9) em branch próprio e testar antes de deploy.

Anexos (referência)
-------------------
• ecosystem.repo.config.js deve conter:
  env: {
    NODE_ENV: 'production',
    TZ: 'America/Sao_Paulo',
    DOTENV_CONFIG_PATH: '/srv/emsclinica/.env',
    PORT: 3333
  }

• Rota de health (responde “ok” em texto):
  GET /sessions/health  (com Cache-Control: no-store)

FIM
