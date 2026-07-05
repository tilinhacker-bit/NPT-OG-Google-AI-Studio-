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
  lang: "en" | "mm";
  isDarkMode: boolean;
  appTheme?: "light" | "dark" | "amoled";
  setAppTheme: (theme: "light" | "dark" | "amoled") => void;
  theme: { [role: string]: ThemeColors };
  customDays: Record<string, { color: string; text: string }>;

  setUserRole: (role: string | null) => void;
  setUserGroup: (group: string | null) => void;
  setCurrentTab: (tab: string) => void;
  setLang: (lang: "en" | "mm") => void;
  setIsDarkMode: (isDark: boolean) => void;
  setTheme: (theme: { [role: string]: ThemeColors }) => void;
  setCustomDay: (dateStr: string, color: string, text: string) => void;
  clearCustomDay: (dateStr: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      userRole: null,
      userGroup: null,
      currentTab: "dashboard",
      lang: "en",
      appTheme: "light",
      isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      customDays: {},
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
        if (appTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else if (appTheme === "amoled") {
          document.documentElement.classList.add("dark", "amoled");
        }
        // Sync isDarkMode for legacy components
        set({ appTheme, isDarkMode: appTheme !== "light" });
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
      }),
    },
  ),
);
