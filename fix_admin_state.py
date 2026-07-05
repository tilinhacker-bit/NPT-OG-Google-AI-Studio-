import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('isAdmin{lang === "en" ? "Unlock" : "ဖွင့်မည်"}ed', 'isAdminUnlocked')

with open('src/App.tsx', 'w') as f:
    f.write(content)
