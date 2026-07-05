import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { DATA } from '../data';\nimport { useStore } from '../store/useStore';\nimport { masterRoster } from '../utils/roster';\nimport { DATA } from '../data';", "import { useStore } from '../store/useStore';\nimport { masterRoster } from '../utils/roster';\nimport { DATA } from '../data';")

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
print("Removed duplicate DATA import")
