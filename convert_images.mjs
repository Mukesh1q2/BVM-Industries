import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const dirsToScan = [publicDir, path.join(publicDir, 'products')];

const convertToWebp = async (filePath) => {
    const ext = path.extname(filePath);
    if (!['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) return;

    const originalSize = fs.statSync(filePath).size;
    const webpPath = filePath.replace(new RegExp(`${ext}$`, 'i'), '.webp');

    try {
        await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(webpPath);

        const newSize = fs.statSync(webpPath).size;
        console.log(`Converted ${path.basename(filePath)} -> ${path.basename(webpPath)} (Saved ${((originalSize - newSize) / 1024).toFixed(2)} KB)`);
    } catch (err) {
        console.error(`Error converting ${filePath}:`, err);
    }
};

const processDirectory = async (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isFile()) {
            await convertToWebp(fullPath);
        }
    }
};

await Promise.all(dirsToScan.map(processDirectory));
console.log('Conversion complete!');
