import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    "src/sections/ServicesSection.tsx",
    "src/sections/ProductsSection.tsx",
    "src/sections/HeroSection.tsx",
    "src/sections/Footer.tsx",
    "src/sections/ContactSection.tsx",
    "src/hooks/use-mobile.ts",
    "src/contexts/ThemeContext.tsx",
    "src/components/RevealSection.tsx",
    "src/components/ProductDetailModal.tsx",
    "src/components/Navigation.tsx",
    "src/components/configurator/ConfiguratorResults.tsx",
    "src/components/configurator/ConfiguratorContext.tsx",
    "src/components/AIChatbot.tsx",
    "src/components/3d/Machine3DViewer.tsx"
];

for (const relPath of files) {
    const file = path.join(__dirname, relPath);
    if (!fs.existsSync(file)) {
        console.log(`Skipping (not found): ${relPath}`);
        continue;
    }
    let content = fs.readFileSync(file, 'utf8');

    // Add use client
    if (!content.includes('"use client"') && !content.includes("'use client'")) {
        content = '"use client";\n' + content;
    }

    // Next.js Link replacement
    content = content.replace(/import\s+\{([^}]*)\}\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
        let nextImports = [];
        let domImports = [];
        if (imports.includes('Link')) nextImports.push(`import Link from 'next/link';`);
        if (imports.includes('useNavigate')) {
            domImports.push('useRouter');
        }
        if (imports.includes('useLocation')) {
            domImports.push('usePathname');
        }
        if (imports.includes('useParams')) {
            domImports.push('useParams');
        }

        let res = nextImports.join('\n');
        if (domImports.length > 0) {
            res += `\nimport { ${domImports.join(', ')} } from 'next/navigation';`;
        }
        return res;
    });

    // Replace usage
    content = content.replace(/useNavigate\(\)/g, "useRouter()");
    content = content.replace(/useLocation\(\)/g, "usePathname()");

    // Replace <Link to="..."> with <Link href="...">
    content = content.replace(/<Link([^>]*)to=/g, "<Link$1href=");

    // Write back
    fs.writeFileSync(file, content);
    console.log(`Patched: ${relPath}`);
}
