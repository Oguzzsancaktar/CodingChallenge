🧪 Fullstack Developer Coding Challenge

📌 Objective

Build a small fullstack application using Node.js, React, and TypeScript, showcasing clean architecture, RESTful or GraphQL API design, integration with external APIs or a local database, and industry-standard practices for security and performance.

🚀 Use Case Scenario

"User Profile Manager"
Create an app where users can:

Register and log in (mocked or real auth)

View and edit their profile (name, email, etc.)

Fetch and display a list of public GitHub repositories (or another public API)

📐 Requirements

🧱 Tech Stack

Frontend: React, TypeScript, modern file/project structure

Backend: Node.js (Express or similar), TypeScript

API Style: RESTful API or GraphQL

Database: Use a lightweight in-memory store (e.g. an object in memory, or SQLite/LowDB). You can mock DB behavior.

External API: Fetch GitHub user repos or similar (e.g. weather, news)

🔧 Functional Requirements

1. User Authentication

Simulated login or JWT-based login

Users can "log in" with email (no need for real registration flow)

2. User Profile Management

View and update user profile (name, email, etc.)

Persist changes to mock/in-memory DB

3. External API Integration

Allow user to enter a GitHub username

Fetch and display their public repositories

Handle loading and error states

✅ Bonus Features

Form validation (frontend + backend)

Basic security features: input sanitization, rate limiting, secure headers

Caching GitHub API results (in-memory OK)

Pagination or sorting for repo list

Rate-limited API access to GitHub

🧪 Testing (Optional but Recommended)

Unit tests (Jest, Testing Library, etc.)

Basic API tests (e.g. for login, profile)

📁 Project Structure Expectations

Frontend:

Organized folder structure.

Type safety with interfaces/types

Modern React practices

Separation of concerns

Backend:

Modular routes and services

Clean architecture

API versioning if REST

Environment config management

📦 Deliverables

Source code in a public/private GitHub repo or ZIP file

Setup instructions (README.md)

Brief explanation of architecture decisions

Bonus: API documentation (Postman collection, Swagger, or simple Markdown)

🕒 Time Estimate

Estimated completion: 2.5 to 3 hours with AI tools

Keep features simple and focused. We evaluate code quality and structure, not just feature count.
