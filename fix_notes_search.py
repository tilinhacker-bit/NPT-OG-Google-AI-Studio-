import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

search_state = """  const [currentNoteText, setCurrentNoteText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");"""

content = content.replace('  const [currentNoteText, setCurrentNoteText] = useState("");', search_state)

if 'Search' not in content:
    content = content.replace("import {", "import { Search,")

header_old = """      <div className="flex justify-between items-center mb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          My Notes
        </p>
      </div>"""

header_new = """      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
          />
        </div>
      </div>"""

content = content.replace(header_old, header_new)

# filter logic
# it's currently: [...notes].filter((n) => !n.targetDate || n.targetDate <= activeDateStr)
filter_old = ".filter((n) => !n.targetDate || n.targetDate <= activeDateStr)"
filter_new = ".filter((n) => (!n.targetDate || n.targetDate <= activeDateStr) && n.text.toLowerCase().includes(searchQuery.toLowerCase()))"

content = content.replace(filter_old, filter_new)

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)
