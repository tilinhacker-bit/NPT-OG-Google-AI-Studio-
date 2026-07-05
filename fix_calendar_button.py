import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

# Make the screenshot button more prominent
content = content.replace(
"""        <div className="flex items-center gap-2">
          <button 
            onClick={handleCapture}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
            title="Save as Image"
          >
            <Camera className="h-4 w-4" />
          </button>
          <Heart className="h-4 w-4 text-pink-500 fill-pink-500/20" />
        </div>""",
"""        <div className="flex items-center gap-2">
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
)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
print("Updated Calendar Screenshot Button")
