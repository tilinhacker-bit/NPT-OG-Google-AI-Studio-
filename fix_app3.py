import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Replace "Welcome to NPT OG Hub"
content = content.replace("Welcome to NPT OG Hub", "Welcome to NPT 500 OG Interns")

# 2. Replace "NPT OG Hub"
content = content.replace("NPT OG Hub Roster", "NPT 500 OG Interns Roster")
content = content.replace("NPT OG Hub", "NPT 500 OG Interns")

# 3. Add note about Aug and Sep rosters in CalendarTab.
# Where is the "Calendar tab"?
