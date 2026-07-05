import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

group_old = """                  <h2 className="text-2xl font-black text-slate-800 mb-2">
                    Select Your Group
                  </h2>
                  <p className="text-slate-500 font-medium mb-6 text-sm">
                    Which roster group are you assigned to?
                  </p>"""

group_new = """                  <h2 className="text-2xl font-black text-slate-800 mb-2">
                    Select Your Group
                  </h2>
                  <p className="text-slate-500 font-medium text-sm">
                    Which roster group are you assigned to?
                  </p>
                  <p className="text-rose-500 font-bold mb-6 text-xs bg-rose-50 p-2 rounded-lg mt-2">
                    ⚠️ Warning: You cannot change this group later. Please select your correct assigned group!
                  </p>"""

content = content.replace(group_old, group_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
