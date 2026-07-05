import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Hide Admin Access button for non-Group B members
admin_btn_old = """                  <button
                    onClick={() => setAdminAuthModalOpen(true)}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                  >
                    <Lock className="h-5 w-5 text-amber-500" />{" "}
                    {lang === "en"
                      ? "Admin Access"
                      : "စီမံခန့်ခွဲသူ ဝင်ပေါက် (Admin Access)"}
                  </button>"""

admin_btn_new = """                  {userGroup === "B" && (
                    <button
                      onClick={() => setAdminAuthModalOpen(true)}
                      className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                    >
                      <Lock className="h-5 w-5 text-amber-500" />{" "}
                      {lang === "en"
                        ? "Admin Access"
                        : "စီမံခန့်ခွဲသူ ဝင်ပေါက် (Admin Access)"}
                    </button>
                  )}"""

content = content.replace(admin_btn_old, admin_btn_new)


# Add small text to online/offline indicator
indicator_old = """                  <div
                    className={`w-2.5 h-2.5 rounded-full ${isOnline ? "bg-emerald-500" : "bg-red-500"}`}
                    title={isOnline ? "Online" : "Offline"}
                  />"""

indicator_new = """                  <div className="flex items-center gap-1 ml-1.5 bg-slate-100/70 dark:bg-slate-800/80 px-1.5 py-0.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"}`}
                    />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>"""

content = content.replace(indicator_old, indicator_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
