import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

# Add NoteItem component
note_item = """
function NoteItem({
  note,
  togglePin,
  deleteNote,
  updateNote
}: {
  note: Note;
  togglePin: (id: string) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, text: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteText, setEditNoteText] = useState(note.text);
  const [expanded, setExpanded] = useState(false);

  // Check if text is long
  const isLong = note.text.length > 150 || note.text.split('\\n').length > 4;

  if (isEditing) {
    return (
      <div className={`p-4 rounded-xl border flex flex-col gap-3 ${note.pinned ? "bg-amber-50/50 border-amber-200/50" : "bg-slate-50 border-slate-100"}`}>
        <textarea
          value={editNoteText}
          onChange={(e) => setEditNoteText(e.target.value)}
          className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 min-h-[6rem]"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-white rounded-xl shadow-sm text-slate-500 hover:text-slate-700 transition-colors border border-slate-200 font-bold text-xs"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (editNoteText.trim()) {
                updateNote(note.id, editNoteText);
                setIsEditing(false);
              }
            }}
            className="px-4 py-2 bg-pink-500 rounded-xl shadow-sm text-white hover:bg-pink-600 transition-colors font-bold text-xs"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl border flex flex-col gap-3 ${note.pinned ? "bg-amber-50/50 border-amber-200/50" : "bg-slate-50 border-slate-100"}`}>
      <div className="flex flex-col gap-1">
        <div className={`whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-medium ${!expanded && isLong ? 'line-clamp-3' : ''}`}>
          {note.text}
        </div>
        {isLong && (
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="text-xs font-bold text-indigo-500 self-start mt-1 hover:text-indigo-600"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 mt-1">
        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
          <span>{new Date(note.createdAt).toLocaleDateString()}</span>
          {note.reminderDate && (
            <span className="flex items-center gap-1 text-indigo-500">
              <CalendarClock className="h-3 w-3" />
              Reminder set
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => togglePin(note.id)}
            className={`p-2 rounded-lg transition-colors ${note.pinned ? "bg-amber-100 text-amber-600" : "bg-white text-slate-400 hover:text-amber-500 shadow-sm border border-slate-100"}`}
            aria-label="Pin Note"
          >
            <Pin className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditNoteText(note.text);
            }}
            className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-400 hover:text-blue-500 transition-colors"
            aria-label="Edit Note"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-400 hover:text-red-500 transition-colors"
            aria-label="Delete Note"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

"""

if 'function NoteItem' not in content:
    content = content.replace("export function NotesWidget", note_item + "export function NotesWidget")

# Update NotesWidget map section to use NoteItem
# Finding the map:
import re
map_old_pattern = r'\.map\(\(note\) => \(\s*<div\s*key=\{note\.id\}.*?</div>\s*\)\)'

# Wait, the content inside map is multiline and complex. Let's just do a manual string replace or use regex with DOTALL
map_old = re.search(r'\.map\(\(note\) => \(\s*<div\s*key=\{note\.id\}.*?</div>\s*\)\)', content, re.DOTALL)
if map_old:
    map_new = """.map((note) => (
              <NoteItem 
                key={note.id} 
                note={note} 
                togglePin={togglePin} 
                deleteNote={deleteNote} 
                updateNote={updateNote} 
              />
            ))"""
    content = content.replace(map_old.group(0), map_new)

# Remove unused states from NotesWidget if they exist
content = content.replace('const [editingNoteId, setEditingNoteId] = useState<string | null>(null);', '')
content = content.replace('const [editNoteText, setEditNoteText] = useState("");', '')

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)

