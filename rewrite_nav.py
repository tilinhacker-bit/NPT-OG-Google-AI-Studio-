import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace the whole nav element
nav_old = re.search(r'(<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-\[0_-10px_40px_rgba\(0,0,0,0\.04\)] z-40 pb-safe">.*?</nav>)', content, re.DOTALL).group(1)

nav_new = """<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] z-40 pb-safe px-2">
        <div className="max-w-2xl mx-auto flex justify-between items-end pb-2 pt-2">
          
          <button 
            onClick={() => {
              setCurrentTab("calendar");
              setIsAdminUnlocked(false);
            }} 
            className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
              currentTab === "calendar" ? "text-indigo-600 font-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Roster</span>
          </button>

          <button 
            onClick={() => {
              setCurrentTab("directory");
              setIsAdminUnlocked(false);
            }} 
            className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
              currentTab === "directory" ? "text-indigo-600 font-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Directory</span>
          </button>

          <div className="relative flex-1 flex justify-center h-full">
            <button 
              onClick={() => {
                setCurrentTab("dashboard");
                setIsAdminUnlocked(false);
              }} 
              className={`absolute bottom-0 flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg border-4 border-white transition-transform transform hover:scale-105 ${
                currentTab === "dashboard" ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white"
              }`}
            >
              <Activity className="h-6 w-6 mb-0.5" />
              <span className="text-[8px] font-black uppercase tracking-widest">Today</span>
            </button>
          </div>

          <button 
            onClick={() => {
              setCurrentTab("notes");
              setIsAdminUnlocked(false);
            }} 
            className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
              currentTab === "notes" ? "text-indigo-600 font-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <NotebookPen className="h-5 w-5" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Notes</span>
          </button>

          <button 
            onClick={() => {
              setCurrentTab("settings");
              setIsAdminUnlocked(false);
            }} 
            className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
              currentTab === "settings" ? "text-indigo-600 font-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Settings className="h-5 w-5" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Settings</span>
          </button>

        </div>
      </nav>"""

content = content.replace(nav_old, nav_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
