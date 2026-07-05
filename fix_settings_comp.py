import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('<{lang === "en" ? "Settings" : "ဆက်တင်များ"} className=', '<Settings className=')

with open('src/App.tsx', 'w') as f:
    f.write(content)
