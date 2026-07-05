import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Make sure all remaining "NPT OG Hub" are replaced
content = content.replace("NPT OG Hub", "NPT 500 OG Interns")

with open('src/App.tsx', 'w') as f:
    f.write(content)
