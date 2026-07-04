import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

start_str = '{/* Grand Totals comparison table */}'
end_str = '{/* 5. DYNAMIC PRESET COLOR MODAL */}'

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + content[end_idx:]
    with open('src/App.tsx', 'w') as f:
        f.write(new_content)
    print("Removed remaining admin block successfully")
else:
    print("Could not find admin block.")
