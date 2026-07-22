import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Find all zip files in root directory
const files = fs.readdirSync(rootDir);
const zipFiles = files.filter(f => f.endsWith('.zip') && !f.includes('node_modules'));

if (zipFiles.length === 0) {
  console.log('No ZIP files found in the root directory.');
  process.exit(0);
}

console.log(`Found ZIP files: ${zipFiles.join(', ')}`);

const publicGalleryDir = path.join(rootDir, 'public', 'gallery');
if (!fs.existsSync(publicGalleryDir)) {
  fs.mkdirSync(publicGalleryDir, { recursive: true });
}

// Ensure unzip is available
try {
  execSync('unzip -v', { stdio: 'ignore' });
} catch (e) {
  console.error('unzip command is not available. Please install unzip.');
  process.exit(1);
}

zipFiles.forEach(zipFile => {
  const zipPath = path.join(rootDir, zipFile);
  console.log(`Extracting ${zipFile}...`);
  try {
    // Extract to public/gallery
    execSync(`unzip -o -q "${zipPath}" -d "${publicGalleryDir}"`);
    console.log(`Extracted ${zipFile} successfully.`);
  } catch (e) {
    console.error(`Failed to extract ${zipFile}:`, e.message);
  }
});

// Now read the extracted directory structure and generate JSON metadata
const galleryMetadata = {};

const scanDirectory = (dir) => {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
        // relative path from public folder
        const relativePath = '/' + path.relative(path.join(rootDir, 'public'), fullPath).replace(/\\/g, '/');
        
        // Use folder name as category/section hint
        const parts = relativePath.split('/');
        const folderName = parts.length > 2 ? parts[parts.length - 2] : '';
        
        if (!galleryMetadata[folderName]) {
          galleryMetadata[folderName] = [];
        }
        galleryMetadata[folderName].push(relativePath);
      }
    }
  }
};

scanDirectory(publicGalleryDir);

console.log('Found gallery structure:');
console.log(JSON.stringify(galleryMetadata, null, 2));

const mapPath = path.join(rootDir, 'src', 'data', 'gallery-map.json');
fs.writeFileSync(mapPath, JSON.stringify(galleryMetadata, null, 2));
console.log(`\nWrote metadata to ${mapPath}.`);
