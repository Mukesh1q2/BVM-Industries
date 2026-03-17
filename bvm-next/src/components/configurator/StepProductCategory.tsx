import React from 'react';
import { useConfigurator, ProductCategory } from './ConfiguratorContext';
import ConfiguratorStep from './ConfiguratorStep';
import { Pill, Activity, Eye, Sparkles, Leaf, Beaker, FlaskConical } from 'lucide-react';

const allCategories: { id: ProductCategory; label: string; desc: string; icon: React.ReactNode; validFor: string[] }[] = [
    { id: 'LVP', label: 'LVP', desc: 'Large Volume Parenterals', icon: <Activity className="w-8 h-8" />, validFor: ['BFS'] },
    { id: 'SVP', label: 'SVP', desc: 'Small Volume Parenterals', icon: <Pill className="w-8 h-8" />, validFor: ['FFS'] },
    { id: 'Eye Drop', label: 'Eye Drop', desc: 'Ophthalmic Solutions', icon: <Eye className="w-8 h-8" />, validFor: ['FFS'] },
    { id: 'Respules', label: 'Respules', desc: 'Respiratory Single-Dose', icon: <WindIcon className="w-8 h-8" />, validFor: ['FFS'] },
    { id: 'Oral Liquids', label: 'Oral Liquids', desc: 'Drinkable Solutions', icon: <Beaker className="w-8 h-8" />, validFor: ['FFS'] },
    { id: 'Cosmetics', label: 'Cosmetics', desc: 'Creams, Lotions, and Serums', icon: <Sparkles className="w-8 h-8" />, validFor: ['BFS', 'FFS'] },
    { id: 'Agro Products', label: 'Agro Products', desc: 'Agricultural Chemicals', icon: <Leaf className="w-8 h-8" />, validFor: ['BFS', 'FFS'] },
];

function WindIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/></svg>;
}

const StepProductCategory = () => {
    const { state, setProductCategory, nextStep } = useConfigurator();

    // Filter categories based on BFS vs FFS capability
    const visibleCategories = allCategories.filter(cat => 
        state.machineType ? cat.validFor.includes(state.machineType) : true
    );

    return (
        <ConfiguratorStep
            stepNumber={2}
            title="Product Category"
            description="Select the primary application or product type you intend to manufacture."
            isValid={state.productCategory !== null}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleCategories.map((cat) => (
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
