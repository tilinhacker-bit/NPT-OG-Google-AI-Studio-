import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old = """                                      <div key={doc.name} className="flex justify-between items-center">
                                        <span className="font-semibold">⚕️ AS {translateName(doc.name, lang)}</span>
                                        <a 
                                          href={`tel:${doc.phone}`} 
                                          className="bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded font-bold tracking-wider transition flex items-center gap-1 text-[10px]"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <Phone className="h-2.5 w-2.5" /> {doc.phone}
                                        </a>
                                      </div>"""

new = """                                      <div key={doc.name} className="flex flex-col text-[10px]">
                                        <span className="font-semibold">⚕️ AS {translateName(doc.name, lang)}</span>
                                      </div>"""

content = content.replace(old, new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Fixed AS phone in App.tsx")
