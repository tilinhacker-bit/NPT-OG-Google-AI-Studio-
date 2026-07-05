import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Remove Ordinary Surgeons from AS Team & Ward Round Super Card
ordinary_surgeons_pattern = r'\{\/\* Ordinary Surgeons \*\/\}.*?(?=\{\/\* Ward Round assignments \*\/\})'
# wait, there's no {/* Ward Round assignments */} comment, it is just `{dailyData?.WR && (`
ordinary_surgeons_pattern = r'\{\/\* Ordinary Surgeons \*\/\}.*?(?=\{dailyData\?\.WR && \()'
content = re.sub(ordinary_surgeons_pattern, '', content, flags=re.DOTALL)

# 2. Duty Surgeons -> Duty AS Team
content = content.replace('Duty Surgeons', 'Duty AS Team')

# 3. Remove Settings button
settings_btn_pattern = r'            <button\s+onClick=\{\(\) => setCurrentTab\("settings"\)\}\s+className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition"\s+title="Settings"\s*>\s*<Settings className="h-5 w-5" />\s*</button>'
content = re.sub(settings_btn_pattern, '', content)

# 4. Add privacy note in notes page
notes_page_old = r'<NotesWidget activeDateStr=\{dateStr\} />\s*</div>\s*</motion\.div>\s*\)}'
notes_page_new = r'''<NotesWidget activeDateStr={dateStr} />
                  <p className="text-center text-[10px] text-slate-400 mt-4 font-medium flex items-center justify-center gap-1">
                    <Lock className="h-3 w-3" /> All notes are stored locally on your device. Privacy guaranteed.
                  </p>
                </div>
              </motion.div>
            )}'''
content = re.sub(notes_page_old, notes_page_new, content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
