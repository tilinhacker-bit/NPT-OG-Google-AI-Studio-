import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('{lang === "en" ? "Directory" : "စာရင်း"}Tab', 'DirectoryTab')

with open('src/App.tsx', 'w') as f:
    f.write(content)
