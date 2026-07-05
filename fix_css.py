import re

with open('src/index.css', 'r') as f:
    content = f.read()

# Add amoled colors
amoled_css = """
.amoled body {
  background-color: #000000 !important;
  color: #e2e8f0;
}
.amoled .bg-white, .amoled.dark .bg-white { background-color: #09090b !important; }
.amoled .bg-slate-50, .amoled.dark .bg-slate-50 { background-color: #000000 !important; }
.amoled .bg-slate-100, .amoled.dark .bg-slate-100 { background-color: #18181b !important; }
.amoled .border-slate-100, .amoled.dark .border-slate-100 { border-color: #27272a !important; }
.amoled .border-slate-200, .amoled.dark .border-slate-200 { border-color: #3f3f46 !important; }
.amoled .bg-slate-50\/50, .amoled.dark .bg-slate-50\/50 { background-color: rgba(0, 0, 0, 0.5) !important; }
.amoled .bg-slate-50\/80, .amoled.dark .bg-slate-50\/80 { background-color: rgba(0, 0, 0, 0.8) !important; }
.amoled .bg-white\/60, .amoled.dark .bg-white\/60 { background-color: rgba(9, 9, 11, 0.6) !important; }

"""
content += amoled_css

with open('src/index.css', 'w') as f:
    f.write(content)
