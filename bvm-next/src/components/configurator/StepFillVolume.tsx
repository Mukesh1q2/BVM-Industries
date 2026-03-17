import React from 'react';
import { useConfigurator } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Droplet } from 'lucide-react';

const bfsLvpVolumes = ['100 ml', '250 ml', '300 ml', '500 ml', '1 L', '3 L', '100–500 ml (custom range)'];
const ffsSvpVolumes = ['5 ml', '10 ml', '20 ml', '30 ml', '50 ml', '5–30 ml (range)'];

const StepFillVolume = () => {
    const { state, setFillVolume, nextStep } = useConfigurator();

    // Determine which list to show based on MachineType (fallback to generic if neither selected yet, though usually prevented by Step 1)
    const options = state.machineType === 'FFS' || state.productCategory === 'SVP' 
        ? ffsSvpVolumes 
        : bfsLvpVolumes;

    return (
        <ConfiguratorStep
            stepNumber={3}
            title="Fill Volume Options"
            description="Select the fill capacity required for your product."
            isValid={state.fillVolume !== null}
        >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {options.map((vol) => (
                    <button
                        key={vol}
                        onClick={() => { setFillVolume(vol); setTimeout(nextStep, 250); }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col justify-center items-center gap-3 ${state.fillVolume === vol
                            ? 'bg-bvm-blue/10 border-bvm-blue shadow-[0_0_20px_rgba(47,143,255,0.15)] scale-[1.02] text-white'
                            : 'bg-white/5 border-white/10 hover:border-bvm-blue/50 hover:bg-white/10 text-bvm-text-muted hover:text-white'
                            }`}
                    >
                        <div className={`p-2 rounded-full ${state.fillVolume === vol ? 'bg-bvm-blue text-white' : 'bg-white/5'}`}>
                            <Droplet className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-center leading-tight">{vol}</span>
                    </button>
                ))}
            </div>
        </ConfiguratorStep>
    );
};

export default StepFillVolume;
