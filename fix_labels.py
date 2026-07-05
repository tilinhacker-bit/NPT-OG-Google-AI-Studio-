import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

# Update HO_SHORT_LABELS
old_short = """const HO_SHORT_LABELS: Record<string, string> = {
  Duty: "Duty",
  Pre: "Pre-D",
  Ord: "Ord",
  Off: "NOF",
  Rest: "DOF",
  Anes: "ANA",
};"""

new_short = """const HO_SHORT_LABELS: Record<string, string> = {
  Duty: "DUTY",
  Pre: "PRE-D",
  Ord: "ODIN",
  Off: "N-OFF",
  Rest: "D-OFF",
  Anes: "ANAE",
};"""
content = content.replace(old_short, new_short)

# Update LABELS
old_labels = """const LABELS: { [key: string]: string } = {
  Duty: "Duty",
  Pre: "Pre-Duty",
  Ord: "Ordinary",
  Off: "Night Off",
  Rest: "Day Off",
  Anes: "ANA",
};"""

new_labels = """const LABELS: { [key: string]: string } = {
  Duty: "Duty",
  Pre: "Pre-Duty",
  Ord: "Ordinary",
  Off: "Night Off",
  Rest: "Day Off",
  Anes: "Anaesthesia",
};"""
content = content.replace(old_labels, new_labels)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
