import React from 'react';
import { useConfigurator, DeflashingType } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Scissors } from 'lucide-react';

const options: { id: DeflashingType; label: string; desc: string }[] = [
    { id: 'Automatic', label: 'Automatic Deflashing', desc: 'Integrated inline scrap removal system for high-efficiency production.' },
    { id: 'Manual', label: 'Manual Deflashing', desc: 'Standard configuration requiring operator intervention for final trimming.' },
];

const StepDeflashing = () => {
    const { state, setDeflashing, nextStep } = useConfigurator();

    return (
        <ConfiguratorStep
            stepNumber={5}
            title="Deflashing System"
            description="Select your preferred method for scrap removal and finishing."
            isValid={state.deflashing !== null}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => { setDeflashing(opt.id); setTimeout(nextStep, 250); }}
                        className={`relative overflow-hidden group p-6 rounded-2xl border-2 text-left transition-all duration-300 flex items-start gap-4 ${state.deflashing === opt.id
                            ? 'bg-bvm-blue/10 border-bvm-blue shadow-[0_0_30px_rgba(47,143,255,0.2)] scale-[1.02]'
                            : 'bg-white/5 border-white/10 hover:border-bvm-blue/50 hover:bg-white/10'
                            }`}
                    >
                        <div className={`p-4 rounded-xl shrink-0 transition-colors ${state.deflashing === opt.id ? 'bg-bvm-blue text-white' : 'bg-white/5 text-bvm-blue'}`}>
                            <Scissors className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{opt.label}</h3>
                            <p className="text-bvm-text-muted text-sm leading-relaxed">{opt.desc}</p>
                        </div>
                    </button>
                ))}
            </div>
        </ConfiguratorStep>
    );
};

export default StepDeflashing;
