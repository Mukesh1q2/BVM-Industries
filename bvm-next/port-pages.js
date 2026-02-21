import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vitePagesDir = path.join(__dirname, '../src/pages');
const nextAppDir = path.join(__dirname, 'src/app');

const pageMappings = {
    'AboutPage.tsx': 'about/page.tsx',
    'ContactPage.tsx': 'contact/page.tsx',
    'QualityPage.tsx': 'quality/page.tsx',
    'TurnkeyPage.tsx': 'turnkey/page.tsx',
    'BuildYourLinePage.tsx': 'build-your-line/page.tsx',
    'MachinesPage.tsx': 'machines/page.tsx',
    'MouldsPage.tsx': 'moulds/page.tsx',
    'RefurbishmentPage.tsx': 'refurbishment/page.tsx',
    'QuotationPage.tsx': 'quotation/page.tsx'
};

for (const [vitePage, nextPath] of Object.entries(pageMappings)) {
    const source = path.join(vitePagesDir, vitePage);
    if (!fs.existsSync(source)) continue;

    let content = fs.readFileSync(source, 'utf8');

    // Fix imports
    content = content.replace(/from\s+['"]\.\.\/components\//g, "from '@/components/");
    content = content.replace(/from\s+['"]\.\.\/sections\//g, "from '@/sections/");
    content = content.replace(/from\s+['"]\.\.\/data\//g, "from '@/data/");

    if (content.match(/use(State|Effect|Ref|Configurator|Params|SearchParams)/)) {
        if (!content.includes('use client')) {
            content = '"use client";\n' + content;
        }
    }

    content = content.replace(/<SEO[\s\S]*?\/>/g, '');
    content = content.replace(/import SEO from '[^']+';/g, '');

    const destPath = path.join(nextAppDir, nextPath);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, content);
    console.log('Ported ' + nextPath);
}
