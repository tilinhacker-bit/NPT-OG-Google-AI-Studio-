import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

start_str = '{currentTab === "admin" && isAdminUnlocked && ('
start_idx = content.find(start_str)

if start_idx == -1:
    print("Start not found")
    exit(1)

# search for `{/* COLOR THEME SELECTOR MODAL */}`
end_idx = content.find('{/* COLOR THEME SELECTOR MODAL */}', start_idx)

if end_idx != -1:
    new_content = content[:start_idx] + '''{currentTab === "admin" && isAdminUnlocked && (
              <motion.div 
                key="admin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <AdminAudit onLockDatabase={() => { setIsAdminUnlocked(false); setCurrentTab("dashboard"); }} />
              </motion.div>
            )}

      ''' + content[end_idx:]
    with open('src/App.tsx', 'w') as f:
        f.write(new_content)
    print("Replaced admin successfully")
else:
    print("End not found")
