import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Remove the incorrectly placed `</AnimatePresence>\n        </div>\n`
content = content.replace('          </AnimatePresence>\n        </div>\n\n      {/* 7. BOTTOM NAVIGATION BAR */}', '      {/* 7. BOTTOM NAVIGATION BAR */}')

# 2. Insert it before `{/* 5. DYNAMIC PRESET COLOR MODAL */}`
content = content.replace('{/* 5. DYNAMIC PRESET COLOR MODAL */}', '          </AnimatePresence>\n        </div>\n\n      {/* 5. DYNAMIC PRESET COLOR MODAL */}')

with open('src/App.tsx', 'w') as f:
    f.write(content)
