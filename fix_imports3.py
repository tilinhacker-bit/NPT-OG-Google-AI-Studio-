import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('{lang === "en" ? "Roster" : "တာဝန်ချိန်"}Day', 'RosterDay')
content = content.replace('master{lang === "en" ? "Roster" : "တာဝန်ချိန်"}', 'masterRoster')
content = content.replace('setCurrentTab("{lang === "en" ? "Settings" : "ဆက်တင်များ"}")', 'setCurrentTab("settings")')
content = content.replace('setCurrentTab("{lang === "en" ? "Directory" : "စာရင်း"}")', 'setCurrentTab("directory")')
content = content.replace('setCurrentTab("{lang === "en" ? "Roster" : "တာဝန်ချိန်"}")', 'setCurrentTab("calendar")')

content = content.replace('currentTab === "{lang === "en" ? "Settings" : "ဆက်တင်များ"}"', 'currentTab === "settings"')
content = content.replace('currentTab === "{lang === "en" ? "Directory" : "စာရင်း"}"', 'currentTab === "directory"')
content = content.replace('currentTab === "{lang === "en" ? "Roster" : "တာဝန်ချိန်"}"', 'currentTab === "calendar"')
content = content.replace('key="{lang === "en" ? "Settings" : "ဆက်တင်များ"}"', 'key="settings"')
content = content.replace('key="{lang === "en" ? "Directory" : "စာရင်း"}"', 'key="directory"')
content = content.replace('key="{lang === "en" ? "Roster" : "တာဝန်ချိန်"}"', 'key="calendar"')

with open('src/App.tsx', 'w') as f:
    f.write(content)
