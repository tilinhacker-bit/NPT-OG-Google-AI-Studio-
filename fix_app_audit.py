import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_audit = """                <AdminAudit
                  onLockDatabase={() => {
                    setIsAdminUnlocked(false);
                    setCurrentTab("dashboard");
                  }}
                />"""

new_audit = """                <AdminAudit
                  activeDateStr={activeDateFormatted}
                  onLockDatabase={() => {
                    setIsAdminUnlocked(false);
                    setCurrentTab("dashboard");
                  }}
                />"""

content = content.replace(old_audit, new_audit)

with open('src/App.tsx', 'w') as f:
    f.write(content)
