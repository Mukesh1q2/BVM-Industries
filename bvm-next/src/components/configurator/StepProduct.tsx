"use client";
import { useConfigurator } from './ConfiguratorContext';
import type { ProductType } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Droplet, View, Pill, FlaskConical, Wind } from 'lucide-react';

const options: { id: ProductType; label: string; icon: any; desc: string }[] = [
    { id: 'iv_fluids', label: 'IV Fluids (LVP)', icon: Droplet, desc: 'Large Volume Parenterals like Saline, Dextrose.' },
    { id: 'ophthalmic', label: 'Eye/Ear Drops (SVP)', icon: View, desc: 'Small Volume Parenterals, highly sensitive.' },
    { id: 'respiratory', label: 'Respiratory (Respules)', icon: Wind, desc: 'Inhalation solutions requiring unit-dose accuracy.' },
    { id: 'ampoule', label: 'Ampoules', icon: FlaskConical, desc: 'Glass or plastic injectable ampoules.' },
    { id: 'oral', label: 'Oral Liquids', icon: Pill, desc: 'Syrups, suspensions, and other oral solutions.' },
];

const StepProduct = () => {
    const { state, setProductType } = useConfigurator();

    return (
        <ConfiguratorStep
            stepNumber={1}
            title="What product are you manufacturing?"
            description="Select the primary pharmaceutical application for your required production line."
            isValid={state.productType !== null}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {options.map((option) => {
                    const isSelected = state.productType === option.id;
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.id}
                            onClick={() => setProductType(option.id)}
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

export default StepProduct;
