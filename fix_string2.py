import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('custom theme from {lang === "en" ? "Settings" : "ဆက်တင်များ"} to match', 'custom theme from Settings to match')
content = content.replace('Tap "Install App" in the {lang === "en" ? "Settings" : "ဆက်တင်များ"} menu', 'Tap "Install App" in the Settings menu')
content = content.replace('icon in the {lang === "en" ? "Roster" : "တာဝန်ချိန်"} tab', 'icon in the Roster tab')

with open('src/App.tsx', 'w') as f:
    f.write(content)
