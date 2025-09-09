# README — Backend EMS Clínica (Dev com Docker + Toggle de Banco)

Este guia explica como rodar o backend em **desenvolvimento** com Docker, usando:
- **Postgres local** (com **PgAdmin**) **ou** o **banco de produção**;
- **Redis** sempre habilitado;
- Alternância simples via arquivo de ambiente (`ENV_FILE`) e **profiles** do Docker Compose.

---

## Requisitos

- Docker + Docker Compose (v2)
- Node 18+ (se for rodar scripts localmente)
- Make (opcional, só para atalhos)

---

## Estrutura (resumo)

- `docker-compose.yml` já preparado com serviços: `app`, `db` (Postgres), `pgadmin`, `redis`.
- **Profile** `local-db`: quando ligado, sobe `db` e `pgadmin`.
- O serviço `app` lê o arquivo indicado por `ENV_FILE` (padrão: `.env.development`).

---

## Variáveis de Ambiente

Crie **dois** arquivos na raiz do projeto:

### `.env.development`  → **Usa Postgres local (container `db`)**
```env
NODE_ENV=development
APP_PORT=3333
APP_URL=http://localhost:3333
CORS_ORIGIN=http://localhost:3000

DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=emsclinica_dev

REDIS_HOST=redis
REDIS_PORT=6379

RUN_MIGRATIONS=1
JWT_SECRET=troque_aqui
REFRESH_SECRET=troque_aqui_tb
```

### `.env.prod-db`  → **Aponta para o Banco de Produção**
```env
NODE_ENV=development
APP_PORT=3333
APP_URL=http://localhost:3333
CORS_ORIGIN=http://localhost:3000

DB_HOST=<host-ou-endpoint-da-producao>
DB_PORT=5432
DB_USER=<usuario_producao>
DB_PASS=<senha_producao>
DB_NAME=<database_producao>

REDIS_HOST=redis
REDIS_PORT=6379

# ⚠️ Evita alterações acidentais na base de produção
RUN_MIGRATIONS=0

# Se a produção exige TLS:
# DB_SSL=true
# DB_SSL_REJECT_UNAUTHORIZED=false
```

> Dica: mantenha **segredos fora do Git** (tokens, certificados etc.). Use `.gitignore`, variáveis de ambiente e/ou secrets do provedor.

---

## Subir os serviços

### 1) **Desenvolvimento com Postgres local + PgAdmin**
Sobe `app`, `db`, `pgadmin` e `redis`.
```bash
ENV_FILE=.env.development docker compose --profile local-db up -d app db pgadmin redis
```
- Postgres local: `localhost:5432`
- PgAdmin: http://localhost:5050  (login/senha definidos via variáveis `PGADMIN_*` no compose)

### 2) **Desenvolvimento apontando para Banco de Produção**
Sobe apenas `app` e `redis` (sem `db` local).
```bash
ENV_FILE=.env.prod-db docker compose up -d app redis
```

### 3) Parar/limpar
```bash
docker compose down
# remover volumes/dados locais (⚠️ apaga o banco/pgadmin/redis locais)
# docker compose down -v
```

---

## (Opcional) Atalhos com Makefile

Crie um `Makefile` na raiz:

```makefile
up-dev:
	ENV_FILE=.env.development docker compose --profile local-db up -d app db pgadmin redis

up-prod-db:
	ENV_FILE=.env.prod-db docker compose up -d app redis

down:
	docker compose down

down-v:
	docker compose down -v
```

Uso:
```bash
make up → sobe tudo (API + DB + Redis + pgAdmin) com hot-reload

make migrate → executa migrations

make logs → acompanha logs

make down / make destroy → derruba quando quiser
make db-drop → apaga somente a base emsclinica_dev

make db-create → cria de novo

make db-reset → dropa e recria

make reset-and-migrate → dropa, recria e roda migrations
```

---

## Scripts úteis (npm)

Depois de subir os containers:

```bash
npm ci || npm install
npm run build
npm run dev          # ou npm run start:dev (conforme seu package.json)
npm run typeorm migration:run
```

