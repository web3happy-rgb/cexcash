# CEXCash — TetherMax-style Referral Platform

A full-stack yellow-and-black recreation of the [tethermax.io](https://tethermax.io/) rebate experience. The project ships with an Express + SQLite backend and a React + Vite frontend that mirror the multi-page affiliate marketing funnel, including a working partner dashboard, referral code management, and content sections inspired by the original site.

## Tech stack

- **Backend:** Node.js, Express, better-sqlite3, JWT authentication
- **Frontend:** React 19, Vite, Tailwind CSS, React Router
- **Database:** SQLite (auto-initialised in `backend/data/cexcash.db`)

## Project structure

```
cexcash/
├── backend/          # Express API with authentication and referral management
├── frontend/         # React client with multi-page marketing site + dashboard
├── package.json      # Root workspace scripts
└── README.md
```

## Getting started

1. **Install dependencies**

   ```bash
   npm install          # installs root + workspace dependencies
   npm run dev:backend  # in a separate terminal start the backend API (port 4000)
   npm run dev:frontend # start the frontend dev server (port 5173)
   ```

   Or run both together:

   ```bash
   npm run dev
   ```

2. **Environment variables**

   - Copy `backend/.env.example` to `backend/.env` to override defaults (JWT secret, allowed origins). Multiple
     origins can be listed with commas, and any spaces will be ignored (e.g. `http://foo.com, https://bar.com`).
   - Copy `frontend/.env.example` to `frontend/.env` if you need to point the UI at a different API base URL.

3. **Database**

   The first backend boot seeds demo marketing copy and ensures all tables exist. Data lives in `backend/data/cexcash.db`.

## Available scripts

From the repository root:

- `npm run dev` — start backend and frontend concurrently.
- `npm run dev:backend` / `npm run dev:frontend` — run services individually.
- `npm run build` — build the React production bundle.
- `npm run lint` — run ESLint on the frontend.

## Features

- Pixel-accurate marketing landing pages themed after tethermax.io with yellow/black art direction.
- Dynamic content fetched from the backend so hero sections, metrics, and FAQs stay in sync.
- Secure JWT authentication with registration/login flows.
- Partner dashboard to create referral codes, log trading activity, and view aggregated stats.
- Secondary pages (rewards matrix, webinars, tools, legal, contact, about) matching the original sitemap depth.

## Deployment notes

- The backend serves static SVG assets under `/assets/*` referenced by the frontend.
- Adjust `ALLOWED_ORIGINS` in the backend `.env` when deploying behind a custom domain.
- For persistence beyond the demo, switch the SQLite file path or plug in an external database layer.
