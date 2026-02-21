import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    "src/sections/ServicesSection.tsx",
    "src/sections/ProductsSection.tsx",
    "src/sections/MachineFeatureSection.tsx",
    "src/sections/HeroSection.tsx",
    "src/sections/Footer.tsx",
    "src/sections/EngineeredSection.tsx",
    "src/components/ProductDetailModal.tsx",
    "src/components/Navigation.tsx",
    "src/components/ErrorBoundary.tsx",
    "src/components/configurator/StepVolume.tsx",
    "src/components/configurator/StepSpeed.tsx",
    "src/components/configurator/StepProduct.tsx",
    "src/components/configurator/StepAddons.tsx",
    "src/components/configurator/ConfiguratorStep.tsx",
    "src/components/configurator/ConfiguratorResults.tsx",
    "src/components/AIChatbot.tsx"
];

for (const relPath of files) {
    const file = path.join(__dirname, relPath);
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    if (!content.includes('"use client"') && !content.includes("'use client'")) {
        content = '"use client";\n' + content;
        fs.writeFileSync(file, content);
        console.log(`Added use client to ${relPath}`);
    }
}
