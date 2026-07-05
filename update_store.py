import re

with open('src/store/useStore.ts', 'r') as f:
    content = f.read()

store_regex = r"theme: \{\n\s*Duty: \{ bg: \".*?\", text: \".*?\" \},\n\s*Pre: \{ bg: \".*?\", text: \".*?\" \},\n\s*Ord: \{ bg: \".*?\", text: \".*?\" \},\n\s*Off: \{ bg: \".*?\", text: \".*?\" \},\n\s*Rest: \{ bg: \".*?\", text: \".*?\" \},\n\s*Anes: \{ bg: \".*?\", text: \".*?\" \},\n\s*\}"

new_store = """theme: {
        Duty: { bg: "#fecdd3", text: "#9f1239" },
        Pre: { bg: "#fdf4ff", text: "#a21caf" },
        Ord: { bg: "#fdf4ff", text: "#a21caf" },
        Off: { bg: "#f3e8ff", text: "#6b21a8" },
        Rest: { bg: "#dcfce7", text: "#166534" },
        Anes: { bg: "#fef3c7", text: "#92400e" },
      }"""

content = re.sub(store_regex, new_store, content, flags=re.DOTALL)

with open('src/store/useStore.ts', 'w') as f:
    f.write(content)
