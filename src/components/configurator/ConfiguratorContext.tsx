import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type ProductType = 'iv_fluids' | 'ophthalmic' | 'respiratory' | 'oral' | 'ampoule' | null;
export type VolumeRange = 'small' | 'medium' | 'large' | null; // small: <50ml, medium: 50-500ml, large: >500ml
export type SpeedRequirement = 'low' | 'medium' | 'high' | null;
export type Addon = '21_cfr' | 'cip_sip' | 'scada' | 'nitrogen';

export interface ConfiguratorState {
    step: number;
    productType: ProductType;
    volumeRange: VolumeRange;
    speed: SpeedRequirement;
    addons: Addon[];
}

interface ConfiguratorContextType {
    state: ConfiguratorState;
    setProductType: (type: ProductType) => void;
    setVolumeRange: (range: VolumeRange) => void;
    setSpeed: (speed: SpeedRequirement) => void;
    toggleAddon: (addon: Addon) => void;
    nextStep: () => void;
    prevStep: () => void;
    resetConfigurator: () => void;
}

const initialState: ConfiguratorState = {
    step: 1,
    productType: null,
    volumeRange: null,
    speed: null,
    addons: [],
};

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export const ConfiguratorProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<ConfiguratorState>(initialState);

    const setProductType = (type: ProductType) => setState((s) => ({ ...s, productType: type }));
    const setVolumeRange = (range: VolumeRange) => setState((s) => ({ ...s, volumeRange: range }));
    const setSpeed = (speed: SpeedRequirement) => setState((s) => ({ ...s, speed }));

    const toggleAddon = (addon: Addon) => {
        setState((s) => ({
            ...s,
            addons: s.addons.includes(addon)
                ? s.addons.filter((a) => a !== addon)
                : [...s.addons, addon],
        }));
    };

    const nextStep = () => setState((s) => ({ ...s, step: Math.min(s.step + 1, 5) }));
    const prevStep = () => setState((s) => ({ ...s, step: Math.max(s.step - 1, 1) }));
    const resetConfigurator = () => setState(initialState);

    return (
        <ConfiguratorContext.Provider
            value={{
                state,
                setProductType,
                setVolumeRange,
                setSpeed,
                toggleAddon,
                nextStep,
                prevStep,
                resetConfigurator,
            }}
        >
            {children}
        </ConfiguratorContext.Provider>
    );
};

export const useConfigurator = () => {
    const context = useContext(ConfiguratorContext);
    if (context === undefined) {
        throw new Error('useConfigurator must be used within a ConfiguratorProvider');
    }
    return context;
};
