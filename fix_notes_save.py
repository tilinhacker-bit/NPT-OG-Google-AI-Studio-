import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

# Add a save button next to the textarea
content = re.sub(
    r'<div className="flex gap-2 mb-4">\s*<textarea\s*value=\{currentNoteText\}\s*onChange=\{e => setCurrentNoteText\(e.target.value\)\}\s*onKeyDown=\{handleNoteKeyDown\}\s*placeholder="Write a new note\.\.\. \(Shift\+Enter to save\)"\s*className="flex-grow p-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 resize-none h-14"\s*/>\s*</div>',
    """      <div className="flex flex-col gap-2 mb-4">
        <textarea 
          value={currentNoteText}
          onChange={e => setCurrentNoteText(e.target.value)}
          onKeyDown={handleNoteKeyDown}
          placeholder="Write a new note..."
          className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 resize-none min-h-[4rem]"
        />
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (currentNoteText.trim()) {
                addNote(currentNoteText);
                setCurrentNoteText("");
              }
            }}
            disabled={!currentNoteText.trim()}
            className="px-4 py-2 bg-pink-500 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Note
          </button>
        </div>
      </div>""",
    content,
    flags=re.DOTALL
)

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)
print("Updated Notes Widget with Save Button")
