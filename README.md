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
