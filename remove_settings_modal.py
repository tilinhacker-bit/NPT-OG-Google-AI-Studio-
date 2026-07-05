import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Remove the state
content = re.sub(r'  const \[settingsModalOpen, setSettingsModalOpen\] = useState\(false\);\n', '', content)

# Remove the Settings modal block
content = re.sub(r'\s*\{\/\* SETTINGS MODAL \*\/}.*?(?=\{\/\* APP TUTORIAL MODAL \*\/})', '\n\n      ', content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)
