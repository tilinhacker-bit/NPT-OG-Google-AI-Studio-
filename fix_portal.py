import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace("NOGSH Hub 2026", "NOGSH Portal 2026")

with open('src/App.tsx', 'w') as f:
    f.write(content)
