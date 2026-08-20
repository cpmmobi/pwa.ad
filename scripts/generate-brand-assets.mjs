import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'brand');

const INK = '#020617';
const BRAND = '#00C250';
const FONT = 'Helvetica, Arial, sans-serif';

// Shared "P" glyph, taken from src/app/icon.svg so the logo and the favicon
// stay identical. Its bounding box is x 160..400, y 120..460 in a 512 canvas.
const P_GLYPH =
  'M160 120h120c66.274 0 120 53.726 120 120 0 66.274-53.726 120-120 120h-40v100h-80V120zm80 160h40c22.091 0 40-17.909 40-40 0-22.091-17.909-40-40-40h-40v80z';

const GLYPH = { x: 160, y: 120, w: 240, h: 340 };

/** Places the glyph so its bounding box sits exactly at (x, y) with height h. */
function placeGlyph({ x, y, h, fill = BRAND }) {
  const scale = h / GLYPH.h;
  const tx = x - GLYPH.x * scale;
  const ty = y - GLYPH.y * scale;
  return `<g transform="translate(${tx.toFixed(2)},${ty.toFixed(2)}) scale(${scale.toFixed(4)})"><path d="${P_GLYPH}" fill="${fill}"/></g>`;
}

function squareMark({ size = 1200, transparent = false } = {}) {
  const markHeight = size * 0.55;
  const markWidth = markHeight * (GLYPH.w / GLYPH.h);
  const background = transparent
    ? ''
    : `<rect width="${size}" height="${size}" rx="${size * 0.25}" fill="${INK}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${background}${placeGlyph({
    x: (size - markWidth) / 2,
    y: (size - markHeight) / 2,
    h: markHeight,
  })}</svg>`;
}

function squareWordmark({ size = 1200 } = {}) {
  const fontSize = size * 0.24;
  // The leading period in ".ad" carries almost no visual weight, so centering
  // it geometrically makes the line look shifted right. Nudge it back.
  const dotCompensation = fontSize * 0.07;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.25}" fill="${INK}"/>
  <text x="${size / 2}" y="${size * 0.47}" text-anchor="middle" font-family="${FONT}" font-size="${fontSize}" font-weight="bold" fill="#ffffff" letter-spacing="${-fontSize * 0.02}">PWA</text>
  <text x="${size / 2 - dotCompensation}" y="${size * 0.69}" text-anchor="middle" font-family="${FONT}" font-size="${fontSize}" font-weight="bold" fill="${BRAND}" letter-spacing="${-fontSize * 0.02}">.ad</text>
</svg>`;
}

function landscapeWordmark({ width = 1200, height = 300 } = {}) {
  const fontSize = height * 0.55;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${INK}"/>
  <text x="${width / 2}" y="${height / 2 + fontSize * 0.36}" text-anchor="middle" font-family="${FONT}" font-size="${fontSize}" font-weight="bold" fill="#ffffff" letter-spacing="${-fontSize * 0.02}">PWA<tspan fill="${BRAND}">.ad</tspan></text>
</svg>`;
}

function landscapeLockup({ width = 1200, height = 300 } = {}) {
  const markHeight = height * 0.6;
  const markWidth = markHeight * (GLYPH.w / GLYPH.h);
  const fontSize = height * 0.5;
  const gap = height * 0.13;
  // "PWA.ad" in Helvetica Bold measures ~3.55x the font size.
  const textWidth = fontSize * 3.55;
  const startX = (width - (markWidth + gap + textWidth)) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${INK}"/>
  ${placeGlyph({ x: startX, y: (height - markHeight) / 2, h: markHeight })}
  <text x="${startX + markWidth + gap}" y="${height / 2 + fontSize * 0.36}" font-family="${FONT}" font-size="${fontSize}" font-weight="bold" fill="#ffffff" letter-spacing="${-fontSize * 0.02}">PWA<tspan fill="${BRAND}">.ad</tspan></text>
</svg>`;
}

const assets = [
  ['logo-square-1200.png', squareMark()],
  ['logo-square-transparent-1200.png', squareMark({ transparent: true })],
  ['logo-square-wordmark-1200.png', squareWordmark()],
  ['logo-landscape-1200x300.png', landscapeLockup()],
  ['logo-landscape-wordmark-1200x300.png', landscapeWordmark()],
];

await mkdir(OUT_DIR, { recursive: true });

for (const [name, svg] of assets) {
  await writeFile(join(OUT_DIR, name.replace(/\.png$/, '.svg')), svg);
  const info = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(OUT_DIR, name));
  console.log(`${name}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}
