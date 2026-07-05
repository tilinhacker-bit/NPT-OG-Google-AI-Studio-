import re

with open('src/components/DirectoryTab.tsx', 'r') as f:
    content = f.read()

# Fix the syntax error at the end
content = content.replace("                </div>\n                )}\n                {subTab === \"useful\" && (", "                </div>\n                )}\n                {subTab === \"useful\" && (")
# Let's just rewrite the return statement properly

with open('src/components/DirectoryTab.tsx', 'w') as f:
    f.write(content)
