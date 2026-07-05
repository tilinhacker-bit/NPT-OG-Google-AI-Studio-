import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('using the {lang === "en" ? "Settings" : "ဆက်တင်များ"} menu', 'using the Settings menu')
content = content.replace('in the {lang === "en" ? "Directory" : "စာရင်း"} and {lang === "en" ? "Roster" : "တာဝန်ချိန်"}', 'in the Directory and Roster')
content = content.replace('using the {lang === "en" ? "Settings" : "ဆက်တင်များ"} menu', 'using the Settings menu')
content = content.replace('tap "Install App" in the {lang === "en" ? "Settings" : "ဆက်တင်များ"} menu', 'tap "Install App" in the Settings menu')
content = content.replace('icon in the {lang === "en" ? "Roster" : "တာဝန်ချိန်"} tab', 'icon in the Roster tab')

with open('src/App.tsx', 'w') as f:
    f.write(content)
