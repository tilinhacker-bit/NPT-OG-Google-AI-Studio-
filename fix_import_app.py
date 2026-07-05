import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

if 'isWeekend' in content and 'import { isWeekend' not in content:
    content = content.replace(
        'import { masterRoster } from "./utils/roster";',
        'import { masterRoster } from "./utils/roster";\nimport { isWeekend, isHoliday } from "./utils/dateLogic";'
    )
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Fixed imports")
