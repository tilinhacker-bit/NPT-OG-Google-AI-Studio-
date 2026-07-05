import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace Welcome text
content = content.replace(
    'Welcome to NOGSH Portal 2026',
    '{lang === "en" ? "Welcome to NOGSH Portal 2026" : "NOGSH Portal 2026 မှ ကြိုဆိုပါတယ်"}'
)

content = content.replace(
    'A comprehensive Obstetrics & Gynaecology clinical ward organizer. Designed to streamline duty scheduling, team directory access, and personal clinical notes for the Q3 rotation. Select your role below to get started.',
    '{lang === "en" ? "A comprehensive Obstetrics & Gynaecology clinical ward organizer. Designed to streamline duty scheduling, team directory access, and personal clinical notes for the Q3 rotation. Select your role below to get started." : "သားဖွားမီးယပ်ဆေးရုံကြီး၏ တာဝန်ချိန်ဇယား၊ ဆရာဝန်များစာရင်းနှင့် မှတ်စုများအတွက် အထူးပြုလုပ်ထားသော App ဖြစ်ပါသည်။ စတင်ရန် သင့်အဖွဲ့ကို ရွေးချယ်ပါ။"}'
)

content = content.replace(
    'Obstetrics & Gynaecology clinical ward organizer. Select your role to get started.',
    '{lang === "en" ? "Obstetrics & Gynaecology clinical ward organizer. Select your role to get started." : "သားဖွားမီးယပ်ဆေးရုံကြီး၏ တာဝန်ချိန်ဇယား၊ ဆရာဝန်များစာရင်းနှင့် မှတ်စုများအတွက် အထူးပြုလုပ်ထားသော App ဖြစ်ပါသည်။ စတင်ရန် သင့်အဖွဲ့ကို ရွေးချယ်ပါ။"}'
)

# App tutorial descriptions already have lang checks.
# Any other string?
content = content.replace('Select your group', '{lang === "en" ? "Select your group" : "သင့်အဖွဲ့ကို ရွေးချယ်ပါ"}')
content = content.replace('Choose Language', '{lang === "en" ? "Choose Language" : "ဘာသာစကား ရွေးချယ်ပါ"}')
content = content.replace('Appearance', '{lang === "en" ? "Appearance" : "အသွင်အပြင် (Appearance)"}')
content = content.replace('Themes', '{lang === "en" ? "Themes" : "အပြင်အဆင် (Themes)"}')
content = content.replace('Install App', '{lang === "en" ? "Install App" : "App ကို သွင်းရန် (Install)"}')
content = content.replace('Admin Access', '{lang === "en" ? "Admin Access" : "စီမံခန့်ခွဲသူ ဝင်ပေါက် (Admin Access)"}')
content = content.replace('About App', '{lang === "en" ? "About App" : "App အကြောင်း"}')
content = content.replace('App Tutorial', '{lang === "en" ? "App Tutorial" : "အသုံးပြုနည်း လမ်းညွှန် (Tutorial)"}')
content = content.replace('Reset Onboarding', '{lang === "en" ? "Reset Onboarding" : "အစမှပြန်စရန် (Reset)"}')
content = content.replace('My Notes', '{lang === "en" ? "My Notes" : "မှတ်စုများ"}')
content = content.replace('All notes are stored locally on your device. Privacy guaranteed.', '{lang === "en" ? "All notes are stored locally on your device. Privacy guaranteed." : "မှတ်စုများကို သင့်ဖုန်းထဲတွင်သာ သိမ်းဆည်းထားမည်ဖြစ်ပြီး လုံခြုံမှုရှိပါသည်။"}')
content = content.replace('Enter access code...', '{lang === "en" ? "Enter access code..." : "ကုဒ်နံပါတ် ထည့်ပါ..."}')
content = content.replace('Unlock', '{lang === "en" ? "Unlock" : "ဖွင့်မည်"}')
content = content.replace('Cancel', '{lang === "en" ? "Cancel" : "မလုပ်တော့ပါ"}')
content = content.replace('Settings', '{lang === "en" ? "Settings" : "ဆက်တင်များ"}')
content = content.replace('Directory', '{lang === "en" ? "Directory" : "စာရင်း"}')
content = content.replace('Roster', '{lang === "en" ? "Roster" : "တာဝန်ချိန်"}')

with open('src/App.tsx', 'w') as f:
    f.write(content)
