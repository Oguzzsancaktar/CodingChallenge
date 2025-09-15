# AI Usage Statement

This project was built with assistance from an AI pair-programmer to speed up scaffolding and boilerplate under a tight deadline. The AI was used for:

- Selecting a fast, standard stack (Express + TS, Vite React + TS) and npm workspaces
- Generating initial project structure, configuration, and safe defaults (security middleware, logging, env validation)
- Writing straightforward glue code (health route, client API helper, proxy config)
- Drafting documentation (README, this AI_USAGE file)

Human decisions included:

- Choosing libraries and enforcing clean architecture boundaries
- Reviewing and editing generated code for clarity, type-safety, and best practices
- Ensuring minimal, senior-level defaults (Zod env validation, rate limiting, CORS, Helmet, Pino)

Why AI: accelerates repetitive setup to focus the remaining time on business logic (auth/profile, GitHub API integration) and code quality.

## Path to the solution

- Framed requirements and success criteria
- Researched options and selected a standard, productive stack
- Scaffolded workspaces and shared types
- Implemented auth/profile and GitHub integration behind clear boundaries
- Added env validation, security, logging, error handling
- Wrote and ran tests; iterated on findings
- Finalized documentation and developer tooling

## AI tools used and how

- Used AI in ask mode for research and suggestions
- Always reviewed AI-suggested snippets before integrating; edited or rewrote as needed
- Used AI to confirm my code, check similar areas after changes, and assist with comments/docs
- No autonomous changes; all commits were human-authored and verified

## Inputs I provided to AI

- High-level feature descriptions and acceptance criteria
- Specific questions about libraries, patterns, and trade-offs
- Targeted code excerpts, diffs, or error messages when troubleshooting
- Constraints: type-safety, clean architecture, minimal deps, testability

## Architectural decisions and rationale

- Monorepo with npm workspaces: share types, unify tooling
- Shared `packages/shared` for request/response and domain types: backend–frontend contract safety
- Backend: Express + TypeScript with controllers/services/repositories
  - Simple, battle-tested, fast to build; straightforward unit/integration testing
  - Zod env validation, Helmet, CORS, Pino, rate limiting for secure defaults
  - Lightweight persistence via lowdb to avoid external DB complexity for this challenge
- Frontend: Vite + React + TypeScript
  - Fast dev experience and TS safety; thin axios-based services; reusable UI components
- Testing: Vitest for backend routes/services and frontend services
- DX: docker-compose and Makefile for common tasks

## Review and verification

- I always checked AI suggestions and integrated only after verification
- I used AI to double-check changes and mirror similar edits safely when refactoring
- Documentation (README and this AI_USAGE) was drafted with AI, then reviewed and finalized by me
