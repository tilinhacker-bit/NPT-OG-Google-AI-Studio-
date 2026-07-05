import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

labels_old = """const LABELS: { [key: string]: string } = {
  Duty: "Duty",
  Pre: "Pre-Duty",
  Ord: "Ordinary",
  Off: "Night Off",
  Rest: "Day Off",
  Anes: "ANA",
};"""

labels_new = """const LABELS: { [key: string]: string } = {
  Duty: "Duty",
  Pre: "Ordinary/Pre-Duty",
  Ord: "Ordinary",
  Off: "Night Off",
  Rest: "Day Off",
  Anes: "ANA",
};"""

content = content.replace(labels_old, labels_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
