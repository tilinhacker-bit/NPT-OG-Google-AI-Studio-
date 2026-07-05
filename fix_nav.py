import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_nav = """            <button
              onClick={() => {
                setCurrentTab("directory");
                setIsAdminUnlocked(false);
              }}
              className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
                currentTab === "directory"
                  ? "text-indigo-600 font-black"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Users className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                {lang === "en" ? "Directory" : "စာရင်း"}
              </span>
            </button>

            <div className="relative flex-1 flex justify-center h-full">
              <button
                onClick={() => {
                  setCurrentTab("dashboard");
                  setIsAdminUnlocked(false);
                }}
                className={`absolute bottom-0 flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg border-4 border-white transition-transform transform hover:scale-105 ${
                  currentTab === "dashboard"
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-500 text-white"
                }`}
              >
                <Activity className="h-6 w-6 mb-0.5" />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  Today
                </span>
              </button>
            </div>

            <button
              onClick={() => {
                setCurrentTab("notes");
                setIsAdminUnlocked(false);
              }}
              className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
                currentTab === "notes"
                  ? "text-indigo-600 font-black"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <NotebookPen className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                Notes
              </span>
            </button>"""

new_nav = """            <button
              onClick={() => {
                setCurrentTab("notes");
                setIsAdminUnlocked(false);
              }}
              className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
                currentTab === "notes"
                  ? "text-indigo-600 font-black"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <NotebookPen className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                {lang === "en" ? "Notes" : "မှတ်စုများ"}
              </span>
            </button>

            <div className="relative flex-1 flex justify-center h-full">
              <button
                onClick={() => {
                  setCurrentTab("dashboard");
                  setIsAdminUnlocked(false);
                }}
                className={`absolute bottom-0 flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg border-4 border-white transition-transform transform hover:scale-105 ${
                  currentTab === "dashboard"
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-500 text-white"
                }`}
              >
                <Activity className="h-6 w-6 mb-0.5" />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  Today
                </span>
              </button>
            </div>

            <button
              onClick={() => {
                setCurrentTab("directory");
                setIsAdminUnlocked(false);
              }}
              className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
                currentTab === "directory"
                  ? "text-indigo-600 font-black"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Users className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                {lang === "en" ? "Directory" : "စာရင်း"}
              </span>
            </button>"""

content = content.replace(old_nav, new_nav)

with open('src/App.tsx', 'w') as f:
    f.write(content)
