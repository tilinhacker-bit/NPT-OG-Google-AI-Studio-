import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

content = content.replace("import html2canvas from 'html2canvas';", "import * as htmlToImage from 'html-to-image';")

fn_start = """    try {
      const canvas = await html2canvas(captureRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `roster-${calMonth}-2026.png`;
      link.click();
    } catch (err) {"""

fn_new = """    try {
      const imgData = await htmlToImage.toPng(captureRef.current, { pixelRatio: 2 });
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `roster-${calMonth}-2026.png`;
      link.click();
    } catch (err) {"""
    
content = content.replace(fn_start, fn_new)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
print("Updated Calendar Screenshot to html-to-image")
