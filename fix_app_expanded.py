import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('"as": false,', '"as": true,')
content = content.replace('"ho-super": false,', '"ho-super": true,')

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Updated App expanded state")
