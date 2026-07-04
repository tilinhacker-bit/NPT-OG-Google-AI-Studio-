import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

new_imports = "import React, { useState } from 'react';\nimport { Trash2, Pin, CalendarClock, Bell } from 'lucide-react';"
content = content.replace("import React, { useState } from 'react';\nimport { Trash2 } from 'lucide-react';", new_imports)

note_interface = """interface Note {
  id: string;
  text: string;
  createdAt: string;
  pinned?: boolean;
  reminderDate?: string | null;
}"""
content = re.sub(r"interface Note \{.*?\n\}", note_interface, content, flags=re.DOTALL)

store_interface = """interface NotesStore {
  notes: Note[];
  addNote: (text: string) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  setReminder: (id: string, date: string | null) => void;
}"""
content = re.sub(r"interface NotesStore \{.*?\n\}", store_interface, content, flags=re.DOTALL)

store_impl = """    (set) => ({
      notes: [],
      addNote: (text: string) => set((state) => ({
        notes: [{ id: Date.now().toString(), text, createdAt: new Date().toISOString(), pinned: false, reminderDate: null }, ...state.notes]
      })),
      deleteNote: (id: string) => set((state) => ({
        notes: state.notes.filter(n => n.id !== id)
      })),
      togglePin: (id: string) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n)
      })),
      setReminder: (id: string, date: string | null) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, reminderDate: date } : n)
      }))
    }),"""
content = re.sub(r"    \(set\) => \(\{.*?\n    \}\),", store_impl, content, flags=re.DOTALL)

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)
print("Updated NotesStore")
