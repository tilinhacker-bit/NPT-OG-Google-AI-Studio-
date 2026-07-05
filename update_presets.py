import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace COLOR_PRESETS
presets_regex = r"const COLOR_PRESETS = \{.*?\n\};\n"

new_presets = """const COLOR_PRESETS = {
  pastel: {
    Duty: { bg: "#fecdd3", text: "#9f1239" }, // Rose 200/900
    Pre: { bg: "#fdf4ff", text: "#a21caf" }, // Fuchsia 50/700
    Ord: { bg: "#fdf4ff", text: "#a21caf" }, // Fuchsia 50/700
    Off: { bg: "#f3e8ff", text: "#6b21a8" }, // Purple 100/800
    Rest: { bg: "#dcfce7", text: "#166534" }, // Green 100/800
    Anes: { bg: "#fef3c7", text: "#92400e" }, // Amber 100/800
  },
  blossom: {
    Duty: { bg: "#fda4af", text: "#881337" }, // Rose 300/900
    Pre: { bg: "#fff1f2", text: "#be123c" }, // Rose 50/700
    Ord: { bg: "#fff1f2", text: "#be123c" }, // Rose 50/700
    Off: { bg: "#e0e7ff", text: "#3730a3" }, // Indigo 100/800
    Rest: { bg: "#ccfbf1", text: "#0f766e" }, // Teal 100/700
    Anes: { bg: "#f1f5f9", text: "#475569" }, // Slate 100/600
  },
  lavender: {
    Duty: { bg: "#f9a8d4", text: "#831843" }, // Pink 300/900
    Pre: { bg: "#faf5ff", text: "#7e22ce" }, // Purple 50/700
    Ord: { bg: "#faf5ff", text: "#7e22ce" }, // Purple 50/700
    Off: { bg: "#ede9fe", text: "#5b21b6" }, // Violet 100/800
    Rest: { bg: "#bbf7d0", text: "#14532d" }, // Green 200/900
    Anes: { bg: "#e5e7eb", text: "#374151" }, // Gray 200/700
  },
  peach: {
    Duty: { bg: "#fca5a5", text: "#7f1d1d" }, // Red 300/900
    Pre: { bg: "#fff7ed", text: "#c2410c" }, // Orange 50/700
    Ord: { bg: "#fff7ed", text: "#c2410c" }, // Orange 50/700
    Off: { bg: "#e0f2fe", text: "#0369a1" }, // Sky 100/800
    Rest: { bg: "#a7f3d0", text: "#065f46" }, // Emerald 200/900
    Anes: { bg: "#fef08a", text: "#854d0e" }, // Yellow 200/800
  },
  mint: {
    Duty: { bg: "#f87171", text: "#450a0a" }, // Red 400/950
    Pre: { bg: "#ecfdf5", text: "#047857" }, // Emerald 50/700
    Ord: { bg: "#ecfdf5", text: "#047857" }, // Emerald 50/700
    Off: { bg: "#dbeafe", text: "#1d4ed8" }, // Blue 100/700
    Rest: { bg: "#6ee7b7", text: "#064e3b" }, // Emerald 300/900
    Anes: { bg: "#ffedd5", text: "#9a3412" }, // Orange 100/800
  },
  berry: {
    Duty: { bg: "#e879f9", text: "#4a044e" }, // Fuchsia 400/950
    Pre: { bg: "#fdf4ff", text: "#a21caf" }, // Fuchsia 50/700
    Ord: { bg: "#fdf4ff", text: "#a21caf" }, // Fuchsia 50/700
    Off: { bg: "#c7d2fe", text: "#312e81" }, // Indigo 200/900
    Rest: { bg: "#86efac", text: "#14532d" }, // Green 300/900
    Anes: { bg: "#e2e8f0", text: "#334155" }, // Slate 200/700
  },
  sunshine: {
    Duty: { bg: "#fbbf24", text: "#78350f" }, // Amber 400/900
    Pre: { bg: "#fefce8", text: "#a16207" }, // Yellow 50/700
    Ord: { bg: "#fefce8", text: "#a16207" }, // Yellow 50/700
    Off: { bg: "#e0e7ff", text: "#3730a3" }, // Indigo 100/800
    Rest: { bg: "#34d399", text: "#064e3b" }, // Emerald 400/900
    Anes: { bg: "#d1d5db", text: "#1f2937" }, // Gray 300/800
  },
  ocean: {
    Duty: { bg: "#38bdf8", text: "#0c4a6e" }, // Sky 400/900
    Pre: { bg: "#f0f9ff", text: "#0284c7" }, // Sky 50/600
    Ord: { bg: "#f0f9ff", text: "#0284c7" }, // Sky 50/600
    Off: { bg: "#c7d2fe", text: "#312e81" }, // Indigo 200/900
    Rest: { bg: "#2dd4bf", text: "#134e4a" }, // Teal 400/900
    Anes: { bg: "#e2e8f0", text: "#334155" }, // Slate 200/700
  },
  monochrome: {
    Duty: { bg: "#334155", text: "#ffffff" },
    Pre: { bg: "#e2e8f0", text: "#334155" },
    Ord: { bg: "#e2e8f0", text: "#334155" },
    Off: { bg: "#94a3b8", text: "#0f172a" },
    Rest: { bg: "#f1f5f9", text: "#0f172a" },
    Anes: { bg: "#cbd5e1", text: "#0f172a" },
  },
  amoled: {
    Duty: { bg: "#9f1239", text: "#ffe4e6" }, // Rose 900/200
    Pre: { bg: "#1f2937", text: "#f3f4f6" }, // Gray 800/100
    Ord: { bg: "#1f2937", text: "#f3f4f6" }, // Gray 800/100
    Off: { bg: "#312e81", text: "#e0e7ff" }, // Indigo 900/100
    Rest: { bg: "#064e3b", text: "#d1fae5" }, // Emerald 900/100
    Anes: { bg: "#451a03", text: "#fef3c7" }, // Amber 950/100
  },
};
"""

content = re.sub(presets_regex, new_presets, content, flags=re.DOTALL)

# Replace PRESET_LABELS
labels_regex = r"const PRESET_LABELS: Record<string, string> = \{.*?\};\n"

new_labels = """const PRESET_LABELS: Record<string, string> = {
                        pastel: "🌸 Pastel Gentle",
                        blossom: "🌸 Cherry Blossom",
                        lavender: "💜 Lavender Dream",
                        peach: "🍑 Peach Coral",
                        mint: "🍵 Matcha Mint",
                        berry: "🍓 Very Berry",
                        sunshine: "☀️ Morning Sunshine",
                        ocean: "🌊 Deep Ocean",
                        monochrome: "🐼 Slate Monochrome",
                        amoled: "🌌 True Black (AMOLED)",
                      };
"""

content = re.sub(labels_regex, new_labels, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)
