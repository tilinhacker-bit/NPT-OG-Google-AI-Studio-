import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

content = content.replace("const { userRole, userGroup, theme } = useStore();", "const { userRole, userGroup, theme, lang } = useStore();")

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
print("Fixed lang")
