import re

with open('src/components/NotesWidget.tsx', 'r') as f:
    content = f.read()

import_old = "import React, { useState } from 'react';"
import_new = "import React, { useState, useEffect } from 'react';"
if import_old in content:
    content = content.replace(import_old, import_new)

effect_code = """
  // Check for notifications
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const now = new Date();
      notes.forEach(note => {
        if (note.reminderDate) {
          const remTime = new Date(note.reminderDate);
          if (now >= remTime && now.getTime() - remTime.getTime() < 60000) {
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Reminder", { body: note.text });
            }
            // Clear reminder after triggering
            setReminder(note.id, null);
          }
        }
      });
    }, 60000);
    
    return () => clearInterval(interval);
  }, [notes, setReminder]);
"""

# Insert effect after notes declaration
state_line = "const [editNoteText, setEditNoteText] = useState(\"\");"
content = content.replace(state_line, state_line + "\n" + effect_code)

with open('src/components/NotesWidget.tsx', 'w') as f:
    f.write(content)
print("Added notifications check")
