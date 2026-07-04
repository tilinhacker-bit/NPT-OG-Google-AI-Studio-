import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

start_str = '  // Compute master roster 92 days\n  const masterRoster = useMemo<RosterDay[]>(() => {'
end_str = '  // Compute selected Date\n  const activeDate = useMemo(() => {'

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + "  import { masterRoster } from './utils/roster';\n\n" + content[end_idx:]
    with open('src/App.tsx', 'w') as f:
        f.write(new_content)
    print("Removed masterRoster block successfully")
else:
    print("Could not find start or end bounds for masterRoster.")
