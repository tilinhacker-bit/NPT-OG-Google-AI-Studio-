import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

# Make sure Download is imported
if 'Download' not in content:
    content = content.replace("Camera, Palette,", "Camera, Palette, Download,")
if 'CalendarClock' not in content:
    content = content.replace("Camera, Palette, Download,", "Camera, Palette, Download, CalendarClock,")

ics_func = """  const handleExportICS = () => {
    if (userRole !== "HO" || !userGroup) return;
    
    let icsContent = "BEGIN:VCALENDAR\\r\\nVERSION:2.0\\r\\nPRODID:-//NOGSH Portal 2026//EN\\r\\n";
    
    // Create an event for each duty day in the active month
    activeMonthDays.forEach((day) => {
      const g = userGroup as "A" | "B" | "C" | "D" | "E";
      const roleKey = day[g];
      const roleLabel = LABELS[roleKey] || roleKey;
      
      const dateParts = day.dateStr.split('-');
      const yyyy = dateParts[0];
      const mm = dateParts[1];
      const dd = dateParts[2];
      
      // All day event format: YYYYMMDD
      const dateString = `${yyyy}${mm}${dd}`;
      // Next day for DTEND
      const nextDate = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd) + 1);
      const n_yyyy = nextDate.getFullYear();
      const n_mm = String(nextDate.getMonth() + 1).padStart(2, '0');
      const n_dd = String(nextDate.getDate()).padStart(2, '0');
      const nextDateString = `${n_yyyy}${n_mm}${n_dd}`;
      
      icsContent += "BEGIN:VEVENT\\r\\n";
      icsContent += `DTSTART;VALUE=DATE:${dateString}\\r\\n`;
      icsContent += `DTEND;VALUE=DATE:${nextDateString}\\r\\n`;
      icsContent += `SUMMARY:[${roleKey}] Duty\\r\\n`;
      icsContent += `DESCRIPTION:NOGSH Ward Duty: ${roleLabel}\\r\\n`;
      icsContent += "END:VEVENT\\r\\n";
    });
    
    icsContent += "END:VCALENDAR";
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `NOGSH_Roster_${calMonth}_2026.ics`;
    link.click();
  };"""

content = content.replace('  const handleCapture = async () => {', ics_func + '\n\n  const handleCapture = async () => {')

buttons = """            <button
              onClick={handleCapture}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-xs shadow-sm transition"
              title="Save Screenshot"
            >
              <Camera className="h-4 w-4" />
            </button>"""

new_buttons = """            {userRole === "HO" && (
              <button
                onClick={handleExportICS}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold text-xs shadow-sm transition"
                title="Export to Calendar app"
              >
                <CalendarClock className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={handleCapture}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-xs shadow-sm transition"
              title="Save Screenshot"
            >
              <Camera className="h-4 w-4" />
            </button>"""

content = content.replace(buttons, new_buttons)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
