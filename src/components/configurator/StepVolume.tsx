import { useConfigurator } from './ConfiguratorContext';
import type { VolumeRange } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { PackageSearch, PackageOpen, PackageCheck } from 'lucide-react';

const options: { id: VolumeRange; label: string; icon: any; desc: string; example: string }[] = [
    {
        id: 'small',
        label: 'Small Volume (<50ml)',
        icon: PackageSearch,
        desc: 'Precision filling for single-dose or small multi-dose applications.',
        example: 'E.g., Eye drops (5ml, 10ml), Ampoules (1ml, 2ml, 5ml).'
    },
    {
        id: 'medium',
        label: 'Medium Volume (50-500ml)',
        icon: PackageOpen,
        desc: 'Standard commercial sizes for intravenous and oral liquids.',
        example: 'E.g., IV Bottles (100ml, 250ml, 500ml).'
    },
    {
        id: 'large',
        label: 'Large Volume (>500ml)',
        icon: PackageCheck,
        desc: 'High-capacity containers requiring robust structural integrity.',
        example: 'E.g., Large IV bags, Irrigation solutions (1000ml+).'
    }
];

const StepVolume = () => {
    const { state, setVolumeRange } = useConfigurator();

    return (
        <ConfiguratorStep
            stepNumber={2}
            title="What is your target fill volume?"
            description="Machine engineering heavily depends on the required container volume. Select your primary range."
            isValid={state.volumeRange !== null}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {options.map((option) => {
                    const isSelected = state.volumeRange === option.id;
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.id}
                            onClick={() => setVolumeRange(option.id)}
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
                            <p className={`text-sm mb-4 leading-relaxed ${isSelected ? 'text-white/90' : 'text-white/60'}`}>
                                {option.desc}
                            </p>

                            <div className={`text-xs py-2 px-3 rounded-lg ${isSelected ? 'bg-bvm-blue/20 text-bvm-blue-light font-medium' : 'bg-white/5 text-white/40'}`}>
                                {option.example}
                            </div>

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

export default StepVolume;
