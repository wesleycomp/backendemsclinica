# Makefile
DB_NAME ?= emsclinica_dev
DB_USER ?= postgres
DC = docker compose -f docker-compose.yml -f docker-compose.override.yml

.DEFAULT_GOAL := help

.PHONY: help up down destroy ps logs restart sh migrate revert psql pgadmin-pass reset-pgadmin

help: ## Lista os comandos úteis
	@echo "make up             # sobe tudo em segundo plano"
	@echo "make down           # para e remove os containers (mantém volumes)"
	@echo "make destroy        # para, remove e APAGA volumes"
	@echo "make ps             # status dos serviços"
	@echo "make logs           # segue logs (app, db, redis, pgadmin)"
	@echo "make restart        # reinicia somente o app"
	@echo "make sh             # shell no container do app"
	@echo "make migrate        # roda migrations"
	@echo "make revert         # desfaz última migration"
	@echo "make psql           # abre psql no banco"
	@echo "make pgadmin-pass   # mostra usuário/senha do pgAdmin"
	@echo "make reset-pgadmin  # zera dados do pgAdmin e recria"

   ## ===== DEV =====
up:        ## sobe tudo
	$(DC) up -d

down:      ## derruba tudo (mantendo volumes)
	$(DC) down

destroy:   ## derruba e remove volumes
	$(DC) down -v

ps:        ## status
	$(DC) ps

logs:      ## logs ao vivo
	$(DC) logs -f app db redis pgadmin

restart:   ## reinicia somente o app
	$(DC) restart app

sh:        ## shell dentro do app
	$(DC) exec app sh

migrate:   ## roda migrations
	$(DC) exec app sh -lc '\
	  node -r dotenv/config \
	       -r ts-node/register/transpile-only \
	       -r tsconfig-paths/register \
	       ./node_modules/typeorm/cli.js -f ormconfig.js migration:run'

           ## ===== PROD =====
prod-up:     ## sobe produção (usa .env.production)
	$(DC_PROD) up -d --build

prod-down:   ## derruba produção
	$(DC_PROD) down

prod-logs:   ## logs produção
	$(DC_PROD) logs -f

prod-shell:  ## shell no app de prod
	$(DC_PROD) exec app sh

prod-migrate: ## bloqueado por padrão
	@echo "🚫 Bloqueado: migrations em produção NÃO são permitidas."
	@echo "Se realmente precisar (janela controlada), fale comigo que eu preparo um alvo com senha/flag."

revert:    ## desfaz última migration
	$(DC) exec app sh -lc '\
	  node -r dotenv/config \
	       -r ts-node/register/transpile-only \
	       -r tsconfig-paths/register \
	       ./node_modules/typeorm/cli.js -f ormconfig.js migration:revert'

psql:      ## abre psql
	$(DC) exec db psql -U postgres -d emsclinica_dev

db-drop:   ## DROP DATABASE $(DB_NAME)
	$(DC) exec db sh -lc "psql -U $(DB_USER) -d postgres -v ON_ERROR_STOP=1 -c \"DROP DATABASE IF EXISTS \\\"$(DB_NAME)\\\" WITH (FORCE);\""

db-create: ## CREATE DATABASE $(DB_NAME)
	$(DC) exec db sh -lc "psql -U $(DB_USER) -d postgres -v ON_ERROR_STOP=1 -c \"CREATE DATABASE \\\"$(DB_NAME)\\\" WITH OWNER \\\"$(DB_USER)\\\" ENCODING 'UTF8' TEMPLATE template1;\""


db-reset:  ## Drop + Create
	$(MAKE) db-drop
	$(MAKE) db-create

reset-and-migrate: ## Drop + Create + Migrations
	$(MAKE) db-reset
	$(MAKE) migrate

pgadmin-pass: ## mostra credenciais atuais do pgAdmin
	$(DC) exec pgadmin env | egrep "PGADMIN_DEFAULT_EMAIL|PGADMIN_DEFAULT_PASSWORD"

reset-pgadmin: ## zera dados do pgAdmin e recria
	-$(DC) stop pgadmin
	-$(DC) rm -f pgadmin
	-docker volume rm backendemsclinica_pgadmindata
	$(DC) up -d pgadmin
