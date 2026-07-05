import re

with open('src/store/useStore.ts', 'r') as f:
    content = f.read()

content = content.replace('Ord: { bg: "#e0f2fe", text: "#0369a1" }', 'Ord: { bg: "#ffedd5", text: "#ea580c" }')

with open('src/store/useStore.ts', 'w') as f:
    f.write(content)
