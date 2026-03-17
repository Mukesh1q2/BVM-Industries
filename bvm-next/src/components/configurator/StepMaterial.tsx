import React from 'react';
import { useConfigurator, Material } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Box } from 'lucide-react';

const allMaterials: { id: Material; label: string; desc: string; validFor: string[] }[] = [
    { id: 'PP', label: 'PP', desc: 'Polypropylene - High clarity and rigidity', validFor: ['BFS'] },
    { id: 'LDPE', label: 'LDPE', desc: 'Low-Density Polyethylene - Excellent flexibility', validFor: ['BFS', 'FFS'] },
    { id: 'Customized LDPE', label: 'Customized LDPE', desc: 'Tailored blend for specific barrier properties', validFor: ['FFS'] },
    { id: 'PE', label: 'PE', desc: 'Polyethylene - Standard industrial choice', validFor: ['FFS'] },
];

const StepMaterial = () => {
    const { state, setMaterial, nextStep } = useConfigurator();

    const options = allMaterials.filter(mat => 
        state.machineType ? mat.validFor.includes(state.machineType) : true
    );

    return (
        <ConfiguratorStep
            stepNumber={4}
            title="Container Material"
            description="Select the primary resin type for your packaging."
            isValid={state.material !== null}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map((mat) => (
                    <button
                        key={mat.id}
                        onClick={() => { setMaterial(mat.id); setTimeout(nextStep, 250); }}
                        className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${state.material === mat.id
                            ? 'bg-bvm-blue/10 border-bvm-blue shadow-[0_0_20px_rgba(47,143,255,0.15)] scale-[1.02]'
                            : 'bg-white/5 border-white/10 hover:border-bvm-blue/50 hover:bg-white/10'
                            }`}
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className={`p-2 rounded-lg ${state.material === mat.id ? 'bg-bvm-blue text-white' : 'bg-white/5 text-bvm-text-muted'}`}>
                                <Box className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{mat.label}</h3>
                        </div>
                        <p className="text-bvm-text-muted text-sm pl-12">{mat.desc}</p>
                    </button>
                ))}
            </div>
        </ConfiguratorStep>
    );
};

export default StepMaterial;
