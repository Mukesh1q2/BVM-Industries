import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

const updateFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content.replace(/\/(hero_bottle_large|machine_feature_bg|industry_pharma|industry_industrial|industry_healthcare|engineered_for_panel|capability_design|capability_machining|capability_assembly)\.jpg/g, '/$1.webp');
    newContent = newContent.replace(/\.png/g, '.webp');

    // Also specifically for anything in public/products:
    newContent = newContent.replace(/\/products\/([^"'\s]+)\.jpg/g, '/products/$1.webp');

    // Hero section has hero_bottle_large.png
    newContent = newContent.replace(/\/hero_bottle_large\.webp/g, '/hero_bottle_large.webp'); // catch all

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
};

const walkSync = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkSync(fullPath);
        } else if (/\.(ts|tsx)$/.test(fullPath)) {
            updateFile(fullPath);
        }
    }
};

walkSync(srcDir);
console.log('Update complete!');
