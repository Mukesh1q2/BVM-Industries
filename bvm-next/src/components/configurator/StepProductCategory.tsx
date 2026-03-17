import React from 'react';
import { useConfigurator, ProductCategory } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Pill, Activity, Eye, Sparkles, Leaf } from 'lucide-react';

const categories: { id: ProductCategory; label: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'LVP', label: 'LVP', desc: 'Large Volume Parenterals (IV Fluids)', icon: <Activity className="w-8 h-8" /> },
    { id: 'SVP', label: 'SVP', desc: 'Small Volume Parenterals (Injectables)', icon: <Pill className="w-8 h-8" /> },
    { id: 'Eye Drops', label: 'Eye Drops', desc: 'Ophthalmic Solutions', icon: <Eye className="w-8 h-8" /> },
    { id: 'Cosmetics', label: 'Cosmetics', desc: 'Creams, Lotions, and Serums', icon: <Sparkles className="w-8 h-8" /> },
    { id: 'Agro Products', label: 'Agro Products', desc: 'Agricultural Chemicals & Fertilizers', icon: <Leaf className="w-8 h-8" /> },
];

const StepProductCategory = () => {
    const { state, setProductCategory, nextStep } = useConfigurator();

    return (
        <ConfiguratorStep
            stepNumber={2}
            title="Product Category"
            description="Select the primary application or product type you intend to manufacture."
            isValid={state.productCategory !== null}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => { setProductCategory(cat.id); setTimeout(nextStep, 250); }}
                        className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${state.productCategory === cat.id
                            ? 'bg-bvm-blue/10 border-bvm-blue shadow-[0_0_20px_rgba(47,143,255,0.15)] scale-[1.02]'
                            : 'bg-white/5 border-white/10 hover:border-bvm-blue/50 hover:bg-white/10'
                            }`}
                    >
                        <div className={`mb-4 transition-colors ${state.productCategory === cat.id ? 'text-bvm-blue' : 'text-white/50'}`}>
                            {cat.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{cat.label}</h3>
                        <p className="text-bvm-text-muted text-sm">{cat.desc}</p>
                    </button>
                ))}
            </div>
        </ConfiguratorStep>
    );
};

export default StepProductCategory;
