import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

# Match the handleExportICS function and remove it
func_pattern = re.compile(r'  const handleExportICS = \(\) => \{.*?\n  };\n', re.DOTALL)
content = func_pattern.sub('', content)

# Match the button and remove it
button_pattern = re.compile(r'            \{userRole === "HO" && \(\n              <button\n                onClick=\{handleExportICS\}.*?\n              </button>\n            \)}\n', re.DOTALL)
content = button_pattern.sub('', content)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
