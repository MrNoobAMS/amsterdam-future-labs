// Rasterizes the featured apps' first screenshot into WebGL-ready textures for
// the 3D scroll phone (three.js can't sample SVGs directly), plus a branded
// "company" screen for the hero. Output → public/images/three/.
//
// Run via `npm run scroll-textures` (also wired into `npm run assets`).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const outDir = join(pub, 'images', 'three');

// Screen plane matches the App Store 6.9" source aspect (1320 × 2868).
const W = 720;
const H = Math.round((W * 2868) / 1320); // 1564

// Featured apps shown on the rotating phone, in scroll order. `src` is the
// screenshot rasterized onto the screen. Keep in sync with the section list
// in ScrollPhone.astro.
const screens = [
  { out: 'screen-meal-planner.jpg', src: 'images/apps/meal-planner/screen-1.svg' },
  { out: 'screen-breathwell.jpg', src: 'images/apps/breathwell/screen-1.png' },
  { out: 'screen-kamado-companion.jpg', src: 'images/apps/kamado-companion/screen-1.png' },
  { out: 'screen-sudoku-xl.jpg', src: 'images/apps/sudoku-xl/screen-1.svg' },
];

await mkdir(outDir, { recursive: true });

for (const { out, src } of screens) {
  await sharp(join(pub, src), { density: 320 })
    .resize(W, H, { fit: 'cover', position: 'top' })
    .flatten({ background: '#0b0c10' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(outDir, out));
  console.log('screen →', out);
}

// --- Company / hero screen: logo + wordmark on studio black ---
const logo = await sharp(join(pub, 'images', 'logo.png'))
  .resize(320, 320, { fit: 'inside' })
  .toBuffer();

const wordmark = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
     <text x="50%" y="62%" text-anchor="middle"
       font-family="Inter, system-ui, sans-serif" font-size="52" font-weight="700"
       letter-spacing="2" fill="#f5f6fa">AMSTERDAM</text>
     <text x="50%" y="67%" text-anchor="middle"
       font-family="Inter, system-ui, sans-serif" font-size="52" font-weight="700"
       letter-spacing="2" fill="#f5f6fa">FUTURE LABS</text>
     <text x="50%" y="74%" text-anchor="middle"
       font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="500"
       letter-spacing="6" fill="#8b8f9e">STUDIO · AMSTERDAM</text>
   </svg>`
);

await sharp({
  create: { width: W, height: H, channels: 3, background: '#0b0c10' },
})
  .composite([
    { input: logo, top: Math.round(H * 0.26), left: Math.round((W - 320) / 2) },
    { input: wordmark, top: 0, left: 0 },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(join(outDir, 'screen-company.jpg'));
console.log('screen → screen-company.jpg');

console.log('Done.');
