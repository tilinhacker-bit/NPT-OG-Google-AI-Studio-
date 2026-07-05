import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

# Update the interface
interface_old = """interface NotesStore {
  notes: Note[];
  addNote: (text: string, targetDate?: string) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  setReminder: (id: string, date: string | null) => void;
}"""
interface_new = """interface NotesStore {
  notes: Note[];
  addNote: (text: string, targetDate?: string) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  setReminder: (id: string, date: string | null) => void;
}"""
content = content.replace(interface_old, interface_new)

# Update the store implementation
impl_old = """      addNote: (text: string, targetDate?: string) => set((state) => ({
        notes: [{ id: Date.now().toString(), text, createdAt: new Date().toISOString(), pinned: false, reminderDate: null, targetDate: targetDate || null }, ...state.notes]
      })),
      deleteNote: (id: string) => set((state) => ({"""
impl_new = """      addNote: (text: string, targetDate?: string) => set((state) => ({
        notes: [{ id: Date.now().toString(), text, createdAt: new Date().toISOString(), pinned: false, reminderDate: null, targetDate: targetDate || null }, ...state.notes]
      })),
      updateNote: (id: string, text: string) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, text } : n)
      })),
      deleteNote: (id: string) => set((state) => ({"""
content = content.replace(impl_old, impl_new)

# Update component imports
content = content.replace("import { Trash2, Pin, CalendarClock, Bell } from 'lucide-react';", "import { Trash2, Pin, CalendarClock, Bell, Edit2, Check, X } from 'lucide-react';")

# Add state
state_old = """  const { notes, addNote, deleteNote, togglePin, setReminder } = useNotesStore();
  const [currentNoteText, setCurrentNoteText] = useState("");"""
state_new = """  const { notes, addNote, updateNote, deleteNote, togglePin, setReminder } = useNotesStore();
  const [currentNoteText, setCurrentNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editNoteText, setEditNoteText] = useState("");"""
content = content.replace(state_old, state_new)

# Update mapping
map_old = """          }).map(note => (
            <div key={note.id} className={`p-3 rounded-xl border group relative ${note.pinned ? 'bg-amber-50/50 border-amber-200/50' : 'bg-slate-50 border-slate-100'}`}>
              <div className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-medium pr-16">
                {note.text}
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => togglePin(note.id)}
                  className={`p-1.5 rounded-lg shadow-sm transition-colors ${note.pinned ? 'bg-amber-100 text-amber-600' : 'bg-white text-slate-400 hover:text-amber-500'}`}
                >
                  <Pin className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => setReminder(note.id, note.reminderDate ? null : new Date(Date.now() + 86400000).toISOString())}
                  className={`p-1.5 rounded-lg shadow-sm transition-colors ${note.reminderDate ? 'bg-indigo-100 text-indigo-600' : 'bg-white text-slate-400 hover:text-indigo-500'}`}
                >
                  <Bell className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="p-1.5 bg-white rounded-lg shadow-sm text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>"""

map_new = """          }).map(note => (
            <div key={note.id} className={`p-3 rounded-xl border group relative ${note.pinned ? 'bg-amber-50/50 border-amber-200/50' : 'bg-slate-50 border-slate-100'}`}>
              {editingNoteId === note.id ? (
                <div className="flex flex-col gap-2">
                  <textarea 
                    value={editNoteText}
                    onChange={(e) => setEditNoteText(e.target.value)}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 min-h-[4rem]"
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setEditingNoteId(null)}
                      className="p-1.5 bg-white rounded-lg shadow-sm text-slate-400 hover:text-slate-600 transition-colors border border-slate-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => {
                        if (editNoteText.trim()) {
                          updateNote(note.id, editNoteText);
                          setEditingNoteId(null);
                        }
                      }}
                      className="p-1.5 bg-pink-500 rounded-lg shadow-sm text-white hover:bg-pink-600 transition-colors"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-medium pr-20">
                    {note.text}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setEditingNoteId(note.id);
                        setEditNoteText(note.text);
                      }}
                      className="p-1.5 bg-white rounded-lg shadow-sm text-slate-300 hover:text-blue-500 transition-colors"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => togglePin(note.id)}
                      className={`p-1.5 rounded-lg shadow-sm transition-colors ${note.pinned ? 'bg-amber-100 text-amber-600' : 'bg-white text-slate-400 hover:text-amber-500'}`}
                    >
                      <Pin className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => deleteNote(note.id)}
                      className="p-1.5 bg-white rounded-lg shadow-sm text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </>
              )}"""
content = content.replace(map_old, map_new)

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)
print("Updated NotesWidget with editing capabilities")
