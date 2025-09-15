# Coding Challenge - User Profile Manager

This is a small fullstack app scaffolded as a monorepo with Node.js (Express + TypeScript) and React (Vite + TypeScript).

## Tech

- Backend: Express, TypeScript, Zod, Helmet, CORS, Pino, Rate limiting
- Frontend: React, Vite, TypeScript
- Tooling: npm workspaces, tsup, tsx

## Getting Started

1. Install dependencies:

```
npm install -ws
```

2. Run dev servers (concurrently):

```
npm run dev
```

- Backend: http://localhost:4000
- Frontend: http://localhost:5173 (proxy to backend under `/api`)

3. Build:

```
npm run build
```

## Environment

Copy `.env.example` to `.env` in `apps/backend` if you want to customize ports/origin.

## Structure

```
apps/
  backend/
    src/
      config/env.ts
      app.ts
      index.ts
      routes/health.ts
  frontend/
    src/
      App.tsx
      lib/api.ts
```

## Notes

- Health check endpoint: `GET /api/v1/health`
- Frontend shows backend health status on load.

## Docker Dev (All Platforms)

You can run the entire stack with Docker for a consistent, cross-platform dev setup. Requires Docker Desktop (or any Docker engine) with Compose v2.

### Quick start

```
make up
```

- Backend API: http://localhost:4000
- Frontend Web: http://localhost:5173

Hot reload is enabled for both services. The repo is mounted into containers and `npm ci` is executed inside.

### Useful commands

```
make logs           # Tail logs from all services
make backend-shell  # Open bash in backend container
make frontend-shell # Open bash in frontend container
make test           # Run backend + frontend tests in containers
make build          # Build backend + frontend in containers
make down           # Stop containers
make clean          # Stop and remove volumes (node_modules)
```

### Environment

- CORS `ALLOWED_ORIGIN` is set to `http://localhost:5173` for dev.
- Frontend dev server proxies `/api` to the backend using `VITE_BACKEND_ORIGIN`. In Docker it is set to `http://host.docker.internal:4000` for compatibility across macOS/Windows/Linux (Docker provides this hostname on modern engines). If unavailable on your distro, replace with your host IP.

### Notes on workspaces

This monorepo uses npm workspaces. Containers run `npm ci --workspaces` and mount volumes for each package's `node_modules` to speed up installs and keep host `node_modules` untouched.
