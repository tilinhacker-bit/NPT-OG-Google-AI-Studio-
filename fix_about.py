import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_about = r"""                <p className="text-slate-600 font-medium text-sm mb-6 leading-relaxed">\s*Version 1\.0\.0 <br />\s*<br />\s*Yawnaka Rajah created this app with love for 2026 house\s*officers from 500-bedded Naypyidaw ObGyn Specialist Hospital\.\s*<br />\s*<br />\s*<span className="text-xs text-slate-500">\s*Reach me on Telegram:\{" "\}\s*<a\s*href="https://t\.me/yawnakarajah"\s*target="_blank"\s*rel="noreferrer"\s*className="text-indigo-600 font-bold hover:underline"\s*>\s*@yawnakarajah\s*</a>\s*</span>\s*<br />\s*<br />A clinical ward organizer tailored for Q3 duties\.\s*Offline support enabled\.\s*</p>"""

new_about = """                <div className="text-slate-600 font-medium text-sm mb-6 leading-relaxed text-left space-y-4">
                  <div className="text-center">
                    <p className="font-bold text-slate-800">Version 1.0.0</p>
                  </div>
                  <div>
                    <p><strong>Developed by:</strong> Yawnaka Rajah</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <p className="mb-2">For any issues, feedback, or suggestions, reach me on Telegram:</p>
                    <a
                      href="https://t.me/yawnakarajah"
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                    >
                      @yawnakarajah
                    </a>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">About this App</p>
                    <p className="text-xs">
                      A comprehensive clinical ward organizer specifically tailored for Q3 duties (July - September). It features an intelligent roster calendar, a secure local notes system, and offline capabilities to ensure seamless access to critical scheduling data during active ward rounds.
                    </p>
                  </div>
                </div>"""

content = re.sub(old_about, new_about, content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
