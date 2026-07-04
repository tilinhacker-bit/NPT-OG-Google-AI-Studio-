const value = "- ";
const selectionStart = value.length;
const textBeforeCursor = value.substring(0, selectionStart);
const lines = textBeforeCursor.split('\n');
const currentLine = lines[lines.length - 1];
const bulletMatch = currentLine.match(/^(\s*)([-*•]\s|\d+\.\s)/);
console.log(bulletMatch);
if (bulletMatch) {
  if (currentLine.trim() === bulletMatch[2].trim()) {
    console.log("Empty bullet");
  }
}
