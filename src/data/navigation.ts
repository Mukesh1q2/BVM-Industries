import { Box, Settings, Activity, Droplet, PenTool, Layers, Factory, RefreshCw, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SubItem {
    label: string;
    href: string;
    icon?: LucideIcon;
    desc?: string;
}

export interface MegaMenuColumn {
    title: string;
    items: SubItem[];
}

export interface NavItem {
    label: string;
    href?: string;
    type?: 'mega' | 'dropdown';
    columns?: MegaMenuColumn[]; // For mega menu
    items?: SubItem[]; // For simple dropdown
}

export const navStructure: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Build Your Line', href: '/build-your-line' },
    {
        label: 'Solutions',
        type: 'mega',
        columns: [
            {
                title: 'Core Machinery',
                items: [
                    { label: 'F.F.S Machines', href: '/machines/ffs', icon: Box, desc: 'Form Fill Seal Systems' },
                    { label: 'B.F.S Machines', href: '/machines/bfs', icon: Activity, desc: 'Blow Fill Seal Technology' },
                    { label: 'Euro Cap Sealing', href: '/machines/euro-cap-sealing', icon: Settings, desc: 'Sealing & Welding' },
                ]
            },
            {
                title: 'Applications',
                items: [
                    { label: 'Injectables (SVP/LVP)', href: '/machines?filter=injectables', icon: Droplet },
                    { label: 'Ophthalmic', href: '/machines?filter=ophthalmic', icon: Activity },
                    { label: 'Respiratory', href: '/machines?filter=respiratory', icon: Factory },
                ]
            },
            {
                title: 'Ancillary',
                items: [
                    { label: 'Precision Moulds', href: '/moulds', icon: Layers },
                    { label: 'General Products', href: '/products', icon: PenTool },
                ]
            }
        ]
    },
    {
        label: 'Services',
        type: 'dropdown',
        items: [
            { label: 'Turnkey Projects', href: '/services/turnkey', icon: Factory },
            { label: 'Refurbishment', href: '/services/refurbishment', icon: RefreshCw },
            { label: 'Quality Assurance', href: '/quality', icon: ShieldCheck },
        ]
    },
    {
        label: 'Company',
        type: 'dropdown',
        items: [
            { label: 'About Us', href: '/about' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Careers', href: '/career' },
        ]
    }
];
