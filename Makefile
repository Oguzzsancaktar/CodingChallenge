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
	@# Free local ports to avoid bind conflicts
	@PID=$$(lsof -tiTCP:4000 -sTCP:LISTEN); if [ -n "$$PID" ]; then echo "Killing process on :4000 ($$PID)"; kill -9 $$PID || true; fi
	@PID=$$(lsof -tiTCP:5173 -sTCP:LISTEN); if [ -n "$$PID" ]; then echo "Killing process on :5173 ($$PID)"; kill -9 $$PID || true; fi
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
	# Backend tests (run without requiring services to be running)
	$(DOCKER_COMPOSE) run --rm -T -v $(PWD):/workspace -w /workspace backend bash -lc 'npm ci --workspaces && npm run test -w @codingchallenge/backend'
	# Frontend tests (no dependency on backend service)
	$(DOCKER_COMPOSE) run --rm --no-deps -T -v $(PWD):/workspace -w /workspace frontend bash -lc 'npm ci --workspaces && npm run test -w frontend'

.PHONY: build
build:
	$(DOCKER_COMPOSE) run --rm -T -v $(PWD):/workspace -w /workspace backend bash -lc 'npm ci --workspaces && npm run build'

.PHONY: clean
clean:
	$(DOCKER_COMPOSE) down -v --remove-orphans

# -----------------------------
# Local (non-Docker) commands
# -----------------------------

.PHONY: dev
dev:
	@# Free local ports first
	@PID=$$(lsof -tiTCP:4000 -sTCP:LISTEN); if [ -n "$$PID" ]; then echo "Killing process on :4000 ($$PID)"; kill -9 $$PID || true; fi
	@PID=$$(lsof -tiTCP:5173 -sTCP:LISTEN); if [ -n "$$PID" ]; then echo "Killing process on :5173 ($$PID)"; kill -9 $$PID || true; fi
	npm run dev

.PHONY: start
start:
	@# Ensure :4000 is free before starting
	@PID=$$(lsof -tiTCP:4000 -sTCP:LISTEN); if [ -n "$$PID" ]; then echo "Killing process on :4000 ($$PID)"; kill -9 $$PID || true; fi
	npm run build
	npm run start

.PHONY: test-local
test-local:
	npm run test -w @codingchallenge/backend
	npm run test -w frontend

.PHONY: typecheck
typecheck:
	npm run typecheck

.PHONY: lint
lint:
	npm run lint -w frontend


