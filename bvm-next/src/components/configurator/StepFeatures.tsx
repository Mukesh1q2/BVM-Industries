import React from 'react';
import { useConfigurator } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Check, ShieldCheck, Factory, Computer, Wind, ArrowDownToLine, Snowflake, Move } from 'lucide-react';

const addons = [
    { id: 'Advanced SCADA Integration', label: 'Advanced SCADA Integration', icon: <Computer className="w-6 h-6" /> },
    { id: 'Online CIP/SIP System with Graphical Monitoring', label: 'Online CIP/SIP System', icon: <ShieldCheck className="w-6 h-6" /> },
    { id: 'Nitrogen Purging System', label: 'Nitrogen Purging System', icon: <Wind className="w-6 h-6" /> },
    { id: 'Integrated Vacuum Pump', label: 'Integrated Vacuum Pump', icon: <ArrowDownToLine className="w-6 h-6" /> },
    { id: 'Integrated Coolant Tank', label: 'Integrated Coolant Tank', icon: <Snowflake className="w-6 h-6" /> },
    { id: 'Servo-Controlled Filling Head Movement', label: 'Servo-Controlled Filling Head', icon: <Move className="w-6 h-6" /> },
    { id: 'HEPA-Filtered Air System for Filling Zone', label: 'HEPA-Filtered Air System', icon: <Factory className="w-6 h-6" /> },
];

const StepFeatures = () => {
    const { state, toggleAddon } = useConfigurator();

    return (
        <ConfiguratorStep
            stepNumber={8}
            title="Optional Features"
            description="Select any specialized integrations or enhancements for your production line. These can significantly improve automation, quality control, and compliance."
            isValid={true} 
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addons.map((addon) => {
                    const isSelected = state.addons.includes(addon.id);
                    return (
                        <button
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-300 ${isSelected
                                ? 'bg-bvm-blue/10 border-bvm-blue shadow-[0_0_20px_rgba(47,143,255,0.15)] scale-[1.02]'
                                : 'bg-white/5 border-white/10 hover:border-bvm-blue/50 hover:bg-white/10'
                                }`}
                        >
                            <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-colors ${isSelected
                                ? 'bg-bvm-blue border-bvm-blue text-white'
                                : 'border-white/20 bg-transparent'
                                }`}
                            >
                                {isSelected && <Check className="w-4 h-4" />}
                            </div>
                            <div className={`p-2 rounded-lg shrink-0 transition-colors ${isSelected ? 'bg-bvm-blue text-white' : 'bg-white/5 text-bvm-text-muted'}`}>
                                {addon.icon}
                            </div>
                            <div className="text-left">
                                <span className={`font-semibold block ${isSelected ? 'text-white' : 'text-bvm-text-muted'}`}>
                                    {addon.label}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </ConfiguratorStep>
    );
};

export default StepFeatures;
