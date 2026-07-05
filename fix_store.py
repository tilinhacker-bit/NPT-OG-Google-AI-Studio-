import re

with open('src/store/useStore.ts', 'r') as f:
    content = f.read()

# I will add appTheme
content = content.replace('isDarkMode: boolean;', 'isDarkMode: boolean;\n  appTheme?: "light" | "dark" | "amoled";\n  setAppTheme: (theme: "light" | "dark" | "amoled") => void;')

content = content.replace('lang: "en",', 'lang: "en",\n      appTheme: "light",')

app_theme_func = """      setAppTheme: (appTheme) => {
        document.documentElement.classList.remove("dark", "amoled");
        if (appTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else if (appTheme === "amoled") {
          document.documentElement.classList.add("dark", "amoled");
        }
        // Sync isDarkMode for legacy components
        set({ appTheme, isDarkMode: appTheme !== "light" });
      },"""

content = content.replace('      setIsDarkMode: (isDarkMode) => {', app_theme_func + '\n      setIsDarkMode: (isDarkMode) => {')

content = content.replace('isDarkMode: state.isDarkMode,', 'isDarkMode: state.isDarkMode,\n        appTheme: state.appTheme,')

with open('src/store/useStore.ts', 'w') as f:
    f.write(content)

