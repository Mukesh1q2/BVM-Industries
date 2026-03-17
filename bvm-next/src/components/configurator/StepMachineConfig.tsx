import React from 'react';
import { useConfigurator, StationType } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Settings2, KeyRound } from 'lucide-react';

const options: { id: StationType; label: string; desc: string }[] = [
    { id: 'Single Station', label: 'Single Station', desc: 'Compact footprint, ideal for lower volumes or specialized batches.' },
    { id: 'Double Station', label: 'Double Station', desc: 'Maximizes output with dual simultaneous forming/filling operations.' },
];

const StepMachineConfig = () => {
    const { state, setStationType, nextStep } = useConfigurator();

    return (
        <ConfiguratorStep
            stepNumber={6}
            title="Machine Configuration"
            description="Choose the station architecture based on your throughput requirements."
            isValid={state.stationType !== null}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => { setStationType(opt.id); setTimeout(nextStep, 250); }}
                        className={`relative overflow-hidden group p-6 rounded-2xl border-2 text-left transition-all duration-300 flex items-start gap-4 ${state.stationType === opt.id
                            ? 'bg-bvm-blue/10 border-bvm-blue shadow-[0_0_30px_rgba(47,143,255,0.2)] scale-[1.02]'
                            : 'bg-white/5 border-white/10 hover:border-bvm-blue/50 hover:bg-white/10'
                            }`}
                    >
                        <div className={`p-4 rounded-xl shrink-0 transition-colors ${state.stationType === opt.id ? 'bg-bvm-blue text-white' : 'bg-white/5 text-bvm-blue'}`}>
                            {opt.id === 'Single Station' ? <KeyRound className="w-6 h-6" /> : <Settings2 className="w-6 h-6" />}
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

export default StepMachineConfig;
