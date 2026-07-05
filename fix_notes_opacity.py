import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

content = content.replace("opacity-0 group-hover:opacity-100", "opacity-100 sm:opacity-0 sm:group-hover:opacity-100")

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)
