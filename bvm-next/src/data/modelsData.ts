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

export const svpData: SVPModel[] = [
  {
    modelNo: 'FSSS630',
    cavity: '6P/30C',
    stationDetails: 'Single Station Single Decker',
    applications: ['SWFI', 'RESPULES', 'EYE DROPS'],
    performance: [
      { volume: '0-5 mL', production: 1.85, unit: 'Lac' },
      { volume: '5-10 mL', production: 1.75, unit: 'Lac' },
      { volume: '15-30 mL', production: 1.20, unit: 'Lac' }
    ],
    badges: ['Cost Efficient']
  },
  {
    modelNo: 'FSDS660',
    cavity: '6P/60C',
    stationDetails: 'Double Station Single Decker',
    applications: ['SWFI', 'RESPULES', 'EYE DROPS'],
    performance: [
      { volume: '0-5 mL', production: 3.25, unit: 'Lac' },
      { volume: '5-10 mL', production: 3.10, unit: 'Lac' },
      { volume: '15-30 mL', production: 2.50, unit: 'Lac' }
    ]
  },
  {
    modelNo: 'FSDS670',
    cavity: '6P/70C',
    stationDetails: 'Double Station Single Decker',
    applications: ['SWFI'],
    performance: [
      { volume: '0-5 mL', production: 3.60, unit: 'Lac' },
      { volume: '5-10 mL', production: 3.45, unit: 'Lac' },
      { volume: '15-30 mL', production: 2.75, unit: 'Lac' }
    ]
  },
  {
    modelNo: 'FSDS684',
    cavity: '6P/84C',
    stationDetails: 'Double Station Single Decker',
    applications: ['SWFI'],
    performance: [
      { volume: '0-5 mL', production: 4.20, unit: 'Lac' },
      { volume: '5-10 mL', production: 3.95, unit: 'Lac' }
    ]
  },
  {
    modelNo: 'FSDD6120',
    cavity: '6P/120C',
    stationDetails: 'Double Station Double Decker',
    applications: ['SWFI'],
    performance: [
      { volume: '0-5 mL', production: 4.50, unit: 'Lac' },
      { volume: '5-10 mL', production: 4.20, unit: 'Lac' },
      { volume: '15-30 mL', production: 2.50, unit: 'Lac' }
    ],
    badges: ['High Output', 'Fastest Model']
  },
  {
    modelNo: 'FSDS0480',
    cavity: '4P/80C',
    stationDetails: 'Double Station Single Decker',
    applications: ['RESPULES', 'EYE DROPS'],
    performance: [
      { volume: '0.5-5 mL', production: 4.50, unit: 'Lac' }
    ]
  }
];

export const lvpData: LVPModel[] = [
  {
    modelNo: 'BLA-1260',
    cavity: '12P/12C',
    volume: '500 mL',
    variants: [
      { type: 'Single Station', production: 60, unit: 'K' }
    ]
  },
  {
    modelNo: 'BLA-1060',
    cavity: '10P/20C',
    volume: '500 mL',
    variants: [
      { type: 'Single Station', production: 50, unit: 'K' },
      { type: 'Double Station', production: 65, unit: 'K' }
    ],
    badges: ['Versatile']
  },
  {
    modelNo: 'BLA-1050',
    cavity: '10P/10C',
    volume: '100 mL',
    variants: [
      { type: 'Single Station', production: 60, unit: 'K' },
      { type: 'Double Station', production: 85, unit: 'K' }
    ]
  },
  {
    modelNo: 'BLA-1250',
    cavity: '12P/12C',
    volume: '100 mL',
    variants: [
      { type: 'Single Station', production: 72, unit: 'K' }
    ]
  },
  {
    modelNo: 'BLA-1450',
    cavity: '14P/14C',
    volume: '100 mL',
    variants: [
      { type: 'Single Station', production: 85, unit: 'K' }
    ],
    badges: ['High Output']
  },
  {
    modelNo: 'BLA-885',
    cavity: '8P/8C',
    volume: '1000 mL',
    variants: [
      { type: 'Single Station', production: 27, unit: 'K' }
    ]
  },
  {
    modelNo: 'BLA30',
    cavity: '2P/2C',
    volume: '3 L',
    variants: [
      { type: 'Single Station', production: 6, unit: 'K' }
    ],
    badges: ['Large Capacity']
  }
];

export const capWeldingData: CapWeldingModel[] = [
  {
    modelNo: 'BCW10H',
    capacityRange: '10, 30, 100, 500 mL',
    modes: [
      { mode: 'Manual', speed: 30, unit: 'BPM' },
      { mode: 'Semi', speed: 35, unit: 'BPM' },
      { mode: 'Automatic', speed: 40, unit: 'BPM' }
    ]
  },
  {
    modelNo: 'BCW12H',
    capacityRange: '10, 30, 100, 500 mL',
    modes: [
      { mode: 'Manual', speed: 36, unit: 'BPM' },
      { mode: 'Semi', speed: 40, unit: 'BPM' },
      { mode: 'Automatic', speed: 50, unit: 'BPM' }
    ],
    badges: ['Cost Efficient']
  },
  {
    modelNo: 'BCW14H',
    capacityRange: '100, 500 mL',
    modes: [
      { mode: 'Semi', speed: 50, unit: 'BPM' },
      { mode: 'Automatic', speed: 60, unit: 'BPM' }
    ],
    badges: ['Fastest Model']
  }
];
