/**
 * Generates derived image assets:
 *  - Web-sized app screenshots from the original App Store captures
 *  - App icons from source artwork in the app project folders
 *  - Open Graph cards (1200×630) for every page group
 *
 * Sources are read from the sibling app folders when available; the script
 * skips anything whose source is missing, so it is safe to run anywhere.
 * Run via `npm run assets` (also runs automatically before `npm run build`).
 */

import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const appsRoot = path.dirname(root); // /Users/pieter/Documents/APP
const pub = (...p) => path.join(root, 'public', ...p);

const SCREEN_WIDTH = 660; // 2x the largest rendered phone width

async function ensureDir(file) {
  await mkdir(path.dirname(file), { recursive: true });
}

async function resizeTo(src, dest, width) {
  if (!existsSync(src)) {
    console.warn(`skip (missing source): ${src}`);
    return;
  }
  await ensureDir(dest);
  await sharp(src).resize({ width }).png({ quality: 80, compressionLevel: 9 }).toFile(dest);
  console.log(`wrote ${path.relative(root, dest)}`);
}

// ---------- BreathWell: real screenshots + logo ----------

const bwShots = ['IMG_5476.PNG', 'IMG_5478.PNG', 'IMG_5479.PNG', 'IMG_5480.PNG'];
const bwSrcDir = path.join(appsRoot, 'BreathWell', 'Media', 'Screenshots');

for (const [i, name] of bwShots.entries()) {
  await resizeTo(
    path.join(bwSrcDir, name),
    pub('images', 'apps', 'breathwell', `screen-${i + 1}.png`),
    SCREEN_WIDTH
  );
}

await resizeTo(
  path.join(appsRoot, 'BreathWell', 'Media', 'Logo', 'BreathWell Logo 1.1.png'),
  pub('images', 'apps', 'breathwell', 'icon.png'),
  192
);

// ---------- Sudoku XL: icon from render ----------

await resizeTo(
  path.join(appsRoot, 'SudokuXL', 'Media', 'SudokuXL render.png'),
  pub('images', 'apps', 'sudoku-xl', 'icon.png'),
  192
);

// ---------- Open Graph cards ----------

const ogCards = [
  {
    file: 'default.png',
    eyebrow: 'AMSTERDAM FUTURE LABS',
    title: 'Thoughtfully crafted',
    title2: 'iPhone apps.',
    accent: '#8b5cf6',
    accent2: '#22d3ee',
  },
  {
    file: 'breathwell.png',
    eyebrow: 'BREATHWELL',
    title: 'Breathe better.',
    title2: 'Feel better.',
    accent: '#8FAE9B',
    accent2: '#cfe0d6',
  },
  {
    file: 'kamado-companion.png',
    eyebrow: 'KAMADO COMPANION',
    title: 'Master fire.',
    title2: 'Create flavor.',
    accent: '#E25A2C',
    accent2: '#f7c14b',
  },
  {
    file: 'airfryer-companion.png',
    eyebrow: 'AIRFRYER COMPANION',
    title: 'Every dish,',
    title2: 'perfectly crisp.',
    accent: '#F5A623',
    accent2: '#ffd98a',
  },
  {
    file: 'sudoku-xl.png',
    eyebrow: 'SUDOKU XL',
    title: 'Pure sudoku,',
    title2: 'beautifully made.',
    accent: '#5B6BF5',
    accent2: '#9aa5ff',
  },
  {
    file: 'meal-planner.png',
    eyebrow: 'MEAL PLANNER',
    title: 'Plan smarter.',
    title2: 'Eat better.',
    accent: '#3BAE6E',
    accent2: '#8ee0ae',
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

for (const card of ogCards) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="glow" cx="85%" cy="0%" r="90%">
      <stop offset="0" stop-color="${card.accent}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${card.accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${card.accent}"/>
      <stop offset="1" stop-color="${card.accent2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0b0c10"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="92" y="150" width="64" height="8" rx="4" fill="url(#bar)"/>
  <text x="92" y="216" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="${card.accent}">${esc(card.eyebrow)}</text>
  <text x="88" y="330" font-family="Helvetica, Arial, sans-serif" font-size="86" font-weight="700" letter-spacing="-2.5" fill="#f5f6fa">${esc(card.title)}</text>
  <text x="88" y="430" font-family="Helvetica, Arial, sans-serif" font-size="86" font-weight="700" letter-spacing="-2.5" fill="#f5f6fa">${esc(card.title2)}</text>
  <text x="92" y="540" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="500" fill="rgba(245,246,250,0.55)">amsterdamfuturelabs.com</text>
</svg>`;

  const dest = pub('images', 'og', card.file);
  await ensureDir(dest);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(dest);
  console.log(`wrote ${path.relative(root, dest)}`);
}

console.log('assets done');
