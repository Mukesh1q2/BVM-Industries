import { Compass, Cog, ClipboardCheck, Shield, Clock, Headphones } from 'lucide-react';

export const COMPANY_CAPABILITIES = [
    {
        id: 1,
        title: 'Advanced Design & Simulation',
        description: 'We utilize high-end 3D CAD/CAM and Mould Flow Analysis to transition from initial concepts to precision-engineered prototypes. Our design phase focuses on optimizing cycle times and ensuring material integrity before a single piece of steel is cut.',
        image: '/capability_design.webp',
        icon: Compass
    },
    {
        id: 2,
        title: 'High-Precision Machining',
        description: 'Our in-house tool room is equipped with state-of-the-art CNC, EDM, and Surface Finishing technology. We achieve mirror-finish accuracy on SS316L components, ensuring that every B.F.S. mold and filling head meets the rigorous demands of aseptic production.',
        image: '/capability_machining.webp',
        icon: Cog
    },
    {
        id: 3,
        title: 'Sterile Integration (Class 100)',
        description: 'BVM platforms are engineered for high-level cleanroom compatibility. We integrate Class 100 Aseptic Chambers and CIP/SIP-friendly (Clean-in-Place/Steam-in-Place) architectures, adhering to strict 21 CFR Part 11 and global regulatory standards.',
        image: '/capability_assembly.webp',
        icon: Shield
    },
    {
        id: 4,
        title: 'Full-Scale Validation & Support',
        description: 'Every machine undergoes a rigorous DQ/IQ/OQ/PQ validation process. Our commitment doesn’t end at delivery; we provide 24/7 global technical support, spare parts management, and on-site training to ensure your production line never stops.',
        image: '/capability_assembly.webp',
        icon: ClipboardCheck
    }
];

export const QUALITY_PILLARS = [
    {
        id: 1,
        title: 'cGMP-Aligned Design',
        description: 'Cleanroom-ready layouts, CIP/SIP-friendly forms, and documentation support.',
        icon: Shield
    },
    {
        id: 2,
        title: 'Timely Delivery',
        description: 'Milestone tracking, in-house machining, and committed schedules.',
        icon: Clock
    },
    {
        id: 3,
        title: 'After-Sales Support',
        description: 'Spare parts, troubleshooting, and on-site assistance.',
        icon: Headphones
    }
];

export const ABOUT_CAPABILITIES = [
    'Design and manufacturing of blow moulding machines',
    'BFS (Blow Fill Seal) moulds and tooling',
    'PET bottle moulds and preforms',
    'Ampoule filling machinery',
    'Hydraulic cylinders and manifold blocks',
    'Stainless steel filter housings',
    'Custom precision components',
];

export const ABOUT_VALUES = [
    {
        title: 'Quality First',
        description: 'Every product undergoes rigorous testing to ensure it meets industry standards and customer expectations.',
    },
    {
        title: 'Customer Focus',
        description: 'We work closely with our clients to understand their needs and deliver tailored solutions.',
    },
    {
        title: 'Innovation',
        description: 'Continuous improvement and adoption of latest technologies to enhance our product offerings.',
    },
    {
        title: 'Integrity',
        description: 'Transparent business practices and ethical conduct in all our dealings.',
    },
];
