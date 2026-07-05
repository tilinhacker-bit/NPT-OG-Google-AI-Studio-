import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace("}\n  Camera,\n  CalendarClock,\n} from \"lucide-react\";", "  Camera,\n  CalendarClock,\n} from \"lucide-react\";")
content = content.replace("  Bell\n}   Camera,\n  CalendarClock,\n} from \"lucide-react\";", "  Bell,\n  Camera,\n  CalendarClock\n} from \"lucide-react\";")

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Updated icons")
