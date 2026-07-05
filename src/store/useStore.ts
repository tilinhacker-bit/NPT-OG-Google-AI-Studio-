import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ThemeColors {
  bg: string;
  text: string;
}

export interface AppState {
  userRole: string | null;
  userGroup: string | null;
  currentTab: string;
  lang: "en" | "mm" | "zh";
  isDarkMode: boolean;
  appTheme?: "light" | "dark" | "amoled" | "system";
  setAppTheme: (theme: "light" | "dark" | "amoled" | "system") => void;
  theme: { [role: string]: ThemeColors };
  customDays: Record<string, { color: string; text: string }>;
  globalCustomDays: Record<string, { color: string; text: string }>;
  globalRosterOverrides: Record<string, Record<string, string>>;
  personalRosterOverrides: Record<string, Record<string, string>>;

  setUserRole: (role: string | null) => void;
  setUserGroup: (group: string | null) => void;
  setCurrentTab: (tab: string) => void;
  setLang: (lang: "en" | "mm" | "zh") => void;
  setIsDarkMode: (isDark: boolean) => void;
  setTheme: (theme: { [role: string]: ThemeColors }) => void;
  setCustomDay: (dateStr: string, color: string, text: string) => void;
  clearCustomDay: (dateStr: string) => void;
  setGlobalCustomDay: (dateStr: string, color: string, text: string) => void;
  clearGlobalCustomDay: (dateStr: string) => void;
  setGlobalRosterOverride: (dateStr: string, group: string, role: string) => void;
  setPersonalRosterOverride: (dateStr: string, group: string, role: string) => void;
  clearGlobalRosterOverrides: (dateStr: string) => void;
  clearPersonalRosterOverrides: (dateStr: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      userRole: null,
      userGroup: null,
      currentTab: "dashboard",
      lang: "en",
      appTheme: "system",
      isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      customDays: {},
      globalCustomDays: {},
      globalRosterOverrides: {},
      personalRosterOverrides: {},
      theme: {
        Duty: { bg: "#db2777", text: "#ffffff" },
        Pre: { bg: "#fdf2f8", text: "#db2777" },
        Ord: { bg: "#fdf2f8", text: "#db2777" },
        Off: { bg: "#f3e8ff", text: "#6b21a8" },
        Rest: { bg: "#22c55e", text: "#ffffff" },
        Anes: { bg: "#ccfbf1", text: "#0f766e" },
      },
      setUserRole: (userRole) => set({ userRole }),
      setUserGroup: (userGroup) => set({ userGroup }),
      setCurrentTab: (currentTab) => set({ currentTab }),
      setLang: (lang) => set({ lang }),
      setAppTheme: (appTheme) => {
        document.documentElement.classList.remove("dark", "amoled");
        let isDark = false;
        if (appTheme === "system") {
          isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          if (isDark) {
            document.documentElement.classList.add("dark");
          }
        } else if (appTheme === "dark") {
          document.documentElement.classList.add("dark");
          isDark = true;
        } else if (appTheme === "amoled") {
          document.documentElement.classList.add("dark", "amoled");
          isDark = true;
        }
        // Sync isDarkMode for legacy components
        set({ appTheme, isDarkMode: isDark });
      },
      setIsDarkMode: (isDarkMode) => {
        if (isDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        set({ isDarkMode });
      },
      setTheme: (theme) => set({ theme }),
      setCustomDay: (dateStr, color, text) =>
        set((state) => ({
          customDays: { ...state.customDays, [dateStr]: { color, text } },
        })),
      clearCustomDay: (dateStr) =>
        set((state) => {
          const newCustomDays = { ...state.customDays };
          delete newCustomDays[dateStr];
          return { customDays: newCustomDays };
        }),
      setGlobalCustomDay: (dateStr, color, text) =>
        set((state) => ({
          globalCustomDays: {
            ...state.globalCustomDays,
            [dateStr]: { color, text },
          },
        })),
      clearGlobalCustomDay: (dateStr) =>
        set((state) => {
          const newGlobalCustomDays = { ...state.globalCustomDays };
          delete newGlobalCustomDays[dateStr];
          return { globalCustomDays: newGlobalCustomDays };
        }),
      setGlobalRosterOverride: (dateStr, group, role) =>
        set((state) => {
          const dayOverrides = state.globalRosterOverrides[dateStr] || {};
          return {
            globalRosterOverrides: {
              ...state.globalRosterOverrides,
              [dateStr]: { ...dayOverrides, [group]: role },
            },
          };
        }),
      setPersonalRosterOverride: (dateStr, group, role) =>
        set((state) => {
          const dayOverrides = state.personalRosterOverrides[dateStr] || {};
          return {
            personalRosterOverrides: {
              ...state.personalRosterOverrides,
              [dateStr]: { ...dayOverrides, [group]: role },
            },
          };
        }),
      clearGlobalRosterOverrides: (dateStr) =>
        set((state) => {
          const newOverrides = { ...state.globalRosterOverrides };
          delete newOverrides[dateStr];
          return { globalRosterOverrides: newOverrides };
        }),
      clearPersonalRosterOverrides: (dateStr) =>
        set((state) => {
          const newOverrides = { ...state.personalRosterOverrides };
          delete newOverrides[dateStr];
          return { personalRosterOverrides: newOverrides };
        }),
    }),
    {
      name: "oghub-preferences",
      partialize: (state) => ({
        userRole: state.userRole,
        userGroup: state.userGroup,
        lang: state.lang,
        isDarkMode: state.isDarkMode,
        appTheme: state.appTheme,
        theme: state.theme,
        customDays: state.customDays,
        globalCustomDays: state.globalCustomDays,
        globalRosterOverrides: state.globalRosterOverrides,
        personalRosterOverrides: state.personalRosterOverrides,
      }),
    },
  ),
);
