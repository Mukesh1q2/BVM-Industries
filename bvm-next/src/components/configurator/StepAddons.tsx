"use client";
import { useConfigurator } from './ConfiguratorContext';
import type { Addon } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { ShieldAlert, Cpu, Network, Wind } from 'lucide-react';

const options: { id: Addon; label: string; icon: any; desc: string }[] = [
    { id: '21_cfr', label: 'FDA 21 CFR Part 11', icon: ShieldAlert, desc: 'Compliance for electronic records and signatures.' },
    { id: 'cip_sip', label: 'CIP / SIP Integration', icon: Cpu, desc: 'Automated Cleaning and Sterilization In Place systems.' },
    { id: 'scada', label: 'Advanced SCADA', icon: Network, desc: 'Supervisory Control and Data Acquisition for factory plant integration.' },
    { id: 'nitrogen', label: 'Nitrogen Purging', icon: Wind, desc: 'Headspace gas flushing for oxygen-sensitive formulations.' },
];

const StepAddons = () => {
    const { state, toggleAddon } = useConfigurator();

    return (
        <ConfiguratorStep
            stepNumber={4}
            title="Select Optional Requirements"
            description="Choose any specific technological or compliance add-ons required for your production."
            isValid={true} // Optional step, so always valid
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option) => {
                    const isSelected = state.addons.includes(option.id);
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.id}
                            onClick={() => toggleAddon(option.id)}
                            className={`relative flex items-center p-5 rounded-2xl border transition-all duration-300 ${isSelected
                                ? 'bg-bvm-blue/10 border-bvm-blue ring-1 ring-bvm-blue/50 shadow-md shadow-bvm-blue/20'
                                : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10 text-white/70 hover:text-white'
                                }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-colors shrink-0 ${isSelected ? 'bg-bvm-blue text-white' : 'bg-white/10 text-white/50'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <h3 className={`font-bold ${isSelected ? 'text-white' : ''}`}>
                                    {option.label}
                                </h3>
                                <p className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-white/50'}`}>
                                    {option.desc}
                                </p>
                            </div>

                            {/* Checkbox indicator */}
                            <div
                                className={`ml-auto w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'border-bvm-blue bg-bvm-blue' : 'border-white/30'
                                    }`}
                            >
                                {isSelected && (
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </ConfiguratorStep>
    );
};

export default StepAddons;
