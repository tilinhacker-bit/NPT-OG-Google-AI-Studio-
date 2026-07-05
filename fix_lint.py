import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

content = content.replace('''}: {
  note: Note;
  togglePin: (id: string) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, text: string) => void;
}) {''', '''}: {
  key?: React.Key;
  note: Note;
  togglePin: (id: string) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, text: string) => void;
}) {''')

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)
