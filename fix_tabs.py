import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Remove NotesWidget from dashboard
content = content.replace("<NotesWidget activeDateStr={dateStr} />", "")

# Add Notes and Settings tabs right after Calendar tab and Directory tab
tabs_insert = """            {currentTab === "notes" && (
              <motion.div 
                key="notes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-4">
                    <NotebookPen className="h-6 w-6 text-indigo-500" /> My Notes
                  </h3>
                  <NotesWidget activeDateStr={dateStr} />
                </div>
              </motion.div>
            )}
            
            {currentTab === "settings" && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 pb-12"
              >
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-4">
                    <Settings className="h-6 w-6 text-slate-500" /> Settings
                  </h3>
                  
                  <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col gap-3">
                    <div className="flex items-center gap-3 font-black text-slate-700">
                      <Languages className="h-5 w-5 text-indigo-500" /> Choose Language
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setLang("en")}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${lang === "en" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        English
                      </button>
                      <button 
                        onClick={() => setLang("mm")}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${lang === "mm" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        မြန်မာ (Myanmar)
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col gap-3">
                    <div className="flex items-center gap-3 font-black text-slate-700">
                      <Moon className="h-5 w-5 text-indigo-500" /> Appearance
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsDarkMode(false)}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${!isDarkMode ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        <Sun className="h-4 w-4 inline-block mr-1" /> Light
                      </button>
                      <button 
                        onClick={() => setIsDarkMode(true)}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${isDarkMode ? "bg-slate-800 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        <Moon className="h-4 w-4 inline-block mr-1" /> Dark
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsColorModalOpen(true)}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                  >
                    <Palette className="h-5 w-5 text-pink-500" /> Themes
                  </button>
                  <button 
                    onClick={() => setInstallModalOpen(true)}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                  >
                    <Smartphone className="h-5 w-5 text-emerald-500" /> Install App
                  </button>
                  <button 
                    onClick={() => setAdminAuthModalOpen(true)}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                  >
                    <Lock className="h-5 w-5 text-amber-500" /> Admin Access
                  </button>
                  <button 
                    onClick={() => setAboutModalOpen(true)}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                  >
                    <Info className="h-5 w-5 text-amber-500" /> About App
                  </button>
                  <button 
                    onClick={() => setAppTutorialOpen(true)}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                  >
                    <HelpCircle className="h-5 w-5 text-purple-500" /> App Tutorial
                  </button>
                  <button 
                    onClick={() => resetOnboarding()}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-red-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-red-50/50 transition flex items-center gap-3 text-red-600"
                  >
                    <LogOut className="h-5 w-5 text-red-500" /> Change Role / Logout
                  </button>
                </div>
              </motion.div>
            )}"""

content = content.replace(
"""            {currentTab === "directory" && (
              <motion.div""",
tabs_insert + """\n            {currentTab === "directory" && (
              <motion.div""")

with open('src/App.tsx', 'w') as f:
    f.write(content)
