import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Revert specific strings
content = content.replace('{lang === "en" ? "Notes" : "မှတ်စုများ"}', 'Notes')
content = content.replace('{lang === "en" ? "Directory" : "စာရင်း"}', 'Directory')
content = content.replace('{lang === "en" ? "Settings" : "ဆက်တင်များ"}', 'Settings')
content = content.replace('{lang === "en" ? "Roster" : "တာဝန်ချိန်"}', 'Roster')
content = content.replace('{lang === "en" ? "Unlock" : "ဖွင့်မည်"}', 'Unlock')
content = content.replace('{lang === "en" ? "Cancel" : "မလုပ်တော့ပါ"}', 'Cancel')
content = content.replace('{lang === "en" ? "Install App" : "App ကို သွင်းရန် (Install)"}', 'Install App')
content = content.replace('{lang === "en" ? "Search..." : "ရှာဖွေရန်..."}', 'Search...')
content = content.replace('{lang === "en" ? "Enter access code..." : "ကုဒ်နံပါတ် ထည့်ပါ..."}', 'Enter access code...')
content = content.replace('{lang === "en" ? "Appearance" : "အသွင်အပြင် (Appearance)"}', 'Appearance')
content = content.replace('{lang === "en" ? "Themes" : "အပြင်အဆင် (Themes)"}', 'Themes')
content = content.replace('{lang === "en" ? "Admin Access" : "စီမံခန့်ခွဲသူ ဝင်ပေါက် (Admin Access)"}', 'Admin Access')
content = content.replace('{lang === "en" ? "About App" : "App အကြောင်း"}', 'About App')
content = content.replace('{lang === "en" ? "App Tutorial" : "အသုံးပြုနည်း လမ်းညွှန် (Tutorial)"}', 'App Tutorial')
content = content.replace('{lang === "en" ? "Reset Onboarding" : "အစမှပြန်စရန် (Reset)"}', 'Reset Onboarding')

with open('src/App.tsx', 'w') as f:
    f.write(content)

with open('src/components/NotesWidget.tsx', 'r') as f:
    notes_content = f.read()

notes_content = notes_content.replace('{lang === "en" ? "Search notes..." : "မှတ်စုများကို ရှာဖွေပါ..."}', 'Search notes...')
notes_content = notes_content.replace('{lang === "en" ? "Search..." : "ရှာဖွေရန်..."}', 'Search...')
with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(notes_content)

