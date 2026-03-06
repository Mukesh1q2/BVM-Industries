import type { MachineData } from '../types/machine';

export const machines: MachineData[] = [
    {
        id: 'ffs',
        slug: 'ffs',
        hero: {
            subtitle: 'REVOLUTIONIZE YOUR PACKAGING OPERATIONS',
            title: 'Form Fill Seal (F.F.S) System',
            highlight: 'System',
            description: 'State-of-the-art Form Fill Seal (F.F.S) systems that redefine efficiency and reliability. Engineered to provide a seamless solution for a wide range of products in both food and pharmaceutical applications, ensuring optimal hygiene and product integrity.',
            image: '/new_assets/optimized/ffs-machine-dark.png',
            brochureText: 'Download FFS Brochure'
        },
        features: [
            {
                title: 'Key Features',
                icon: 'Zap',
                items: [
                    'High-Speed Operation: Maximum throughput without compromising quality.',
                    'Versatile Packaging Solutions: Handles various materials and container formats.',
                    'Enhanced Automation: Sophisticated control systems and user-friendly interfaces minimize operator intervention.',
                    'Precision Engineering: Precise filling and sealing processes safeguard against contamination and product loss.',
                    'Sustainability Focus: Designed to reduce waste and improve energy efficiency.'
                ]
            },
            {
                title: 'Customizable & Unmatched Support',
                icon: 'Shield',
                items: [
                    'Customizable options to meet unique operational requirements.',
                    'From initial consultation to installation and ongoing support.',
                    'Dedicated technicians on standby to assist you.',
                    'Discover the future of packaging and elevate your operations.'
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
                    title: 'Aseptic Integration',
                    icon: 'Activity',
                    description: 'Integrated Class 100 Chamber shielding the Filling Head. Dedicated sterile air and filtered air line manifolds.'
                },
                {
                    title: 'Control System',
                    icon: 'Server',
                    description: 'Isolated alloy-steel Hydraulic Powerpack and synchronized HGH45HA linear carriage assemblies for immense, repeatable clamping force.'
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
            subtitle: 'ADVANCED B.F.S SYSTEMS',
            title: 'Blow Fill Seal (B.F.S) Technology',
            highlight: 'Technology',
            description: 'Elevating Pharmaceutical Standards with BVM Industries’ B.F.S Solutions tailored specifically for I.V. parenteral packaging to meet the highest standards of safety, efficiency, and regulatory compliance.',
            image: '/new_assets/optimized/bfs-machine-dark.png',
            brochureText: 'Download BFS Technology Brochure'
        },
        features: [
            {
                title: 'Key Features',
                icon: 'CheckCircle',
                items: [
                    'Integrated Auto Deflesher System: Automates removal of excess material to optimize material utilization and minimize waste.',
                    'Compliance with 21 CFR Part 11: Electronic records and signatures are secure, reliable, and readily auditable.',
                    'Continuous Production Efficiency: Designed for non-stop operation to enhance production throughput.',
                    'Aseptic Processing for Sterile Environments: Significantly reduces contamination risk for sensitive I.V. solutions.',
                    'Flexible Container Formats: Accommodates ampoules, vials, and customized designs.'
                ]
            },
            {
                title: 'Customized Solutions & Support',
                icon: 'Server',
                items: [
                    'Customizable B.F.S solutions tailored to individual operational goals.',
                    'Unparalleled customer support from installation to ongoing maintenance.',
                    'Comprehensive training and assistance from knowledgeable technicians.',
                    'Experience excellence in I.V. Parenteral Packaging.'
                ]
            }
        ],
        processCapabilities: {
            title: 'Applications & Range',
            items: [
                {
                    title: 'Ophthalmic / SVP Formats',
                    icon: 'Droplet',
                    description: 'High-precision SVPs (0.5 mL to 100 mL) utilizing configurable 50-Cavity Ophthalmic Molds (e.g., 5 vials x 10 parisons).'
                },
                {
                    title: 'Respiratory & LVP Formats',
                    icon: 'Activity',
                    description: 'Large Volume Parenterals (250 mL to 1000 mL) optimized for intravenous fluids, irrigation solutions, and nebulizers.'
                }
            ]
        },
        constructionStandards: {
            title: 'Construction Standards',
            description: 'All product-contact components are fabricated from <span class="text-white font-semibold">Stainless Steel 316L</span>. The design strictly adheres to cGMP norms, minimizing dead legs and supporting sanitary flow.'
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
            subtitle: 'ELEVATING INDUSTRY STANDARDS',
            title: 'Euro Cap Sealing / Welding',
            highlight: 'Machine',
            description: 'A state-of-the-art fully automatic solution tailored for the I.V. parenteral packaging sector. Available in high-performance Semi-Automatic and Fully Automatic models, delivering precision, consistency, and efficiency in cap sealing operations.',
            image: '/new_assets/optimized/cap-sealing-machine.webp',
            brochureText: 'Download Sealing Specs'
        },
        features: [
            {
                title: 'Semi-Automatic Model',
                icon: 'Settings',
                items: [
                    'Ideal for small to medium production volumes where flexibility is essential.',
                    'User-friendly operation with adjustable torque control for accurate sealing.',
                    'Suitable for multiple container sizes and IV FLUID BOTTLES 50 ML – 3000ML.',
                    'Compact design with minimal floor space requirement, low maintenance, and easy cleaning.'
                ]
            },
            {
                title: 'Fully Automatic Model',
                icon: 'Zap',
                items: [
                    'High-speed continuous operation seamlessly integrated with filling systems.',
                    'Automatic cap feeding and placement system with precision torque control.',
                    'PLC-based control with HMI interface.',
                    'Integrated rejection system for faulty caps (optional) and online inspection compatible.'
                ]
            }
        ],
        constructionStandards: {
            title: 'Technical Highlights',
            description: '<span class="text-white font-semibold">Robust stainless-steel construction</span> with vibration-free performance. Features adjustable height, conveyor synchronization, and compliance with industry safety and hygiene standards. Customization available as per container specifications.'
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
