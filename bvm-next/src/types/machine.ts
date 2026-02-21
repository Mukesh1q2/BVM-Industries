export interface TechnicalSpec {
    model: string;
    data: Record<string, string | number>;
    isHighlight?: boolean; // For highlighted rows
}

export interface SpecTable {
    title: string;
    headers: { key: string; label: string }[];
    rows: TechnicalSpec[];
    note?: string;
}

export interface FeatureSection {
    title: string;
    icon: 'Shield' | 'Zap' | 'Settings' | 'Activity' | 'Server' | 'CheckCircle' | 'Cpu' | 'Droplet';
    items: string[];
}

export interface ProcessCapability {
    title: string;
    icon: 'Settings' | 'Activity' | 'Server' | 'Droplet';
    description: string; // Supports HTML for now or strict string
}

export interface MachineData {
    id: string;
    slug: string;
    hero: {
        subtitle: string;
        title: string;
        highlight: string;
        description: string;
        image: string;
        brochureText: string;
    };
    features: FeatureSection[];
    processCapabilities?: {
        title: string;
        items: ProcessCapability[];
    };
    constructionStandards?: {
        title: string;
        description: string;
    };
    specTables: SpecTable[];
}
