import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

start_str = '  // Calendar render prep\n  const calendarPadding = useMemo(() => {'
end_str = '  return (\n    <div className="min-h-screen pb-28 font-sans">'

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + content[end_idx:]
    with open('src/App.tsx', 'w') as f:
        f.write(new_content)
    print("Removed cal prep block successfully")
else:
    print("Could not find cal prep block.")