> Em `.env.prod-db` mantemos `RUN_MIGRATIONS=0` para **não** aplicar migrations em produção por engano.

---

## Troubleshooting

- **\`ECONNREFUSED\` no Postgres**: confira `DB_HOST/PORT` do `.env*` e se o container `db` está up quando usando `local-db`.
- **Portas ocupadas**: mude as portas no `docker-compose.yml` (`5432:5432`, `5050:80`, `3333:3333`, `6379:6379`) ou pare serviços que conflitam.
- **\`Cannot find module 'reflect-metadata'\`**:
  `npm i reflect-metadata` e garanta `import 'reflect-metadata'` no bootstrap do app (ex.: `src/shared/infra/http/server.ts`).
- **PgAdmin vazio**: adicione o servidor apontando para `db:5432` com usuário/senha do `.env.development`.
- **SSL em produção**: caso o Postgres exija TLS, habilite `DB_SSL=true` (e `DB_SSL_REJECT_UNAUTHORIZED=false` se o certificado não for público).

---

## Segurança & Boas práticas

- **Nunca** rodar migrations/seed contra a base de produção.
- Prefira **usuário read-only** quando só precisar consultar produção.
- Proteja `.env.prod-db` e use secrets quando possível.
- Versione apenas o necessário (código e configs genéricas). Pastas com dados (`uploads/`, `xml/`, backups etc.) podem exigir **Git LFS** se forem grandes.

---

## TL;DR

- Local:
  `ENV_FILE=.env.development docker compose --profile local-db up -d app db pgadmin redis`
- Prod DB:
  `ENV_FILE=.env.prod-db docker compose up -d app redis`
- Parar:
  `docker compose down`





RODAR NO WINDOWS powershell

# Descer apagando o banco (reset total) — deve recriar extensões e rodar migrations de novo
docker compose down
docker compose build --no-cache app
docker compose up -d
docker compose logs -f app



-- garanta que a coluna é integer (ajuste se já for)
ALTER TABLE "aso"
  ALTER COLUMN "codigoaso" TYPE integer USING "codigoaso"::integer;

-- cria a sequence se não existir e define como default da coluna
CREATE SEQUENCE IF NOT EXISTS "aso_codigoaso_seq" OWNED BY "aso"."codigoaso";

ALTER TABLE "aso"
  ALTER COLUMN "codigoaso" SET DEFAULT nextval('aso_codigoaso_seq');

-- alinha o valor da sequence ao máximo existente
SELECT setval('aso_codigoaso_seq',
              COALESCE((SELECT MAX("codigoaso") FROM "aso"), 0) + 1,
              false);
 

-- Habilita função gen_random_uuid() (se necessário)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO public.tipoaso (id, descricao, ativo, created_at, updated_at) VALUES
(gen_random_uuid(), 'ADMISSIONAL',         TRUE, now(), now()),
(gen_random_uuid(), 'MUDANÇA DE FUNÇÃO',   TRUE, now(), now()),
(gen_random_uuid(), 'RETORNO AO TRABALHO', TRUE, now(), now()),
(gen_random_uuid(), 'DEMISSIONAL',         TRUE, now(), now()),
(gen_random_uuid(), 'PERIODICO',           TRUE, now(), now());

INSERT INTO public.tipopagamento (id, descricao, ativo)
VALUES ('51cf6cb6-4d7f-416a-85af-21b53f0b4c2a', 'CONVENIO', TRUE)
ON CONFLICT (id) DO UPDATE
SET descricao = EXCLUDED.descricao,
    ativo     = EXCLUDED.ativo;




RODAR NO MAC
Derrubar e apagar volumes (zera DB/Redis/PgAdmin)

cd ~/www/backendemsclinica
unset COMPOSE_FILE
docker compose -f docker-compose.yml down --volumes --remove-orphans

Subir novamente (DB, Redis, PgAdmin, API)
unset COMPOSE_FILE
docker compose -f docker-compose.yml up -d --force-recreate
docker compose -f docker-compose.yml ps
docker compose -f docker-compose.yml logs -f api
