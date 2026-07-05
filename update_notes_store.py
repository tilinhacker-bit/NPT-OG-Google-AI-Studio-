import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

note_interface_start = """interface Note {
  id: string;
  text: string;
  createdAt: string;
  pinned?: boolean;
  reminderDate?: string | null;
}"""
note_interface_new = """interface Note {
  id: string;
  text: string;
  createdAt: string;
  pinned?: boolean;
  reminderDate?: string | null;
  targetDate?: string | null;
}"""
content = content.replace(note_interface_start, note_interface_new)

store_interface_start = """interface NotesStore {
  notes: Note[];
  addNote: (text: string) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  setReminder: (id: string, date: string | null) => void;
}"""
store_interface_new = """interface NotesStore {
  notes: Note[];
  addNote: (text: string, targetDate?: string) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  setReminder: (id: string, date: string | null) => void;
}"""
content = content.replace(store_interface_start, store_interface_new)

store_impl_start = """      addNote: (text: string) => set((state) => ({
        notes: [{ id: Date.now().toString(), text, createdAt: new Date().toISOString(), pinned: false, reminderDate: null }, ...state.notes]
      })),"""
store_impl_new = """      addNote: (text: string, targetDate?: string) => set((state) => ({
        notes: [{ id: Date.now().toString(), text, createdAt: new Date().toISOString(), pinned: false, reminderDate: null, targetDate: targetDate || null }, ...state.notes]
      })),"""
content = content.replace(store_impl_start, store_impl_new)

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)
print("Updated NotesStore with targetDate")
