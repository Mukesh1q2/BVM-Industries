import type { MachineData } from '../types/machine';

export const machines: MachineData[] = [
    {
        id: 'ffs',
        slug: 'ffs',
        hero: {
            subtitle: 'Revolutionize Your Packaging',
            title: 'Form Fill Seal (F.F.S) System',
            highlight: 'System',
            description: 'State-of-the-art F.F.S systems that redefine efficiency and reliability. Engineered for seamless solutions in food and pharmaceutical applications, ensuring optimal hygiene and product integrity.',
            image: '/new_assets/optimized/ffs-machine.webp',
            brochureText: 'Download FFS Brochure'
        },
        features: [
            {
                title: 'Key Features',
                icon: 'Zap',
                items: [
                    'High-Speed Operation: Maximum throughput without compromising quality.',
                    'Versatile Packaging: Handles various materials and container formats.',
                    'Enhanced Automation: Sophisticated controls minimize operator intervention.',
                    'Precision Engineering: Exact filling and sealing to safeguard against contamination.',
                    'Sustainability Focus: Designed to reduce waste and improve energy efficiency.'
                ]
            },
            {
                title: 'Unmatched Support',
                icon: 'Shield',
                items: [
                    'Customizable options to meet unique operational requirements.',
                    'Full DQ/IQ/OQ/PQ documentation support.',
                    'Dedicated technicians for installation and ongoing service.',
                    'FDA 21 CFR Part 11 Compliance support.'
                ]
            }
        ],
        processCapabilities: {
            title: 'Process Capabilities',
            items: [
                {
                    title: 'Filling Ranges',
                    icon: 'Settings',
                    description: '<strong class="text-white block mb-1">SVP / Eye/Ear drops:</strong> 0.2 mL to 30 mL<br /><strong class="text-white block mt-2 mb-1">LVP / IV fluids:</strong> 50 mL to 3,000 mL'
                },
                {
                    title: 'Sterilization & Cleaning',
                    icon: 'Activity',
                    description: 'Integrated CIP (Cleaning-In-Place) and SIP (Sterilization-In-Place) with printed cycle records. Optional nitrogen flushing for controlled headspace.'
                },
                {
                    title: 'Control System',
                    icon: 'Server',
                    description: 'Siemens S7-1500 PLC platform with SCADA, data logging, and cloud connectivity options. Real-time audit trails.'
                }
            ]
        },
        specTables: [
            {
                title: 'Large Volume Parenterals (LVP)',
                headers: [
                    { key: 'model', label: 'Product Name' },
                    { key: 'small', label: 'IV Fluids (Small)' },
                    { key: 'medium', label: 'IV Fluids (Medium)' },
                    { key: 'large', label: 'IV Fluids (Large)' }
                ],
                rows: [
                    { model: 'MODEL 540', data: { small: '50ML/ 100ML', medium: '100ML/ 300ML/ 500ML', large: '100/ 300/ 500/ 1000ML' } },
                    { model: 'Cavities', data: { small: '12', medium: '8', large: '6' } },
                    { model: 'Capacity / Hr', isHighlight: true, data: { small: '3350', medium: '2050', large: '1500' } },
                    { model: 'MODEL 940', data: { small: '50ML/ 100ML', medium: '100ML/ 300ML/ 500ML', large: '100/ 300/ 500/ 1000ML' } },
                    { model: 'Cavities', data: { small: '24', medium: '16', large: '12' } },
                    { model: 'Capacity / Hr', isHighlight: true, data: { small: '6700', medium: '4100', large: '3000' } }
                ]
            },
            {
                title: 'Small Volume Parenterals (SVP)',
                headers: [
                    { key: 'model', label: 'Product Name' },
                    { key: 'units', label: 'Units' },
                    { key: 'respules', label: 'Respules' },
                    { key: 'wfi', label: 'WFI' },
                    { key: 'eye', label: 'Eye Drops' }
                ],
                rows: [
                    { model: 'MODEL 3105', data: { units: '0.5ML', respules: '3ML/ 5ML', wfi: '5ML/ 10ML', eye: '5ML/ 10ML' } },
                    { model: 'Cavities', data: { units: '30', respules: '30', wfi: '25', eye: '18' } },
                    { model: 'Capacity / Hr', isHighlight: true, data: { units: '7500', respules: '7500', wfi: '6500', eye: '4600' } },
                    { model: 'MODEL 9105', data: { units: 'DOUBLE', respules: 'DOUBLE COMBO', wfi: 'DOUBLE COMBO', eye: 'DOUBLE COMBO' } },
                    { model: 'Capacity / Hr', isHighlight: true, data: { units: '15000', respules: '15000', wfi: '13000', eye: '9200' } }
                ],
                note: '* Hourly output ranges typically span from 4,600 to 27,000 units/hour depending on configuration.'
            }
        ]
    },
    {
        id: 'bfs',
        slug: 'bfs',
        hero: {
            subtitle: 'Advanced Liquid Filling',
            title: 'Blow Fill Seal (B.F.S) Technology',
            highlight: 'Technology',
            description: 'State-of-the-art systems tailored for I.V. parenteral packaging. Integrating container formation, filling, and sealing into a single sterile cycle.',
            image: '/new_assets/optimized/bfs-machine.webp',
            brochureText: 'Download BFS Technology Brochure'
        },
        features: [
            {
                title: 'Key Features',
                icon: 'CheckCircle',
                items: [
                    'Integrated Auto Deflesher System: Automates removal of excess material, optimizing waste and cost.',
                    '21 CFR Part 11 Compliance: Secure, reliable, and auditable electronic records.',
                    'Continuous Production Efficiency: Non-stop operation with consistent quality.',
                    'Aseptic Processing: Sterile environment reducing contamination risk.',
                    'Flexible Container Formats: Ampoules, vials, and customized designs.'
                ]
            },
            {
                title: 'Control & Monitoring',
                icon: 'Server',
                items: [
                    'Siemens S7-1500 PLC for reliable control & data logging',
                    'Online velocity & differential pressure monitoring',
                    'Active air sampling & passive particle counting options',
                    'Full DQ/IQ/OQ/PQ documentation support'
                ]
            }
        ],
        processCapabilities: {
            title: 'Applications & Range',
            items: [
                {
                    title: 'Small Volume Parenterals (SVP)',
                    icon: 'Droplet',
                    description: 'Eye/Ear drops: 0.2 mL to 30 mL'
                },
                {
                    title: 'Large Volume Parenterals (LVP)',
                    icon: 'Activity',
                    description: 'IV fluids & irrigation water: 50 mL to 3,000 mL'
                }
            ]
        },
        constructionStandards: {
            title: 'Construction Standards',
            description: 'All product-contact components are fabricated from <span class="text-white font-semibold">Stainless Steel 316L</span>. Non-contact structural parts use <span class="text-white font-semibold">Stainless Steel 304</span>. The design minimizes dead legs and supports sanitary flow.'
        },
        specTables: [
            {
                title: 'Representative Models & Performance',
                headers: [
                    { key: 'model', label: 'Model' },
                    { key: 'type', label: 'Type' },
                    { key: 'features', label: 'Key Features' },
                    { key: 'capacity', label: 'Capacity Range' }
                ],
                rows: [
                    { model: 'BFS-8166', data: { type: 'SVP High-Speed', features: 'Servo motions, auto CIP/SIP, online monitoring, 21 CFR Part 11', capacity: 'Up to 13,500/hr' } },
                    { model: 'BFS-540', data: { type: 'LVP Standard', features: 'Hydraulic motion option, Siemens S7-1500, maintenance-friendly', capacity: '~3,350/hr (12 Cav)' } },
                    { model: '940 Series', data: { type: 'LVP High-Output', features: 'Multiple cavity configurations, high throughput capacity', capacity: 'Up to 6,700/hr' } }
                ]
            }
        ]
    },
    {
        id: 'cap-sealing',
        slug: 'euro-cap-sealing',
        hero: {
            subtitle: 'Elevating Industry Standards',
            title: 'Euro Cap Sealing / Welding',
            highlight: 'Machine',
            description: 'High-performance sealing solutions for I.V. parenteral packaging. Available in both Semi-Automatic and Fully Automatic models for precision, consistency, and efficiency.',
            image: '/new_assets/optimized/cap-sealing-machine.webp',
            brochureText: 'Download Sealing Specs'
        },
        features: [
            {
                title: 'Semi-Automatic Model',
                icon: 'Settings',
                items: [
                    'Ideal for small to medium production volumes.',
                    'User-friendly operation with adjustable torque control.',
                    'Compact design with minimal floor space requirement.',
                    'Low maintenance and easy cleaning.'
                ]
            },
            {
                title: 'Fully Automatic Model',
                icon: 'Zap',
                items: [
                    'High-speed continuous operation for large batches.',
                    'Automatic cap feeding and placement system.',
                    'PLC-based control with HMI interface.',
                    'Integrated rejection system for faulty caps (optional).',
                    'Compatible with online inspection systems.'
                ]
            }
        ],
        constructionStandards: {
            title: 'Technical Highlights',
            description: 'Robust <span class="text-white font-semibold">Stainless Steel</span> construction with vibration-free performance. Adjustable height and conveyor synchronization. Compliant with industry safety and hygiene standards.'
        },
        specTables: [
            {
                title: '400 Series Specifications',
                headers: [
                    { key: 'model', label: 'Model' },
                    { key: 'range', label: 'Bottle Range (ml)' },
                    { key: 'capacity', label: 'Capacity / Hr' }
                ],
                rows: [
                    { model: 'MODEL - 416', data: { range: '50 / 100 / 300 / 500 / 1000', capacity: '2000' } },
                    { model: 'MODEL - 421', data: { range: '50 / 100 / 300 / 500', capacity: '2500' } },
                    { model: 'MODEL - 420', data: { range: '50 / 100', capacity: '3200' } }
                ]
            }
        ]
    }
];
