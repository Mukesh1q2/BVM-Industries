import { MachineData } from '@/types/machine';
import { svpData, lvpData, capWeldingData } from './modelsData';

export const machines: MachineData[] = [
    {
        id: 'ffs',
        slug: 'ffs',
        hero: {
            subtitle: 'REVOLUTIONIZE YOUR PACKAGING OPERATIONS',
            title: 'Form Fill Seal (F.F.S) System',
            highlight: 'System',
            description: 'A fully indigenous, cost-effective Form-Fill-Seal system. Engineered for continuous aseptic packaging of pharmaceutical liquids, ensuring product sterility and operator safety through advanced isolation technology.',
            image: '/new_assets/optimized/ffs1.webp',
            brochureText: 'Download FFS Technical Brochure'
        },
        features: [
            {
                title: 'Key Features',
                icon: 'Zap',
                items: [
                    'Continuous automated packaging process',
                    'Accurate liquid filling systems',
                    'Cleanroom-ready design',
                    'Advanced PLC-based control system',
                    'High production efficiency',
                    'Durable and low maintenance operation'
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
                    description: '<strong class="text-white block mb-1">SVP / Eye/Ear drops:</strong> 0.2 mL to 50 mL'
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
        specTables: [],
        svpData: svpData,
        compatibleApplications: [
            'Pharmaceutical liquid packaging',
            'Injectable drug solutions',
            'Ophthalmic products',
            'Respiratory medicines',
            'Oral liquid formulations'
        ]
    },
    {
        id: 'bfs',
        slug: 'bfs',
        hero: {
            subtitle: 'ADVANCED B.F.S SYSTEMS',
            title: 'Blow Fill Seal (B.F.S) Technology',
            highlight: 'Technology',
            description: 'Blow-Fill-Seal technology provides a fully integrated aseptic packaging process in which plastic containers are formed, filled, and sealed in a continuous sterile cycle. This advanced process minimizes human intervention and significantly reduces contamination risks. BFS machines are widely used for the production of unit-dose sterile liquids and pharmaceutical injectables.',
            image: '/new_assets/optimized/bfs2.webp',
            brochureText: 'Download BFS Technology Brochure'
        },
        features: [
            {
                title: 'Key Features',
                icon: 'CheckCircle',
                items: [
                    'Advanced Control Architecture: Equipped with a comprehensive Mitsubishi Automation Suite for seamless cycle synchronization.',
                    'High-Speed Connectivity: Full Ethernet-based communication for real-time SCADA/MES integration.',
                    'Precision Pneumatic Systems: Utilizing industry-leading Festo & SMC pneumatic components.',
                    'Aseptic Motion Control: High-torque Servo Cylinders and THK Linear Track Bearings.',
                    'Superior Container Versatility: Highly adaptable Multiple Container Design for various LVP bottle shapes.',
                    'Industry-Leading Efficiency: Fastest mold changeover time to maximize throughput.',
                    'Sustainable & Clean Operation: Elimination of traditional lubricants ensures a completely contamination-free zone.'
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
                    title: 'LVP / IV Fluids Formats',
                    icon: 'Activity',
                    image: '/new_assets/optimized/multi-dose-infusion-irrigation-bottles.webp',
                    description: 'Large Volume Parenterals (50 mL to 3,000 mL) optimized for intravenous fluids and irrigation solutions.'
                }
            ]
        },
        constructionStandards: {
            title: 'Construction Standards for B.F.S. Machine',
            description: 'Engineered to meet the most stringent global regulatory requirements (USFDA, EU-GMP, PICS). We prioritize a "Sterile-First" construction philosophy.<br/><br/><strong class="text-white block mt-3">1. Material Integrity & Surface Finish:</strong> All contact parts are SS 316L (Ra < 0.4 µm). External framework is high-grade SS 304.<br/><strong class="text-white block mt-3">2. Advanced Sterile Architecture:</strong> Critical filling zone is protected by an integrated Class A LAF system with oil-free pneumatics.<br/><strong class="text-white block mt-3">3. CIP/SIP Optimized Design:</strong> Fully automated zero dead-leg architecture with sanitary fittings.<br/><strong class="text-white block mt-3">4. Smart Control Systems:</strong> 21 CFR Part 11 Compliance with real-time HMI monitoring.<br/><strong class="text-white block mt-3">5. Ergonomics & Maintenance:</strong> Cleanroom compatible layout with integrated stainless steel utility pendants.'
        },
        specTables: [],
        lvpData: lvpData,
        compatibleApplications: [
            'Sterile injectable solutions',
            'Respiratory unit dose solutions',
            'Eye and ear drops',
            'Sterile water for injection',
            'Pharmaceutical liquid formulations'
        ]
    },
    {
        id: 'cap-sealing',
        slug: 'euro-cap-sealing',
        hero: {
            subtitle: 'ELEVATING INDUSTRY STANDARDS',
            title: 'Euro Cap Sealing & Welding System',
            highlight: 'System',
            description: 'A high-precision, fully automated system designed for the hermetic sealing and welding of Euro Caps onto L.V.P. (I.V.) bottles. Engineered to integrate seamlessly with our B.F.S. lines, this machine ensures that the final primary packaging remains tamper-proof and sterile throughout its lifecycle.',
            image: '/new_assets/optimized/cap-sealing-machine.webp',
            brochureText: 'Download Sealing Specs'
        },
        features: [
            {
                title: 'Precision Welding Technology',
                icon: 'Zap',
                items: [
                    'Thermal Fusion Excellence: Creates a molecular bond between the bottle neck and the Euro Cap.',
                    'Servo-Controlled Precision: High-precision servo motors guarantee consistent pressure and contact time.',
                    'Non-Contact Heating: Heating process is carefully managed to avoid any physical contact with the sterile liquid path.'
                ]
            },
            {
                title: 'Technical Features & Excellence',
                icon: 'Shield',
                items: [
                    'World-Class Automation: Powered by a complete Mitsubishi PLC and HMI system.',
                    'Sanitary Architecture: Constructed from SS 316L and SS 304 with a crevice-free design (Grade C/D compatible).',
                    'Aseptic Pneumatics: High-performance Festo & SMC pneumatic systems.',
                    'Frictionless Motion: THK Linear Guides ensure a smooth, vibration-free container transport.'
                ]
            },
            {
                title: 'Operational Versatility',
                icon: 'Settings',
                items: [
                    'Multi-Format Compatibility: Easily adaptable for capacities from 100ml to 1000ml.',
                    'Smart Feedback Loop: Real-time sensors detect and reject any bottles with missing caps.',
                    'Ethernet Integrated: Full data logging supporting 21 CFR Part 11 compliance.'
                ]
            }
        ],
        constructionStandards: {
            title: 'Technical Highlights',
            description: '<span class="text-white font-semibold">Robust stainless-steel construction</span> with vibration-free performance. Features adjustable height, conveyor synchronization, and compliance with industry safety and hygiene standards. Customization available as per container specifications.'
        },
        specTables: [],
        capWeldingData: capWeldingData,
        compatibleApplications: [
            'IV Fluid Bottles (LVP)',
            'Ophthalmic Drops',
            'Oral Liquids'
        ]
    }
];
