# meters-app-front

Frontend of the Meters App. React 19 + TypeScript + Vite, state managed with MobX-State-Tree, styled with styled-components. Architecture follows Feature-Sliced Design.

## Structure

```
src/
├── app/              # app initialization, root component, store, global styles
├── pages/            # pages (Home)
├── widgets/          # composite blocks (Header, MetersTable)
├── features/         # user-facing features (meters-list)
├── entities/         # domain entities (meter, area)
├── shared/           # reusable code
│   ├── api/          # axios client
│   ├── config/       # env, API base URL
│   ├── ui/           # UI components
│   └── assets/
├── main.tsx          # entry point
└── vite-env.d.ts     # Vite env variable types
```

## Running

```bash
npm install
npm run dev          # dev server at http://localhost:5173
```

Production build and preview:

```bash
npm run build:prod
npm run preview:prod
```

## Environment variables

| Variable          | Purpose                                  | Default                 |
|-------------------|------------------------------------------|-------------------------|
| `VITE_API_HOST`   | Backend base URL (without `/api/...`)    | `http://localhost:3001` |
| `VITE_BASE_PATH`  | Path prefix for GitHub Pages deployment  | `/`                     |

For local development, create `.env.local`:

```
VITE_API_HOST=http://localhost:3001
```

## Scripts

- `npm run dev` — dev server with HMR
- `npm run build` — TypeScript check + Vite build
- `npm run build:prod` — production build (used in CI)
- `npm run preview:prod` — local preview of the production build
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` / `npm run format:check` — Prettier
