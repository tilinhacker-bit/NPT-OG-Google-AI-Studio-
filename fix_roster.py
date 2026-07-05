import re

with open('src/utils/roster.ts', 'r') as f:
    content = f.read()

old_logic = """  // Pre-Duty calculation rule:
  // If yesterday was 'Ord' and today is 'Ord', then today is 'Pre-duty' (for groups not in ANA)
  for (let i = 1; i < roster.length; i++) {
    const today = roster[i];
    const yesterday = roster[i - 1];
    if (['A', 'B', 'C', 'D'].every(g => today.roles[g] !== 'Anes')) {
      ['A', 'B', 'C', 'D'].forEach(g => {
        if (yesterday.roles[g] === 'Ord' && today.roles[g] === 'Ord') {
          today.roles[g] = 'Pre';
        }
      });
    }
  }"""

new_logic = """  // Pre-Duty calculation rule:
  // When there are 4 groups at OBGYN (no one in ANA), the day before Duty is Pre-duty.
  for (let i = 0; i < roster.length - 1; i++) {
    const today = roster[i];
    const tomorrow = roster[i + 1];
    
    // Check if any group is in Anes TODAY
    if (['A', 'B', 'C', 'D'].every(g => today.roles[g] !== 'Anes')) {
      ['A', 'B', 'C', 'D'].forEach(g => {
        if (tomorrow.roles[g] === 'Duty' && today.roles[g] !== 'Off') {
          today.roles[g] = 'Pre';
        }
      });
    }
  }"""

content = content.replace(old_logic, new_logic)

with open('src/utils/roster.ts', 'w') as f:
    f.write(content)
print("Updated Pre-Duty logic")
