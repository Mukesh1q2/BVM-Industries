import { Compass, Cog, ClipboardCheck, Shield, Clock, Headphones } from 'lucide-react';

export const COMPANY_CAPABILITIES = [
    {
        id: 1,
        title: 'Design & Engineering',
        description: 'CAD/CAM, mould flow, and prototyping.',
        image: '/capability_design.webp',
        icon: Compass
    },
    {
        id: 2,
        title: 'Precision Machining',
        description: 'CNC, EDM, and surface finishing.',
        image: '/capability_machining.webp',
        icon: Cog
    },
    {
        id: 3,
        title: 'Validation & Support',
        description: 'DQ/IQ/OQ/PQ documentation and 24/7 global support.',
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
