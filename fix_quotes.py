import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('title="{lang === "en" ? "Install App" : "App ကို သွင်းရန် (Install)"}"', 'title={lang === "en" ? "Install App" : "App ကို သွင်းရန် (Install)"}')
content = content.replace('placeholder="{lang === "en" ? "Search" : "ရှာဖွေရန်"}..."', 'placeholder={lang === "en" ? "Search..." : "ရှာဖွေရန်..."}')
content = content.replace('placeholder="{lang === "en" ? "Enter access code..." : "ကုဒ်နံပါတ် ထည့်ပါ..."}"', 'placeholder={lang === "en" ? "Enter access code..." : "ကုဒ်နံပါတ် ထည့်ပါ..."}')

with open('src/App.tsx', 'w') as f:
    f.write(content)
