import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

if 'function getInitials' not in content:
    init_func = """function getInitials(name: string): string {
  let cleanName = name.replace(/Dr\\.?\\s*/ig, '').trim();
  return cleanName.split(/\\s+/).map((part: string) => part[0]?.toUpperCase()).join('');
}

"""
    content = content.replace("function CalendarMatrix", init_func + "export function CalendarMatrix")

old_map = """(DATA.as_directory[DATA.dailyInfo[selectedDay.dateStr].AS_Group.replace('Group ', '') as keyof typeof DATA.as_directory] || []).map((doc: any) => translateName(doc.name, lang)).join(', ')"""
new_map = """(DATA.as_directory[DATA.dailyInfo[selectedDay.dateStr].AS_Group.replace('Group ', '') as keyof typeof DATA.as_directory] || []).map((doc: any) => lang === 'mm' ? translateName(doc.name, lang) : "Dr. " + getInitials(doc.name)).join(', ')"""

content = content.replace(old_map, new_map)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
