import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Make sure to extract appTheme, setAppTheme
extract_old = """    isDarkMode,
    setIsDarkMode,
  } = useStore();"""

extract_new = """    isDarkMode,
    setIsDarkMode,
    appTheme,
    setAppTheme,
  } = useStore();"""

content = content.replace(extract_old, extract_new)

if 'appTheme' not in content:
    print("Failed to replace useStore variables")

theme_toggle_old = """                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsDarkMode(false)}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${!isDarkMode ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        <Sun className="h-4 w-4 inline-block mr-1" /> Light
                      </button>
                      <button
                        onClick={() => setIsDarkMode(true)}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${isDarkMode ? "bg-slate-800 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        <Moon className="h-4 w-4 inline-block mr-1" /> Dark
                      </button>
                    </div>"""

theme_toggle_new = """                    <div className="flex gap-2">
                      <button
                        onClick={() => setAppTheme?.("light")}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${appTheme === "light" || !appTheme ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        <Sun className="h-4 w-4 inline-block mr-1" /> Light
                      </button>
                      <button
                        onClick={() => setAppTheme?.("dark")}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${appTheme === "dark" ? "bg-slate-700 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        <Moon className="h-4 w-4 inline-block mr-1" /> Dark
                      </button>
                      <button
                        onClick={() => setAppTheme?.("amoled")}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${appTheme === "amoled" ? "bg-black text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        <Moon className="h-4 w-4 inline-block mr-1" /> AMOLED
                      </button>
                    </div>"""

content = content.replace(theme_toggle_old, theme_toggle_new)

# Also need to run setAppTheme on mount if it's there
effect_old = """  useEffect(() => {
    if (theme[selectedCustomRole]) {
      setCustomColorPicker(theme[selectedCustomRole].bg);
    }
  }, [selectedCustomRole, theme]);"""

effect_new = """  useEffect(() => {
    if (theme[selectedCustomRole]) {
      setCustomColorPicker(theme[selectedCustomRole].bg);
    }
  }, [selectedCustomRole, theme]);

  // Apply theme on mount
  useEffect(() => {
    if (appTheme) setAppTheme(appTheme);
  }, [appTheme, setAppTheme]);
"""

content = content.replace(effect_old, effect_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
