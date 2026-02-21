export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  specifications: Record<string, string>;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 'automatic-blow-moulding-machine',
    name: 'Automatic Blow Moulding Machine',
    shortDescription: 'Fully automatic system for plastic bottle/container production',
    fullDescription: 'Our Automatic Blow Moulding Machine delivers high-output industrial operation with precision control systems. Designed for continuous production environments, it supports multiple bottle sizes through quick mould change mechanisms.',
    features: [
      'Fully automatic operation with PLC control',
      'High-output production capacity',
      'Multiple bottle size support via mould changes',
      'Energy-efficient drive systems',
      'User-friendly touchscreen interface',
      'Automatic defect detection system'
    ],
    specifications: {
      'Production Capacity': '2,000 - 6,000 bottles/hour',
      'Bottle Size Range': '50ml - 5L',
      'Power Requirement': '15-25 kW',
      'Air Pressure': '6-8 bar',
      'Machine Weight': '3,500 - 8,000 kg',
      'Dimensions': 'L4.5m x W2.2m x H2.8m'
    },
    image: '/products/blow-moulding-machine.webp',
    category: 'Blow Moulding'
  },
  {
    id: 'pet-bottle-mould-100ml',
    name: '100 ml PET Bottle Mould',
    shortDescription: 'Precision mould for 100 ml containers with custom options',
    fullDescription: 'Precision-engineered PET bottle mould designed for 100 ml containers. Features consistent wall thickness and crystal-clear clarity. Custom neck finishes and shape configurations available to meet specific packaging requirements.',
    features: [
      'Precision cavity machining for consistent quality',
      'Consistent wall thickness distribution',
      'Crystal-clear bottle clarity',
      'Custom neck finish options',
      'Multiple shape configurations',
      'Hardened steel construction'
    ],
    specifications: {
      'Cavity Count': '2, 4, 6, or 8 cavities',
      'Bottle Volume': '100 ml',
      'Material': 'S136 Stainless Steel',
      'Hardness': 'HRC 48-52',
      'Mould Life': '5+ million cycles',
      'Neck Finish': 'Customizable'
    },
    image: '/products/pet-mould-100ml.webp',
    category: 'PET Moulds'
  },
  {
    id: 'bfs-mould-machine-50ml',
    name: '50 ml Blow Fill Seal Mould Machine',
    shortDescription: 'High-precision 50-Cavity Ophthalmic Molds (e.g., 5 vials x 10 parisons)',
    fullDescription: 'Specialized Blow Fill Seal mould machine designed for precision 50 ml format production. Engineered with a 12mm center distance and specific SVP (Small Volume Parenteral) capabilities. Perfectly suitable for Class 100 aseptic packaging environments.',
    features: [
      'High-precision 50-Cavity Ophthalmic geometry',
      'Configured for 5 vials x 10 parisons',
      'Class 100 aseptic compatible',
      'cGMP compliant zero human intervention design',
      'Integrated quality monitoring',
      'Suitable for preservative-free SVP applications'
    ],
    specifications: {
      'Container Volume': '0.5 mL - 100 mL SVP Range',
      'Output Capacity': '3,000 - 5,000 units/hour',
      'Cavity Configuration': 'Up to 50 Cavities',
      'Center Distance': '12mm',
      'Sterility Assurance': 'Class 100 environment',
      'Validation Support': 'DQ/IQ/OQ/PQ documentation'
    },
    image: '/products/bfs-mould-dark.png',
    category: 'BFS Systems'
  },
  {
    id: 'ss-filter-housing',
    name: 'Stainless Steel Water Filter Housing',
    shortDescription: 'SS housing for liquid filtration with cartridge compatibility',
    fullDescription: 'High-quality Stainless Steel filter housing designed for liquid filtration applications. Features corrosion-resistant construction and compatibility with industry-standard cartridges for pharmaceutical and industrial use.',
    features: [
      'SS 304/316 construction options',
      'Corrosion resistant finish',
      'Standard cartridge compatibility',
      'Easy cartridge replacement',
      'Pressure rated design',
      'Sanitary connections'
    ],
    specifications: {
      'Material': 'SS 304 / SS 316L',
      'Inlet/Outlet': '1" - 4" Tri-clamp',
      'Max Pressure': '10 bar',
      'Max Temperature': '120°C',
      'Cartridge Length': '10", 20", 30", 40"',
      'Surface Finish': 'Ra < 0.8 μm'
    },
    image: '/products/ss-filter-housing.webp',
    category: 'Filtration'
  },
  {
    id: 'hydraulic-cylinder-single',
    name: 'Single Acting Hydraulic Cylinders',
    shortDescription: 'Industrial hydraulic actuation with custom options',
    fullDescription: 'Robust single-acting hydraulic cylinders designed for industrial applications. Features compact integration design with custom stroke lengths and mounting configurations to suit specific machinery requirements.',
    features: [
      'Single-acting spring return design',
      'Compact integration profile',
      'Custom stroke lengths available',
      'Multiple mounting options',
      'High-pressure rating',
      'Sealed for harsh environments'
    ],
    specifications: {
      'Bore Diameter': '25mm - 200mm',
      'Pressure Rating': 'Up to 400 bar',
      'Stroke Length': '50mm - 2000mm',
      'Mounting': 'Foot, Flange, Clevis, Trunnion',
      'Material': 'Alloy Steel',
      'Rod Surface': 'Hard Chrome Plated'
    },
    image: '/products/hydraulic-cylinder.webp',
    category: 'Hydraulics'
  },
  {
    id: 'extrusion-blow-moulding-machine',
    name: 'Automatic Extrusion Blow Moulding Machine',
    shortDescription: 'Extrusion-based bottle production for medium/large containers',
    fullDescription: 'Advanced extrusion blow moulding machine for producing medium to large containers. Features multi-cavity output capability and precise parison control for consistent wall thickness in high-volume production.',
    features: [
      'Extrusion-based parison forming',
      'Medium to large container support',
      'Multi-cavity output capability',
      'Precise parison thickness control',
      'Automatic material feeding',
      'Energy-efficient heating system'
    ],
    specifications: {
      'Container Size': '1L - 50L',
      'Production Rate': '500 - 2,000 units/hour',
      'Extruder Capacity': '50 - 150 kg/hr',
      'Power Consumption': '25-45 kW',
      'Die Head': 'Single/Double/Multi-head',
      'Control System': 'PLC with HMI'
    },
    image: '/products/extrusion-blow-moulding.webp',
    category: 'Blow Moulding'
  },
  {
    id: 'hydraulic-manifold-block',
    name: 'Hydraulic Manifold Block',
    shortDescription: 'Hydraulic flow distribution with valve integration',
    fullDescription: 'Precision-machined hydraulic manifold block for efficient flow distribution. Features compact valve integration with custom port configurations to optimize hydraulic circuit design.',
    features: [
      'Precision machined flow paths',
      'Compact valve integration',
      'Custom port configurations',
      'High-pressure rated',
      'Anodized or plated finish',
      'Reduced plumbing complexity'
    ],
    specifications: {
      'Material': 'Aluminum / Steel',
      'Max Pressure': '350 bar',
      'Port Sizes': 'G1/8" to G1"',
      'Surface Treatment': 'Hard Anodized / Zinc',
      'Tolerance': '±0.02mm',
      'Testing': 'Pressure tested 1.5x rating'
    },
    image: '/products/hydraulic-manifold.webp',
    category: 'Hydraulics'
  },
  {
    id: 'ampoule-filling-machine',
    name: 'Ampoule Filling Machine',
    shortDescription: 'Precision sterile filling for pharmaceutical environments',
    fullDescription: 'High-precision ampoule filling machine designed for sterile pharmaceutical production. Supports multiple ampoule sizes with accurate dosing and is engineered for cleanroom environments.',
    features: [
      'Precision dosing accuracy',
      'Multi-size ampoule support',
      'Cleanroom compatible design',
      'Automatic filling and sealing',
      'Integrated quality control',
      'cGMP compliant construction'
    ],
    specifications: {
      'Ampoule Sizes': '1ml - 20ml',
      'Filling Accuracy': '±0.5%',
      'Production Speed': '60 - 300 ampoules/min',
      'Filling Range': '0.5ml - 20ml',
      'Sealing Method': 'Gas-oxygen flame',
      'Environment': 'Class 100 compatible'
    },
    image: '/products/ampoule-filling.webp',
    category: 'Pharma Equipment'
  },
  {
    id: 'respules-mould-250ml',
    name: '250 ml Bottle Cavity Respules Mould',
    shortDescription: 'Multi-cavity mould for high productivity output',
    fullDescription: 'Specialized multi-cavity mould for 250 ml respules bottle production. Features high productivity output with precision geometry machining for consistent quality across all cavities.',
    features: [
      'Multi-cavity configuration',
      'High productivity output',
      'Precision geometry machining',
      'Balanced runner design',
      'Quick cooling channels',
      'Long service life'
    ],
    specifications: {
      'Cavity Count': '4, 6, or 8 cavities',
      'Bottle Volume': '250 ml',
      'Material': 'P20 / H13 Steel',
      'Hardness': 'HRC 45-50',
      'Cycle Time': '15-25 seconds',
      'Hot Runner': 'Optional'
    },
    image: '/products/respules-mould.webp',
    category: 'PET Moulds'
  },
  {
    id: 'compression-block-homogenizer',
    name: 'Compression Block Homogenizer',
    shortDescription: 'High-pressure system component with precision machining',
    fullDescription: 'High-strength compression block designed for homogenizer systems. Features precision flow path machining and robust construction to withstand high-pressure operations in industrial applications.',
    features: [
      'High-pressure rated construction',
      'Precision flow path machining',
      'High-strength material',
      'Corrosion resistant coating',
      'Tight tolerance machining',
      'Pressure tested certification'
    ],
    specifications: {
      'Max Pressure': '700 bar',
      'Material': '17-4PH / 316SS',
      'Flow Path Tolerance': '±0.01mm',
      'Surface Finish': 'Ra 0.4 μm',
      'Coating': 'DLC / Chrome',
      'Testing': 'Hydrostatic tested'
    },
    image: '/products/compression-block.webp',
    category: 'Components'
  },
  {
    id: 'injection-mould-die',
    name: 'Injection Mould Die',
    shortDescription: 'Plastic component mould tooling with high accuracy',
    fullDescription: 'Precision injection mould die for plastic component production. Features high dimensional accuracy and is designed from custom drawings to meet exact product specifications.',
    features: [
      'High dimensional accuracy',
      'Custom design from drawings',
      'Precision cavity finishing',
      'Balanced cooling design',
      'Long production life',
      'Easy maintenance access'
    ],
    specifications: {
      'Mould Type': '2-plate / 3-plate / Hot runner',
      'Cavities': 'Single to 32 cavities',
      'Material': 'P20, H13, S136',
      'Tolerance': '±0.005mm',
      'Mould Life': '1-5 million shots',
      'Lead Time': '4-8 weeks'
    },
    image: '/products/injection-mould.webp',
    category: 'Moulds'
  },
  {
    id: 'hydraulic-power-pack-10hp',
    name: '10 HP Hydraulic Power Pack',
    shortDescription: 'Integrated hydraulic supply unit with stable pressure',
    fullDescription: 'Compact 10 HP hydraulic power pack providing integrated hydraulic supply. Features stable pressure delivery with configurable control features for various industrial machinery applications.',
    features: [
      'Integrated pump and motor',
      'Stable pressure delivery',
      'Configurable control options',
      'Thermal protection',
      'Oil filtration system',
      'Compact footprint'
    ],
    specifications: {
      'Motor Power': '10 HP (7.5 kW)',
      'Pump Type': 'Gear / Vane / Piston',
      'Flow Rate': '15 - 40 LPM',
      'Max Pressure': '210 bar',
      'Reservoir Capacity': '80 - 200 L',
      'Voltage': '415V, 3-phase'
    },
    image: '/products/hydraulic-power-pack.webp',
    category: 'Hydraulics'
  }
];

export const productCategories = [
  'All',
  'Blow Moulding',
  'BFS Systems',
  'PET Moulds',
  'Hydraulics',
  'Filtration',
  'Pharma Equipment',
  'Components',
  'Moulds'
];
