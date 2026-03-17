"use client";
import { ConfiguratorProvider } from '@/components/configurator/ConfiguratorContext';
import StepMachineType from '@/components/configurator/StepMachineType';
import StepProductCategory from '@/components/configurator/StepProductCategory';
import StepFillVolume from '@/components/configurator/StepFillVolume';
import StepMaterial from '@/components/configurator/StepMaterial';
import StepDeflashing from '@/components/configurator/StepDeflashing';
import StepMachineConfig from '@/components/configurator/StepMachineConfig';
import StepCapacity from '@/components/configurator/StepCapacity';
import StepFeatures from '@/components/configurator/StepFeatures';
import ConfiguratorResults from '@/components/configurator/ConfiguratorResults';

const BuildYourLinePage = () => {
    return (
        <>

            <div className="relative min-h-screen pt-32 pb-20 bg-bvm-navy overflow-hidden flex flex-col items-center justify-center">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-bvm-blue/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-bvm-blue-light/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 w-full px-4 sm:px-8 lg:px-[8vw]">
                    <ConfiguratorProvider>
                        <div className="min-h-[600px] flex flex-col justify-center">
                            <StepMachineType />
                            <StepProductCategory />
                            <StepFillVolume />
                            <StepMaterial />
                            <StepDeflashing />
                            <StepMachineConfig />
                            <StepCapacity />
                            <StepFeatures />
                            <ConfiguratorResults />
                        </div>
                    </ConfiguratorProvider>
                </div>
            </div>
        </>
    );
};

export default BuildYourLinePage;
