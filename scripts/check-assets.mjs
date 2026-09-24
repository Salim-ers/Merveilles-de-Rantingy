#!/usr/bin/env node
/**
 * Validation des images AVANT le build (lancé par `npm run build` via prebuild).
 *
 * Bloque le build si :
 *  - une image référencée dans le code n'existe pas dans /public ;
 *  - la casse du chemin diffère du fichier réel (Vercel / Linux est sensible à la casse) ;
 *  - le format réel (octets magiques) ne correspond pas à l'extension, ou n'est pas jpeg/png/webp/avif ;
 *  - les dimensions déclarées dans data/media.ts ne sont pas celles du fichier ;
 *  - une image est chargée depuis un site tiers (hotlink Google, Instagram, Facebook…).
 *
 * Signale (sans bloquer) : fichiers lourds, images de moins de 1000 px, fichiers non utilisés.
 * Aucune dépendance : Node seul.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep, extname } from 'node:path';

const ROOT = process.cwd();
const PUBLIC = join(ROOT, 'public');
const SOURCE_DIRS = ['app', 'components', 'data', 'lib'];
const IMAGE_EXT = /\.(avif|webp|png|jpe?g|gif|svg)$/i;
const ALLOWED = new Set(['webp', 'jpeg', 'png', 'avif']);
const MAX_BYTES = 600 * 1024;
const MIN_SIDE = 1000;

const errors = [];
const warnings = [];

function walk(dir) {
  let entries = [];
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return e.name === 'node_modules' || e.name.startsWith('.') ? [] : walk(p);
    return [p];
  });
}

/** Format réel et dimensions, lus dans l'en-tête du fichier. */
function inspect(buf) {
  const u32be = (o) => buf.readUInt32BE(o);
  if (buf.length > 24 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X') return { format: 'webp', width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { format: 'webp', width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
    if (chunk === 'VP8 ') return { format: 'webp', width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    return { format: 'webp' };
  }
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) return { format: 'png', width: u32be(16), height: u32be(20) };
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let o = 2;
    while (o < buf.length - 9) {
      if (buf[o] !== 0xff) { o++; continue; }
      const marker = buf[o + 1];
      const len = buf.readUInt16BE(o + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { format: 'jpeg', height: buf.readUInt16BE(o + 5), width: buf.readUInt16BE(o + 7) };
      }
      o += 2 + len;
    }
    return { format: 'jpeg' };
  }
  if (buf.length > 12 && buf.toString('ascii', 4, 8) === 'ftyp' && /avi[fs]/.test(buf.toString('ascii', 8, 12))) return { format: 'avif' };
  const head = buf.toString('utf8', 0, 256).trimStart().toLowerCase();
  if (head.startsWith('<svg') || head.startsWith('<?xml')) return { format: 'svg' };
  if (head.startsWith('<!doctype') || head.startsWith('<html')) return { format: 'html' };
  if (buf.length > 4 && buf.readUInt32BE(0) === 0x504b0304) return { format: 'zip' };
  return { format: 'inconnu' };
}

const EXT_FORMAT = { '.webp': 'webp', '.png': 'png', '.jpg': 'jpeg', '.jpeg': 'jpeg', '.avif': 'avif' };

// 1. Fichiers réellement présents (chemins exacts, casse comprise).
const onDisk = new Map();
for (const file of walk(join(PUBLIC, 'images'))) {
  onDisk.set('/' + relative(PUBLIC, file).split(sep).join('/'), file);
}
const lowerIndex = new Map([...onDisk.keys()].map((k) => [k.toLowerCase(), k]));

