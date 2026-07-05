import re

with open('src/data.ts', 'r') as f:
    content = f.read()

# Add PG?: string; to DailyInfo
if 'PG?: string;' not in content:
    content = content.replace("Med_name?: string;", "Med_name?: string;\n  PG?: string;")

# List of July PG dates
pg_dates = ["2026-07-01", "2026-07-05", "2026-07-08", "2026-07-10", "2026-07-13", "2026-07-16", "2026-07-19", "2026-07-23"]

for dt in pg_dates:
    # find the line for the date
    pattern = rf'("{dt}": {{.*?}}),'
    match = re.search(pattern, content)
    if match:
        old_val = match.group(1)
        if '"PG":' not in old_val:
            new_val = old_val.replace('"AS_Group":', '"PG": "Dr. PSH", "AS_Group":')
            content = content.replace(old_val, new_val)

with open('src/data.ts', 'w') as f:
    f.write(content)
