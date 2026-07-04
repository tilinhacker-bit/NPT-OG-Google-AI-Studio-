import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

content = content.replace("notes.sort((a, b) => {", "[...notes].sort((a, b) => {")

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)
print("Updated Notes sort to avoid mutation")