// 2. Références dans le code source.
const refs = new Map();
const HOTLINK = /https?:\/\/[^\s'"`)]*(?:googleusercontent|ggpht|gstatic|instagram|cdninstagram|fbcdn|facebook|maps\.googleapis)[^\s'"`)]*/gi;
const REMOTE_IMG = /https?:\/\/[^\s'"`)]+\.(?:jpe?g|png|webp|avif|gif)(?:\?[^\s'"`)]*)?/gi;
const LOCAL_IMG = /['"`](\/images\/[^'"`\s]+)['"`]/g;

for (const dir of SOURCE_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    if (!/\.(tsx?|mjs|js|css|json)$/.test(file)) continue;
    const text = readFileSync(file, 'utf8');
    const rel = relative(ROOT, file).split(sep).join('/');
    for (const m of text.matchAll(LOCAL_IMG)) {
      const list = refs.get(m[1]) ?? [];
      list.push(rel);
      refs.set(m[1], list);
    }
    const remote = new Set([...text.matchAll(HOTLINK), ...text.matchAll(REMOTE_IMG)].map((m) => m[0]));
    for (const url of remote) errors.push(`Image distante interdite (hotlink instable) dans ${rel} : ${url}`);
  }
}

// 3. Dimensions déclarées dans data/media.ts.
const declared = new Map();
const mediaSrc = readFileSync(join(ROOT, 'data', 'media.ts'), 'utf8');
for (const m of mediaSrc.matchAll(/src:\s*'([^']+)'[\s\S]*?width:\s*(\d+),\s*height:\s*(\d+)/g)) {
  declared.set(m[1], { width: Number(m[2]), height: Number(m[3]) });
}

// 4. Contrôles.
const rows = [];
for (const [ref, files] of refs) {
  if (!IMAGE_EXT.test(ref)) continue;
  const where = [...new Set(files)].join(', ');
  const exact = onDisk.get(ref);
  if (!exact) {
    const other = lowerIndex.get(ref.toLowerCase());
    errors.push(other
      ? `Casse incorrecte : « ${ref} » référencé dans ${where}, le fichier s'appelle « ${other} »`
      : `Image manquante : « ${ref} » référencée dans ${where}`);
    continue;
  }
  const buf = readFileSync(exact);
  const info = inspect(buf);
  const expected = EXT_FORMAT[extname(ref).toLowerCase()];
  if (!ALLOWED.has(info.format)) errors.push(`Format refusé (${info.format}) : ${ref}`);
  else if (expected && expected !== info.format) errors.push(`Extension trompeuse : ${ref} est en réalité un ${info.format}`);

  const size = statSync(exact).size;
  if (size > MAX_BYTES) warnings.push(`Fichier lourd (${Math.round(size / 1024)} Ko) : ${ref}`);

  const decl = declared.get(ref);
  if (decl && info.width && (decl.width !== info.width || decl.height !== info.height)) {
    errors.push(`Dimensions déclarées ${decl.width}×${decl.height} ≠ réelles ${info.width}×${info.height} : ${ref} (data/media.ts)`);
  }
  if (info.width && Math.min(info.width, info.height) < MIN_SIDE) {
    warnings.push(`Petite image (${info.width}×${info.height}) : ne pas l'afficher en grand format — ${ref}`);
  }
  rows.push({
    fichier: ref.replace('/images/', ''),
    format: info.format,
    dimensions: info.width ? `${info.width}×${info.height}` : '?',
    ratio: info.width ? (info.width / info.height).toFixed(2) : '?',
    poids: `${Math.round(size / 1024)} Ko`,
  });
}

for (const path of onDisk.keys()) {
  if (!refs.has(path)) warnings.push(`Fichier présent mais non utilisé : ${path}`);
}

// 5. Rapport.
console.log(`\n▸ Vérification des images — ${rows.length} référencée(s), ${onDisk.size} fichier(s) dans public/images`);
if (rows.length) console.table(rows);
for (const w of warnings) console.warn(`  ⚠ ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`  ✖ ${e}`);
  console.error(`\n✖ ${errors.length} problème(s) d'images : build interrompu.\n`);
  process.exit(1);
}
console.log('✔ Toutes les images référencées existent, avec la bonne casse, le bon format et les bonnes dimensions.\n');
