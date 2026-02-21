import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/app/machines/page.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace top imports
content = content.replace(/import \{ useState, useEffect \} from 'react';/, "import { useState, useEffect } from 'react';\nimport { useSearchParams, useRouter, usePathname } from 'next/navigation';");

// Replace hook signature
content = content.replace(/const \[searchParams, setSearchParams\] = useSearchParams\(\);/, "const searchParams = useSearchParams();\n    const router = useRouter();\n    const pathname = usePathname();");

// Replace setter
content = content.replace(/setSearchParams\(filterId === 'all' \? \{\} : \{ filter: filterId \} \);/, "if (filterId === 'all') { router.push(pathname, {scroll: false}); } else { router.push(`${pathname}?filter=${filterId}`, {scroll: false}); }");

fs.writeFileSync(file, content);
console.log('Fixed MachinesPage next/navigation hooks');
