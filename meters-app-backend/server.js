// server.js
const express = require('express');
const meters = require('./meters.json');
const areas = require('./areas.json');
const app = express();

const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS || '*').split(',').map(s => s.trim())
);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.has('*')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use(express.json());

// GET /api/v4/test/meters/
app.get('/api/v4/test/meters/', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;
  const results = meters.results.slice(offset, offset + limit);
  res.json({ count: meters.results.length, results });
});

// GET /api/v4/test/areas/
app.get('/api/v4/test/areas/', (req, res) => {
  const ids = req.query.id__in?.split(',') || [];
  const results = areas.results.filter(a => ids.includes(a.id));
  res.json({ count: results.length, results });
});

// DELETE /api/v4/test/meters/:id/
app.delete('/api/v4/test/meters/:id/', (req, res) => {
  const idx = meters.results.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ detail: 'Not found' });
  meters.results.splice(idx, 1);
  res.status(204).send();
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Mock API running on port ${PORT}`));
}

module.exports = app;