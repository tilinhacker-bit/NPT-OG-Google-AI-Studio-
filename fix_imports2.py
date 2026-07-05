import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('{lang === "en" ? "Settings" : "ဆက်တင်များ"},', 'Settings,')
content = content.replace('{lang === "en" ? "Cancel" : "မလုပ်တော့ပါ"}able', 'Cancelable') # maybe? I will just check if any other got messed up.

with open('src/App.tsx', 'w') as f:
    f.write(content)
