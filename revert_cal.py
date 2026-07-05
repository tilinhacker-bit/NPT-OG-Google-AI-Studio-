import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

content = content.replace('''              {m === 7
                ? lang === "en"
                  ? "July"
                  : "ဇူလိုင်"
                : m === 8
                  ? lang === "en"
                    ? "August"
                    : "ဩဂုတ်"
                  : lang === "en"
                    ? "September"
                    : "စက်တင်ဘာ"}{" "}
              2026''', '              {m === 7 ? "July" : m === 8 ? "August" : "September"} 2026')

content = content.replace('''              {calMonth === 7
                ? lang === "en"
                  ? "July"
                  : "ဇူလိုင်"
                : calMonth === 8
                  ? lang === "en"
                    ? "August"
                    : "ဩဂုတ်"
                  : lang === "en"
                    ? "September"
                    : "စက်တင်ဘာ"}{" "}''', '''              {calMonth === 7
                ? "July"
                : calMonth === 8
                  ? "August"
                  : "September"}{" "}''')

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
