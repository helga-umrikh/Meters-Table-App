# Meters App

[![Open Live Demo](https://img.shields.io/badge/%E2%9C%A8_Open_Live_Demo-2EA043?style=for-the-badge&logo=github&logoColor=white)](https://helga-umrikh.github.io/meters-app-monorepo/)

A learning project for browsing utility meters and the areas they belong to. Consists of a React frontend and an Express mock backend, organized as a monorepo.

## Live deployment

- 🟢 **Frontend (GitHub Pages):** **[helga-umrikh.github.io/meters-app-monorepo](https://helga-umrikh.github.io/meters-app-monorepo/)**
- **API (Vercel):** https://meters-table-app.vercel.app
  - `/health` — health check
  - `/api/v4/test/meters/` — list of meters
  - `/api/v4/test/areas/` — areas

## Structure

```
meters-app-monorepo/
├── meters-app-front/      # React + TS + Vite, MobX-State-Tree, FSD
├── meters-app-backend/    # Express, mock API backed by JSON files
└── .github/workflows/     # CI/CD: deploys frontend to GitHub Pages
```

See package-level READMEs for details:
- [meters-app-front/README.md](meters-app-front/README.md)
- [meters-app-backend/README.md](meters-app-backend/README.md)

## Stack

**Frontend:** React 19, TypeScript, Vite, MobX-State-Tree, styled-components, axios. Architecture follows Feature-Sliced Design.

**Backend:** Node.js, Express 5. Mock data is stored in JSON files.

**CI/CD:** GitHub Actions deploys the frontend to GitHub Pages on every push to `main`. The backend is auto-deployed to Vercel on push.

## Running locally

In two terminals:

```bash
# terminal 1 — backend
cd meters-app-backend
npm install
npm start          # http://localhost:3001

# terminal 2 — frontend
cd meters-app-front
npm install
npm run dev        # http://localhost:5173
```

The frontend defaults to `http://localhost:3001` and can be overridden via `VITE_API_HOST`.
