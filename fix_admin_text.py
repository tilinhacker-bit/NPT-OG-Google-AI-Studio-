import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('''                      {lang === "en"
                        ? "Admin Access"
                        : "စီမံခန့်ခွဲသူ ဝင်ပေါက် (Admin Access)"}''', '                      "Admin Access"')
content = content.replace('''                  {lang === "en"
                    ? "Admin Access"
                    : "စီမံခန့်ခွဲသူ ဝင်ပေါက် (Admin Access)"}''', '                  "Admin Access"')

with open('src/App.tsx', 'w') as f:
    f.write(content)
