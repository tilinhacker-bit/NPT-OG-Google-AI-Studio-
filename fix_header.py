import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace setSettingsModalOpen(true) in dashboard header
old_btn = """            <button 
              onClick={() => setSettingsModalOpen(true)}
              className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>"""

new_btn = """            <button 
              onClick={() => setCurrentTab("settings")}
              className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>"""

content = content.replace(old_btn, new_btn)

with open('src/App.tsx', 'w') as f:
    f.write(content)
