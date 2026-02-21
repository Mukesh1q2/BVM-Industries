import { Metadata } from 'next';
import DynamicWrapper from './DynamicWrapper';

export const metadata: Metadata = {
    title: 'Build Your Line | Configurator | BVM Industries',
    description: 'Configure your personalized pharmaceutical manufacturing line. Build your custom Blow-Fill-Seal or Form-Fill-Seal setup.'
};

export default function BuildYourLinePage() {
    return <DynamicWrapper />;
}
