import React from 'react';
import { useConfigurator } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Gauge } from 'lucide-react';

const bfsCapacities = [
    '< 25,000 units/hour', '> 25,000 units/hour',
    '< 35,000 units/hour', '> 35,000 units/hour',
    '< 40,000 units/hour', '> 40,000 units/hour',
    '< 50,000 units/hour', '> 50,000 units/hour'
];

const ffsCapacities = [
    'Below 150,000 units/hour',
    'Above 150,000 units/hour'
];

const StepCapacity = () => {
    const { state, setCapacity, nextStep } = useConfigurator();

    const options = state.machineType === 'FFS' || state.productCategory === 'SVP' 
        ? ffsCapacities 
        : bfsCapacities;

    return (
        <ConfiguratorStep
            stepNumber={7}
            title="Production Capacity"
            description="What is your required hourly output threshold?"
            isValid={state.capacity !== null}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {options.map((cap) => (
                    <button
                        key={cap}
                        onClick={() => { setCapacity(cap); setTimeout(nextStep, 250); }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col justify-center items-center gap-3 ${state.capacity === cap
                            ? 'bg-bvm-blue/10 border-bvm-blue shadow-[0_0_20px_rgba(47,143,255,0.15)] scale-[1.02] text-white'
                            : 'bg-white/5 border-white/10 hover:border-bvm-blue/50 hover:bg-white/10 text-bvm-text-muted hover:text-white'
                            }`}
                    >
                        <div className={`p-2 rounded-full ${state.capacity === cap ? 'bg-bvm-blue text-white' : 'bg-white/5'}`}>
                            <Gauge className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-center leading-tight">{cap}</span>
                    </button>
                ))}
            </div>
        </ConfiguratorStep>
    );
};

export default StepCapacity;
