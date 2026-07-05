import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

reminder_old = """                  (tomorrowRosterDay.roles[userGroup] === "Duty" ||
                    tomorrowRosterDay.roles[userGroup] === "Pre" ||
                    tomorrowRosterDay.roles[userGroup] === "Anes") &&"""

reminder_new = """                  (tomorrowRosterDay.roles[userGroup] === "Duty" ||
                    tomorrowRosterDay.roles[userGroup] === "Pre" ||
                    tomorrowRosterDay.roles[userGroup] === "Ord" ||
                    tomorrowRosterDay.roles[userGroup] === "Anes") &&"""

content = content.replace(reminder_old, reminder_new)

text_old = """                          {tomorrowRosterDay.roles[userGroup] === "Duty"
                            ? "Duty"
                            : tomorrowRosterDay.roles[userGroup] === "Anes"
                              ? "ANA"
                              : "Pre-Duty"}{" "}"""

text_new = """                          {tomorrowRosterDay.roles[userGroup] === "Duty"
                            ? "Duty"
                            : tomorrowRosterDay.roles[userGroup] === "Anes"
                              ? "ANA"
                              : "Ordinary/Pre-Duty"}{" "}"""

content = content.replace(text_old, text_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
