import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace("<NotesWidget />", "<NotesWidget activeDateStr={dateStr} />")

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Updated App with activeDateStr for NotesWidget")
