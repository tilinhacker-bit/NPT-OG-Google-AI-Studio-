import re

with open('src/components/DirectoryTab.tsx', 'r') as f:
    content = f.read()

# Let's fix the end of the file where the syntax error is
bad_end = """          </div>
                </div>
                )}
                {subTab === "useful" && ("""

good_end = """          </div>
        )}
        {subTab === "useful" && ("""

content = content.replace(bad_end, good_end)

with open('src/components/DirectoryTab.tsx', 'w') as f:
    f.write(content)
print("Fixed syntax")
