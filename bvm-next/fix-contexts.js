import fs from 'fs';
import path from 'path';

const filesToPatch = [
    'src/contexts/ThemeContext.tsx',
    'src/components/configurator/ConfiguratorContext.tsx',
    'src/app/build-your-line/page.tsx'
];

for (const relPath of filesToPatch) {
    const file = path.join(process.cwd(), relPath);
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');

    // Ensure "use client" is at the very top
    if (!content.includes('use client')) {
        content = '"use client";\n' + content;
        fs.writeFileSync(file, content);
        console.log(`Patched ${relPath} with 'use client'`);
    }
}
