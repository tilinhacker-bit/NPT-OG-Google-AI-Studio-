import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace("  Sun,\n  Download,\n  Bell\n} from \"lucide-react\";", "  Sun,\n  Bell\n} from \"lucide-react\";")

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Removed duplicate Download import")
