import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

if 'function getInitials' not in content:
    init_func = """function getInitials(name: string): string {
  let cleanName = name.replace(/Dr\\.?\\s*/ig, '').trim();
  return cleanName.split(/\\s+/).map((part: string) => part[0]?.toUpperCase()).join('');
}

"""
    content = content.replace("export function CalendarMatrix", init_func + "export function CalendarMatrix")

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
