import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('setIsAdmin{lang === "en" ? "Unlock" : "ဖွင့်မည်"}ed', 'setIsAdminUnlocked')
content = content.replace('setIsAdminUnlocked(false);', 'setIsAdminUnlocked(false);')

with open('src/App.tsx', 'w') as f:
    f.write(content)
