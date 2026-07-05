import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

# Add prop to CalendarMatrix
content = content.replace("export function CalendarMatrix() {", "export function CalendarMatrix({ onOpenThemeModal }: { onOpenThemeModal?: () => void }) {")

# Add the Theme button next to the Camera button
old_buttons = """          <div className="flex items-center gap-2">
            <button
              onClick={handleCapture}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-xs shadow-sm transition"
              title="Save Screenshot"
            >
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Save Image</span>
            </button>
            <Heart className="h-4 w-4 text-pink-500 fill-pink-500/20 hidden sm:block" />
          </div>"""

new_buttons = """          <div className="flex items-center gap-2">
            <button
              onClick={onOpenThemeModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 font-bold text-xs shadow-sm transition"
              title="Roster Theme"
            >
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Theme</span>
            </button>
            <button
              onClick={handleCapture}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-xs shadow-sm transition"
              title="Save Screenshot"
            >
              <Camera className="h-4 w-4" />
            </button>
            <Heart className="h-4 w-4 text-pink-500 fill-pink-500/20 hidden sm:block" />
          </div>"""

content = content.replace(old_buttons, new_buttons)
# Make sure Palette is imported in CalendarMatrix
if 'Palette' not in content:
    content = content.replace("Camera,", "Camera, Palette,")

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)

with open('src/App.tsx', 'r') as f:
    app_content = f.read()

# Pass prop
app_content = app_content.replace("<CalendarMatrix />", "<CalendarMatrix onOpenThemeModal={() => setIsColorModalOpen(true)} />")

# Remove the Palette themes button from Settings
themes_btn = """                  <button
                    onClick={() => setIsColorModalOpen(true)}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                  >
                    <Palette className="h-5 w-5 text-pink-500" /> Themes
                  </button>"""
app_content = app_content.replace(themes_btn, "")

with open('src/App.tsx', 'w') as f:
    f.write(app_content)

