import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceDir = 'c:\\Users\\crypt\\Downloads\\Ai projects\\websites\\Inprogress\\BVM\\app\\public';
const targetDir = 'c:\\Users\\crypt\\Downloads\\Ai projects\\websites\\Inprogress\\BVM\\app\\bvm-next\\public\\new_assets\\optimized';

const imagesToOptimize = [
    'LVP-SVP- multidose infusion-ophthalmic eye dropper.png',
    'Large Volume Parenterals (LVP).png',
    'Multi-Dose Infusion  Irrigation Bottles.png',
    'Small Volume Parenterals (SVP) - Blow-Fill-Seal (BFS).png',
    'Ophthalmic  Eye Dropper Bottles.png'
];

async function optimizeImages() {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    for (const img of imagesToOptimize) {
        const srcPath = path.join(sourceDir, img);
        // Create a safe filename for web
        const safeName = img.toLowerCase()
            .replace('.png', '')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') + '.webp';

        const destPath = path.join(targetDir, safeName);

        try {
            console.log(`Processing: ${img} -> ${safeName}`);

            // For the hero image, we might want to scale it down slightly to ensure it's not massive
            // The user asked to reduce the size of the hero image
            let pipeline = sharp(srcPath);

            if (img.includes('LVP-SVP')) {
                // Hero image optimization
                pipeline = pipeline.resize(800, null, { withoutEnlargement: true });
            } else {
                // Other images
                pipeline = pipeline.resize(800, null, { withoutEnlargement: true });
            }

            await pipeline
                .webp({ quality: 80, effort: 6 })
                .toFile(destPath);

            console.log(`✅ Success`);
        } catch (err) {
            console.error(`❌ Failed to process ${img}:`, err);
        }
    }
}

optimizeImages();
