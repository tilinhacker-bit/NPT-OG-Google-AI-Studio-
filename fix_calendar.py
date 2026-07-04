import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

# Add imports
imports = """import React, { useMemo, useState, useRef } from 'react';
import { Heart, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';"""
content = re.sub(r"import React, { useMemo, useState } from 'react';\nimport { Heart } from 'lucide-react';", imports, content)

# Add capture ref and logic
fn_start = """export function CalendarMatrix() {"""
fn_new = """export function CalendarMatrix() {
  const captureRef = useRef<HTMLDivElement>(null);
  
  const handleCapture = async () => {
    if (!captureRef.current) return;
    try {
      const canvas = await html2canvas(captureRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `roster-${calMonth}-2026.png`;
      link.click();
    } catch (err) {
      console.error('Failed to capture screenshot', err);
    }
  };"""
content = content.replace(fn_start, fn_new)

# Add ref to div
div_start = """      <div 
        id="capture-calendar-area" 
        className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative"
      >"""
div_new = """      <div 
        ref={captureRef}
        id="capture-calendar-area" 
        className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative"
      >"""
content = content.replace(div_start, div_new)

# Add capture button
heart_start = """        <Heart className="h-4 w-4 text-pink-500 fill-pink-500/20" />
      </div>"""
heart_new = """        <div className="flex items-center gap-2">
          <button 
            onClick={handleCapture}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
            title="Save as Image"
          >
            <Camera className="h-4 w-4" />
          </button>
          <Heart className="h-4 w-4 text-pink-500 fill-pink-500/20" />
        </div>
      </div>"""
content = content.replace(heart_start, heart_new)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
print("Updated Calendar Matrix with Screenshot")
