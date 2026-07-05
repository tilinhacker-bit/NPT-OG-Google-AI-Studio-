import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

old_header = """            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              NPT 500 OG Interns Roster •{" "}
              {calMonth === 7
                ? "July"
                : calMonth === 8
                  ? "August"
                  : "September"}
            </h3>"""

new_header = """            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              {calMonth === 7
                ? "July"
                : calMonth === 8
                  ? "August"
                  : "September"} Roster
            </h3>"""

content = content.replace(old_header, new_header)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)

