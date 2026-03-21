export type SVPModel = {
  modelNo: string;
  cavity: string;
  stationDetails: string;
  applications: string[];
  performance: { volume: string; production: number; unit: string }[];
  badges?: string[];
};

export type LVPVariant = {
  type: string;
  production: number;
  unit: string;
};

export type LVPModel = {
  modelNo: string;
  cavity: string;
  volume: string;
  variants: LVPVariant[];
  badges?: string[];
};

export type CapWeldingModel = {
  modelNo: string;
  capacityRange: string;
  modes: { mode: string; speed: number; unit: string }[];
  badges?: string[];
};

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
    image?: string;
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
    image?: string;
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
    compatibleApplications?: string[];
    svpData?: SVPModel[];
    lvpData?: LVPModel[];
    capWeldingData?: CapWeldingModel[];
}
