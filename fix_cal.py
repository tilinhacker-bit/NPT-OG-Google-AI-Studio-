import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

labels_old = """const LABELS: { [key: string]: string } = {
  Duty: "Duty",
  Pre: "Pre-Duty",
  Ord: "Ordinary",
  Off: "Night Off",
  Rest: "Day Off",
  Anes: "Anaesthesia",
};"""

labels_new = """const LABELS: { [key: string]: string } = {
  Duty: "Duty",
  Pre: "Ordinary/Pre-Duty",
  Ord: "Ordinary",
  Off: "Night Off",
  Rest: "Day Off",
  Anes: "Anaesthesia",
};"""

content = content.replace(labels_old, labels_new)

legend_old = """              {Object.keys(LABELS).map((k) => {"""
legend_new = """              {Object.keys(LABELS).filter(k => k !== "Ord").map((k) => {"""

content = content.replace(legend_old, legend_new)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
