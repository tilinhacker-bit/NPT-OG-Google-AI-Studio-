import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

content = content.replace("export function NotesWidget() {", "export function NotesWidget({ activeDateStr = '' }: { activeDateStr?: string }) {")

# update the notes map to filter
notes_render_start = """        {notes.length === 0 ? ("""
notes_render_new = """        {notes.filter(n => !n.targetDate || n.targetDate <= activeDateStr).length === 0 ? ("""
content = content.replace(notes_render_start, notes_render_new)

notes_map_start = """        ) : (
          [...notes].sort((a, b) => {"""
notes_map_new = """        ) : (
          [...notes].filter(n => !n.targetDate || n.targetDate <= activeDateStr).sort((a, b) => {"""
content = content.replace(notes_map_start, notes_map_new)

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)
print("Updated NotesWidget with activeDateStr filter")
