with open('src/App.tsx', 'r') as f:
    content = f.read()

# I will insert `          </AnimatePresence>\n        </div>\n` right before `{/* 7. BOTTOM NAVIGATION BAR */}` if not exists

content = content.replace('{/* 7. BOTTOM NAVIGATION BAR */}', '          </AnimatePresence>\n        </div>\n\n      {/* 7. BOTTOM NAVIGATION BAR */}')

with open('src/App.tsx', 'w') as f:
    f.write(content)
