import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const masterIconPath = path.join(root, 'design', 'icon-master.svg');
const smallIconPath = path.join(root, 'design', 'icon-small.svg');
const iconsDir = path.join(root, 'public', 'icons');
const appDir = path.join(root, 'src', 'app');

async function ensureDirs() {
  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });
}

async function generate() {
  await ensureDirs();

  const svgMaster = fs.readFileSync(masterIconPath);
  const svgSmall = fs.readFileSync(smallIconPath);

  const createRoundedMask = (size) => {
    const r = Math.round(size * 0.22);
    return Buffer.from(`<svg width="${size}" height="${size}"><rect x="0" y="0" width="${size}" height="${size}" rx="${r}" ry="${r}" fill="white" /></svg>`);
  };

  // A. "any" purpose icons
  await sharp(svgMaster)
    .resize(192, 192)
    .composite([{ input: createRoundedMask(192), blend: 'dest-in' }])
    .png()
    .toFile(path.join(iconsDir, 'icon-192.png'));

  await sharp(svgMaster)
    .resize(512, 512)
    .composite([{ input: createRoundedMask(512), blend: 'dest-in' }])
    .png()
    .toFile(path.join(iconsDir, 'icon-512.png'));

  // B. "maskable" icons
  await sharp(svgMaster).resize(192, 192).png().toFile(path.join(iconsDir, 'maskable-192.png'));
  await sharp(svgMaster).resize(512, 512).png().toFile(path.join(iconsDir, 'maskable-512.png'));

  // C. Apple touch icon
  await sharp(svgMaster).resize(180, 180).png().toFile(path.join(appDir, 'apple-icon.png'));

  // D. Browser favicons
  fs.copyFileSync(smallIconPath, path.join(appDir, 'icon.svg'));

  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(sizes.map(size => 
    sharp(svgSmall).resize(size, size).png().toBuffer()
  ));
  
  const icoBuffer = await pngToIco(pngBuffers);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

  // Clean old icons if any
  const oldIcons = ['icon.png', 'favicon.png'];
  oldIcons.forEach(f => {
    if (fs.existsSync(path.join(appDir, f))) {
      fs.unlinkSync(path.join(appDir, f));
    }
  });
  if (fs.existsSync(path.join(root, 'public', 'favicon.ico'))) {
    fs.unlinkSync(path.join(root, 'public', 'favicon.ico'));
  }

  console.log("Icons generated successfully.");
}

generate().catch(console.error);
