import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('<{lang === "en" ? "Unlock" : "ဖွင့်မည်"}', '<Unlock')

with open('src/App.tsx', 'w') as f:
    f.write(content)
