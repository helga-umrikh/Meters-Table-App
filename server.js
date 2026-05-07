// server.js
const express = require('express');
const meters = require('./meters.json');
const areas = require('./areas.json');
const app = express();

app.use(express.json());

// GET /api/v4/test/meters/
app.get('/api/v4/test/meters/', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;
  const results = meters.results.slice(offset, offset + limit);
  res.json({ count: meters.count, results });
});

// GET /api/v4/test/areas/
app.get('/api/v4/test/areas/', (req, res) => {
  const ids = req.query.id__in?.split(',') || [];
  const results = areas.results.filter(a => ids.includes(a.id));
  res.json({ count: results.length, results });
});

// DELETE /api/v4/test/meters/:id/
app.delete('/api/v4/test/meters/:id/', (req, res) => {
  res.status(204).send();
});

app.listen(3001, () => console.log('Mock API running on http://localhost:3001'));