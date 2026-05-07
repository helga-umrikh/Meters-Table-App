const fs = require('fs');
const path = require('path');

const dir = __dirname;

const stripComments = (text) =>
  text
    .split('\n')
    .map((line) => line.replace(/^\s*\/\/\s?/, ''))
    .join('\n');

const m = JSON.parse(stripComments(fs.readFileSync(path.join(dir, 'meters.json'), 'utf8')));
const a = JSON.parse(stripComments(fs.readFileSync(path.join(dir, 'areas.json'), 'utf8')));

console.log('before: meters', m.results.length, 'areas', a.results.length);

// Reset: keep only "originals" (ids without our suffix marker)
m.results = m.results.filter((x) => !x.id.includes('_'));
const original = [...m.results];
const seenIds = new Set(original.map((x) => x.id));
const target = 200;
let copy = 1;
while (m.results.length < target) {
  for (const src of original) {
    if (m.results.length >= target) break;
    const newId = src.id + '_' + copy.toString().padStart(2, '0');
    if (seenIds.has(newId)) continue;
    seenIds.add(newId);
    m.results.push({
      ...src,
      id: newId,
      description: src.description ? src.description + '/' + copy : String(copy),
    });
  }
  copy++;
}
m.count = m.results.length;
fs.writeFileSync(path.join(dir, 'meters.json'), JSON.stringify(m, null, 2));

const referencedIds = [...new Set(m.results.map((x) => x.area.id))];
const templates = a.results;
const newAreas = referencedIds.map((id, idx) => ({
  ...templates[idx % templates.length],
  id,
}));
fs.writeFileSync(
  path.join(dir, 'areas.json'),
  JSON.stringify({ count: newAreas.length, results: newAreas }, null, 2)
);

console.log('after: meters', m.results.length, 'areas', newAreas.length);
console.log('pages at limit=20:', Math.ceil(m.results.length / 20));
