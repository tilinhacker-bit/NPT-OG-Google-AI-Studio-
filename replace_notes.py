import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# find `<div className="bg-white p-5 rounded-[2.25rem] shadow-sm border border-slate-100 flex flex-col min-h-[16rem] max-h-96">`
start_idx = content.find('<div className="bg-white p-5 rounded-[2.25rem] shadow-sm border border-slate-100 flex flex-col min-h-[16rem] max-h-96">')
if start_idx == -1:
    print("Start not found")
    exit(1)

# search for `</motion.div>` after start_idx
end_idx = content.find('</motion.div>', start_idx)

if end_idx != -1:
    new_content = content[:start_idx] + "  <NotesWidget />\n              " + content[end_idx:]
    with open('src/App.tsx', 'w') as f:
        f.write(new_content)
    print("Replaced successfully")
else:
    print("End not found")
