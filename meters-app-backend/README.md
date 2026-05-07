# meters-app-backend

Express mock API for the Meters App. Data is read from JSON files. Deployed as a serverless function on Vercel.

## Structure

```
meters-app-backend/
├── api/
│   └── index.js        # Vercel entry point (wraps Express as a serverless handler)
├── server.js           # Express app and routes
├── meters.json         # mock meters data
├── areas.json          # mock areas data
├── generate-data.js    # mock data generator script
├── vercel.json         # Vercel config (rewrites all paths to /api)
└── package.json
```

## Endpoints

| Method | Path                              | Description                            |
|--------|-----------------------------------|----------------------------------------|
| GET    | `/health`                         | Health check                           |
| GET    | `/api/v4/test/meters/`            | List of meters (`limit`, `offset`)     |
| GET    | `/api/v4/test/areas/?id__in=...`  | Areas by list of ids                   |
| DELETE | `/api/v4/test/meters/:id/`        | Delete a meter (in-memory)             |

> On Vercel, mutations (DELETE) **are not persisted** across calls — each request may hit a fresh serverless instance.

## Running locally

```bash
npm install
npm start            # http://localhost:3001
```

Smoke test: `curl http://localhost:3001/health` → `{"ok":true}`.

## Environment variables

| Variable            | Purpose                                              | Default |
|---------------------|------------------------------------------------------|---------|
| `PORT`              | HTTP server port (Vercel sets this automatically)    | `3001`  |
| `ALLOWED_ORIGINS`   | Comma-separated CORS origins, or `*` for any         | `*`     |

Example for the production environment on Vercel:
```
ALLOWED_ORIGINS=https://helga-umrikh.github.io
```

## Regenerating mock data

```bash
node generate-data.js
```
