import { useConfigurator } from './ConfiguratorContext';
import type { SpeedRequirement } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Timer, Gauge, Zap } from 'lucide-react';

const options: { id: SpeedRequirement; label: string; icon: any; desc: string }[] = [
    {
        id: 'low',
        label: 'Standard (< 5,000 P/H)',
        icon: Timer,
        desc: 'Ideal for R&D, clinical trials, or boutique batch sizes.'
    },
    {
        id: 'medium',
        label: 'High-Speed (5k - 15k P/H)',
        icon: Gauge,
        desc: 'Optimal for mid-scale commercial production and contract manufacturing.'
    },
    {
        id: 'high',
        label: 'Ultra-High (> 15k P/H)',
        icon: Zap,
        desc: 'Designed for massive scale, continuous operational manufacturing.'
    }
];

const StepSpeed = () => {
    const { state, setSpeed } = useConfigurator();

    return (
        <ConfiguratorStep
            stepNumber={3}
            title="What is your required throughput?"
            description="Estimate the required production speed in Parts Per Hour (P/H)."
            isValid={state.speed !== null}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {options.map((option) => {
                    const isSelected = state.speed === option.id;
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.id}
                            onClick={() => setSpeed(option.id)}
                            className={`relative text-left p-6 rounded-2xl border transition-all duration-300 ${isSelected
                                ? 'bg-bvm-blue/10 border-bvm-blue ring-2 ring-bvm-blue/50 transform -translate-y-1 shadow-lg shadow-bvm-blue/20'
                                : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10 text-white/70 hover:text-white'
                                }`}
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${isSelected ? 'bg-bvm-blue text-white' : 'bg-white/10 text-white/50'
                                    }`}
                            >
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${isSelected ? 'text-white' : ''}`}>
                                {option.label}
                            </h3>
                            <p className={`text-sm leading-relaxed ${isSelected ? 'text-white/90' : 'text-white/60'}`}>
                                {option.desc}
                            </p>

                            {/* Selected indicator */}
                            <div
                                className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 transition-colors ${isSelected ? 'border-bvm-blue bg-bvm-blue' : 'border-white/20'
                                    }`}
                            />
                        </button>
                    );
                })}
            </div>
        </ConfiguratorStep>
    );
};

export default StepSpeed;
