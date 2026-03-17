import React, { useState } from 'react';
import { useConfigurator } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Gauge, Pencil } from 'lucide-react';

const getBfsCapacities = (volume: string | null): string[] => {
    switch (volume) {
        case '100 ml': return ['< 50,000 units/hour', '> 50,000 units/hour'];
        case '250 ml':
        case '300 ml':
        case '100–500 ml (Range)': 
            return ['< 40,000 units/hour', '> 40,000 units/hour'];
        case '500 ml': return ['< 35,000 units/hour', '> 35,000 units/hour'];
        case '1 L': return ['< 25,000 units/hour', '> 25,000 units/hour'];
        case '3 L': return ['< 3,000 units/hour', '> 3,000 units/hour'];
        default: return ['< 40,000 units/hour', '> 40,000 units/hour']; // Fallback
    }
};

const ffsCapacities = [
    'Below 150,000 units/hour',
    'Above 150,000 units/hour'
];

const StepCapacity = () => {
    const { state, setCapacity, nextStep } = useConfigurator();
    const [isManual, setIsManual] = useState(false);
    const [manualValue, setManualValue] = useState('');

    const options = state.machineType === 'FFS' 
        ? ffsCapacities 
        : getBfsCapacities(state.fillVolume);

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualValue.trim()) {
            setCapacity(`${manualValue} units/hour (Manual)`);
            setTimeout(nextStep, 250);
        }
    };

    return (
        <ConfiguratorStep
            stepNumber={7}
            title="Production Capacity"
            description="What is your required hourly output threshold?"
            isValid={state.capacity !== null}
        >
            {state.machineType === 'FFS' && (
                <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl max-w-2xl mx-auto">
                    <p className="text-yellow-200/80 text-sm font-medium flex items-start gap-2">
                        <span className="text-yellow-500">⚠️</span>
                        <span>
                            <strong className="text-yellow-400">Production Note:</strong> Maximum output reaches up to <strong>400,000 units/hour</strong> for volumes ≤ 10 ml, and up to <strong>300,000 units/hour</strong> for volumes ≤ 30 ml.
                        </span>
                    </p>
                </div>
            )}

            {!isManual ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

                    <button
                        onClick={() => setIsManual(true)}
                        className="p-4 rounded-xl border-2 border-dashed border-white/20 bg-white/5 hover:border-bvm-blue/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-center items-center gap-3 text-bvm-text-muted hover:text-white"
                    >
                        <div className="p-2 rounded-full bg-white/5">
                            <Pencil className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-center leading-tight">Enter Manually</span>
                    </button>
                </div>
            ) : (
                <form onSubmit={handleManualSubmit} className="max-w-md mx-auto relative">
                    <div className="relative">
                        <input
                            type="number"
                            min="1"
                            placeholder="e.g. 100000"
                            value={manualValue}
                            onChange={(e) => setManualValue(e.target.value)}
                            className="w-full bg-bvm-navy border-2 border-white/10 rounded-xl px-6 py-4 text-white font-medium text-lg focus:outline-none focus:border-bvm-blue transition-colors placeholder:text-white/20 pr-32"
                            autoFocus
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-bvm-text-muted font-medium pointer-events-none">
                            units/hour
                        </div>
                    </div>
                    
                    <div className="flex gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => setIsManual(false)}
                            className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!manualValue.trim()}
                            className="flex-1 py-3 px-4 rounded-xl bg-bvm-blue hover:bg-blue-600 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(47,143,255,0.2)]"
                        >
                            Confirm Output
                        </button>
                    </div>
                </form>
            )}
        </ConfiguratorStep>
    );
};

export default StepCapacity;
