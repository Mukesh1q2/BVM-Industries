import React from 'react';
import { useConfigurator } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Layers, Droplet } from 'lucide-react';

const StepMachineType = () => {
    const { state, setMachineType, nextStep } = useConfigurator();

    return (
        <ConfiguratorStep
            stepNumber={1}
            title="Select Processing Technology"
            description="Choose between our Form-Fill-Seal or Blow-Fill-Seal platforms based on your packaging needs."
            isValid={state.machineType !== null}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => { setMachineType('BFS'); setTimeout(nextStep, 250); }}
                    className={`relative overflow-hidden group p-6 rounded-2xl border-2 text-left transition-all duration-300 ${state.machineType === 'BFS'
                        ? 'bg-bvm-blue/10 border-bvm-blue shadow-[0_0_30px_rgba(47,143,255,0.2)] scale-[1.02]'
                        : 'bg-white/5 border-white/10 hover:border-bvm-blue/50 hover:bg-white/10'
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-xl shrink-0 transition-colors ${state.machineType === 'BFS' ? 'bg-bvm-blue text-white' : 'bg-white/5 text-bvm-blue'}`}>
                            <Droplet className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">BFS Technology</h3>
                            <p className="text-bvm-text-muted text-sm leading-relaxed">
                                Blow-Fill-Seal. Best for Large Volume Parenterals (LVP), robust sterile containers, and specialized bottle shapes.
                            </p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => { setMachineType('FFS'); setTimeout(nextStep, 250); }}
                    className={`relative overflow-hidden group p-6 rounded-2xl border-2 text-left transition-all duration-300 ${state.machineType === 'FFS'
                        ? 'bg-bvm-blue/10 border-bvm-blue shadow-[0_0_30px_rgba(47,143,255,0.2)] scale-[1.02]'
                        : 'bg-white/5 border-white/10 hover:border-bvm-blue/50 hover:bg-white/10'
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-xl shrink-0 transition-colors ${state.machineType === 'FFS' ? 'bg-bvm-blue text-white' : 'bg-white/5 text-bvm-blue'}`}>
                            <Layers className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">FFS Technology</h3>
                            <p className="text-bvm-text-muted text-sm leading-relaxed">
                                Form-Fill-Seal. Best for Small Volume Parenterals (SVP), ampoules, eye drops, and unit-dose packaging.
                            </p>
                        </div>
                    </div>
                </button>
            </div>
        </ConfiguratorStep>
    );
};

export default StepMachineType;
