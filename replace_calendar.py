import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

start_str = '{currentTab === "calendar" && ('
start_idx = content.find(start_str)

if start_idx == -1:
    print("Start not found")
    exit(1)

# search for `{currentTab === "directory" && (`
end_idx = content.find('{currentTab === "directory" && (', start_idx)

if end_idx != -1:
    new_content = content[:start_idx] + '''{currentTab === "calendar" && (
              <motion.div 
                key="calendar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <CalendarMatrix />
              </motion.div>
            )}

            ''' + content[end_idx:]
    with open('src/App.tsx', 'w') as f:
        f.write(new_content)
    print("Replaced calendar successfully")
else:
    print("End not found")
