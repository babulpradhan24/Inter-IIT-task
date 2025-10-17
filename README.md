# InterIIT Commenting App - Fullstack Scaffold

This repository is a ready-to-run scaffold for the Inter IIT Tech Meet 14.0 nested commenting task.

## What's included

- Frontend: React + Vite + Tailwind (login, post page, nested comments, reply, upvote, collapse)
- Backend: Express + MongoDB (auth route with domain-check login, comments CRUD)
- Docker: Dockerfiles for frontend & backend + docker-compose.yml
- Example dataset in /dataset

## Quick start (Docker)

1. Copy `.env.example` from `backend` to `.env` and update if needed.
2. Run:
```bash
docker-compose up --build
```
- Frontend (dev): http://localhost:5173
- Backend: http://localhost:4000

## Quick start (without Docker)

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Notes
- The auth is a domain-based demo check. Replace with full auth for production.
- The frontend currently reads/writes against `http://localhost:4000`. Update as needed for deployment.

