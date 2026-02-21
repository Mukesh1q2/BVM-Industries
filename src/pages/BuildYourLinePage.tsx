import { Helmet } from 'react-helmet-async';
import { ConfiguratorProvider } from '../components/configurator/ConfiguratorContext';
import StepProduct from '../components/configurator/StepProduct';
import StepVolume from '../components/configurator/StepVolume';
import StepSpeed from '../components/configurator/StepSpeed';
import StepAddons from '../components/configurator/StepAddons';
import ConfiguratorResults from '../components/configurator/ConfiguratorResults';

const BuildYourLinePage = () => {
    return (
        <>
            <Helmet>
                <title>Build Your Line | Configurator | BVM Industries</title>
                <meta
                    name="description"
                    content="Configure your personalized pharmaceutical manufacturing line. Build your custom Blow-Fill-Seal or Form-Fill-Seal setup."
                />
            </Helmet>

            <div className="relative min-h-screen pt-32 pb-20 bg-bvm-navy overflow-hidden flex flex-col items-center justify-center">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-bvm-blue/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-bvm-blue-light/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 w-full px-4 sm:px-8 lg:px-[8vw]">
                    <ConfiguratorProvider>
                        <div className="min-h-[600px] flex flex-col justify-center">
                            <StepProduct />
                            <StepVolume />
                            <StepSpeed />
                            <StepAddons />
                            <ConfiguratorResults />
                        </div>
                    </ConfiguratorProvider>
                </div>
            </div>
        </>
    );
};

export default BuildYourLinePage;
