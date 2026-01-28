import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BusinessType = 'retail' | 'manufacturing' | 'agency';

interface AppState {
    isOnboarded: boolean;
    businessName: string;
    businessType: BusinessType | null;
    isFiler: boolean;

    // Actions
    completeOnboarding: (data: { businessName: string; businessType: BusinessType; isFiler: boolean }) => void;
    setIsOnboarded: (value: boolean) => void;
    resetOnboarding: () => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            isOnboarded: false,
            businessName: '',
            businessType: null,
            isFiler: false,

            completeOnboarding: (data) => set({
                isOnboarded: true,
                businessName: data.businessName,
                businessType: data.businessType,
                isFiler: data.isFiler
            }),
            setIsOnboarded: (value) => set({ isOnboarded: value }),
            resetOnboarding: () => set({ isOnboarded: false, businessName: '', businessType: null, isFiler: false }),
        }),
        {
            name: 'hisaab-os-storage',
        }
    )
);
