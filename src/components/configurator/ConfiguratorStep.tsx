import type { ReactNode } from 'react';
import { useConfigurator } from './ConfiguratorContext';
import RevealSection from '../RevealSection';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ConfiguratorStepProps {
    title: string;
    description: string;
    children: ReactNode;
    isValid: boolean;
    stepNumber: number;
}

const ConfiguratorStep = ({ title, description, children, isValid, stepNumber }: ConfiguratorStepProps) => {
    const { state, nextStep, prevStep } = useConfigurator();

    if (state.step !== stepNumber) return null;

    return (
        <RevealSection className="w-full max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
            <div className="mb-10 text-center">
                <span className="text-bvm-blue font-bold tracking-widest uppercase text-sm mb-2 block">Step {stepNumber} of 4</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">{title}</h2>
                <p className="text-bvm-text-muted text-lg max-w-2xl mx-auto">{description}</p>
            </div>

            <div className="mb-12">
                {children}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-8">
                <button
                    onClick={prevStep}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${stepNumber === 1
                        ? 'opacity-0 pointer-events-none'
                        : 'text-white/70 hover:text-white bg-white/5 hover:bg-white/10'
                        }`}
                >
                    <ChevronLeft className="w-5 h-5" /> Back
                </button>

                <button
                    onClick={nextStep}
                    disabled={!isValid}
                    className={`group flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${isValid
                        ? 'bg-bvm-blue text-white shadow-lg hover:bg-blue-600 hover:shadow-bvm-blue/25 hover:-translate-y-1'
                        : 'bg-white/5 text-white/30 cursor-not-allowed'
                        }`}
                >
                    Continue <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </RevealSection>
    );
};

export default ConfiguratorStep;
