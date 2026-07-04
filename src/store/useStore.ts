import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ThemeColors {
  bg: string;
  text: string;
}

export interface AppState {
  userRole: string | null;
  userGroup: string | null;
  currentTab: string;
  lang: 'en' | 'mm';
  isDarkMode: boolean;
  theme: { [role: string]: ThemeColors };
  
  setUserRole: (role: string | null) => void;
  setUserGroup: (group: string | null) => void;
  setCurrentTab: (tab: string) => void;
  setLang: (lang: 'en' | 'mm') => void;
  setIsDarkMode: (isDark: boolean) => void;
  setTheme: (theme: { [role: string]: ThemeColors }) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      userRole: null,
      userGroup: null,
      currentTab: 'dashboard',
      lang: 'en',
      isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      theme: {
        'Duty': { bg: '#ffe4e6', text: '#be123c' },
        'Pre': { bg: '#ffedd5', text: '#ea580c' },
        'Ord': { bg: '#e0f2fe', text: '#0369a1' },
        'Off': { bg: '#f1f5f9', text: '#64748b' },
        'Rest': { bg: '#ccfbf1', text: '#0f766e' },
        'Anes': { bg: '#f3e8ff', text: '#7e22ce' }
      },
      setUserRole: (userRole) => set({ userRole }),
      setUserGroup: (userGroup) => set({ userGroup }),
      setCurrentTab: (currentTab) => set({ currentTab }),
      setLang: (lang) => set({ lang }),
      setIsDarkMode: (isDarkMode) => {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ isDarkMode });
      },
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'oghub-preferences',
      partialize: (state) => ({ 
        userRole: state.userRole, 
        userGroup: state.userGroup,
        lang: state.lang,
        isDarkMode: state.isDarkMode,
        theme: state.theme
      }),
    }
  )
);
