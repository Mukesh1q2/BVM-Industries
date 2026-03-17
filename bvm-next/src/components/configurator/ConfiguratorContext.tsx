"use client";
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type MachineType = 'BFS' | 'FFS' | null;
export type ProductCategory = 'LVP' | 'SVP' | 'Eye Drops' | 'Cosmetics' | 'Agro Products' | null;
export type FillVolume = string | null;
export type Material = 'PP' | 'LDPE' | 'PE' | 'Customized LDPE' | null;
export type DeflashingType = 'Automatic' | 'Manual' | null;
export type StationType = 'Single Station' | 'Double Station' | null;
export type ProductionCapacity = string | null;
// Addons can be any string from the options
export type Addon = string;

export interface ConfiguratorState {
    step: number;
    machineType: MachineType;
    productCategory: ProductCategory;
    fillVolume: FillVolume;
    material: Material;
    deflashing: DeflashingType;
    stationType: StationType;
    capacity: ProductionCapacity;
    addons: Addon[];
}

interface ConfiguratorContextType {
    state: ConfiguratorState;
    setMachineType: (type: MachineType) => void;
    setProductCategory: (category: ProductCategory) => void;
    setFillVolume: (volume: FillVolume) => void;
    setMaterial: (material: Material) => void;
    setDeflashing: (type: DeflashingType) => void;
    setStationType: (type: StationType) => void;
    setCapacity: (capacity: ProductionCapacity) => void;
    toggleAddon: (addon: Addon) => void;
    nextStep: () => void;
    prevStep: () => void;
    resetConfigurator: () => void;
}

const initialState: ConfiguratorState = {
    step: 1,
    machineType: null,
    productCategory: null,
    fillVolume: null,
    material: null,
    deflashing: null,
    stationType: null,
    capacity: null,
    addons: [],
};

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export const ConfiguratorProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<ConfiguratorState>(initialState);

    // If machineType or productCategory changes, we might need to reset dependent fields
    const setMachineType = (type: MachineType) => {
        setState((s) => ({
            ...s,
            machineType: type,
            // Reset dependent fields if changing root type
            fillVolume: s.machineType && s.machineType !== type ? null : s.fillVolume,
            capacity: s.machineType && s.machineType !== type ? null : s.capacity,
        }));
    };

    const setProductCategory = (category: ProductCategory) => setState((s) => ({ ...s, productCategory: category }));
    const setFillVolume = (volume: FillVolume) => setState((s) => ({ ...s, fillVolume: volume }));
    const setMaterial = (material: Material) => setState((s) => ({ ...s, material: material }));
    const setDeflashing = (type: DeflashingType) => setState((s) => ({ ...s, deflashing: type }));
    const setStationType = (type: StationType) => setState((s) => ({ ...s, stationType: type }));
    const setCapacity = (capacity: ProductionCapacity) => setState((s) => ({ ...s, capacity: capacity }));

    const toggleAddon = (addon: Addon) => {
        setState((s) => ({
            ...s,
            addons: s.addons.includes(addon)
                ? s.addons.filter((a) => a !== addon)
                : [...s.addons, addon],
        }));
    };

    const nextStep = () => setState((s) => ({ ...s, step: Math.min(s.step + 1, 9) })); // 8 steps + 1 result
    const prevStep = () => setState((s) => ({ ...s, step: Math.max(s.step - 1, 1) }));
    const resetConfigurator = () => setState(initialState);

    return (
        <ConfiguratorContext.Provider
            value={{
                state,
                setMachineType,
                setProductCategory,
                setFillVolume,
                setMaterial,
                setDeflashing,
                setStationType,
                setCapacity,
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
