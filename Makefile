SHELL := /bin/sh

# Default project names
PROJECT := codingchallenge

# Docker Compose wrapper (works with Compose V2/V1)
DOCKER_COMPOSE := docker compose

.PHONY: help
help:
	@echo "Available targets:"
	@echo "  up           - Start all services in dev mode"
	@echo "  down         - Stop and remove containers"
	@echo "  logs         - Tail logs from all services"
	@echo "  backend-shell- Open a shell in the backend container"
	@echo "  frontend-shell- Open a shell in the frontend container"
	@echo "  test         - Run all tests (backend + frontend) inside containers"
	@echo "  build        - Build backend and frontend (inside backend container)"
	@echo "  clean        - Remove node_modules volumes and stop containers"
	@echo "  dev          - Run backend+frontend locally (no Docker)"
	@echo "  start        - Start backend locally (built)"
	@echo "  test-local   - Run all tests locally (no Docker)"
	@echo "  typecheck    - Run typecheck locally"
	@echo "  lint         - Lint frontend locally"

.PHONY: up
up:
	$(DOCKER_COMPOSE) up -d --build
	@echo "Services starting: http://localhost:4000 (API), http://localhost:5173 (Web)"

.PHONY: down
down:
	$(DOCKER_COMPOSE) down

.PHONY: logs
logs:
	$(DOCKER_COMPOSE) logs -f --tail=200

.PHONY: backend-shell
backend-shell:
	$(DOCKER_COMPOSE) exec backend bash -lc 'node -v && npm -v && bash'

.PHONY: frontend-shell
frontend-shell:
	$(DOCKER_COMPOSE) exec frontend bash -lc 'node -v && npm -v && bash'

.PHONY: test
test:
	# Backend tests
	$(DOCKER_COMPOSE) exec -T backend bash -lc 'npm run test -w @codingchallenge/backend'
	# Frontend tests
	$(DOCKER_COMPOSE) exec -T frontend bash -lc 'npm run test -w frontend'

.PHONY: build
build:
	$(DOCKER_COMPOSE) exec -T backend bash -lc 'npm run build -w @codingchallenge/backend && npm run build -w frontend'

.PHONY: clean
clean:
	$(DOCKER_COMPOSE) down -v --remove-orphans

# -----------------------------
# Local (non-Docker) commands
# -----------------------------

.PHONY: dev
dev:
	npm run dev

.PHONY: start
start:
	npm run build
	npm run start

.PHONY: test-local
test-local:
	npm run test -w @codingchallenge/backend || true
	npm run test -w frontend || true

.PHONY: typecheck
typecheck:
	npm run typecheck

.PHONY: lint
lint:
	npm run lint -w frontend


