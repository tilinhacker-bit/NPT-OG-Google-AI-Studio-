import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace About text
about_old = """                <p className="text-slate-600 font-medium text-sm mb-6 leading-relaxed">
                  Version 1.0.0 <br />
                  <br />
                  Developed by <strong>Yawnaka Rajah</strong>
                  <br />
                  <span className="text-xs text-slate-500">
                    For any improvements or suggestions, please contact on
                    Telegram: <strong>@yawnakarajah</strong>
                  </span>
                  <br />
                  <br />
                  Tailored exactly to O&G July-September Q3 ward duties. Offline
                  support enabled.
                </p>"""

about_new = """                <p className="text-slate-600 font-medium text-sm mb-6 leading-relaxed">
                  Version 1.0.0 <br />
                  <br />
                  Yawnaka Rajah created this app with love for 2026 house officers from 500-bedded Naypyidaw ObGyn Specialist Hospital.
                  <br /><br />
                  <span className="text-xs text-slate-500">
                    Reach me on Telegram:{' '}
                    <a href="https://t.me/yawnakarajah" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline">
                      @yawnakarajah
                    </a>
                  </span>
                  <br />
                  <br />
                  A clinical ward organizer tailored for Q3 duties. Offline support enabled.
                </p>"""
content = content.replace(about_old, about_new)

# Add Note to Calendar tab
cal_old = """                <CalendarMatrix />
              </motion.div>"""
cal_new = """                <CalendarMatrix />
                <p className="text-center text-[10px] text-slate-400 mt-2 font-medium px-4">
                  Note: August and September rosters are algorithmic projections based on July's official roster.
                </p>
              </motion.div>"""
content = content.replace(cal_old, cal_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
