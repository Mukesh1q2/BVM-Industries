import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'src/app');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('page.tsx')) results.push(file);
        }
    });
    return results;
}

const files = walkDir(pagesDir);

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

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

    fs.writeFileSync(file, content);
    console.log(`Patched: ${file}`);
}
