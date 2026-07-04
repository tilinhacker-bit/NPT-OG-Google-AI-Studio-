import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

render_start = """  const { notes, addNote, deleteNote, togglePin, setReminder } = useNotesStore();"""
content = content.replace("  const { notes, addNote, deleteNote } = useNotesStore();", render_start)

# Update map function
map_start = """          notes.map(note => ("""
map_end = """          ))"""

sorted_notes = """          notes.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }).map(note => (
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
              </div>
              <div className="text-[9px] text-slate-400 font-bold mt-2 uppercase tracking-wider flex items-center gap-2">
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                {note.reminderDate && (
                  <span className="flex items-center gap-1 text-indigo-500">
                    <CalendarClock className="h-3 w-3" />
                    Reminder set
                  </span>
                )}
              </div>
            </div>
          ))"""

content = re.sub(r"          notes\.map\(note => \(.*?\n          \)\)", sorted_notes, content, flags=re.DOTALL)

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)
print("Updated Notes UI")
