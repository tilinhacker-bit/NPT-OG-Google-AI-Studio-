import re

with open('src/data.ts', 'r') as f:
    content = f.read()

content = content.replace('"Nang Sanda Htun": "နန်းစန္ဒာထွန်း",', '"Nang Sanda Htun": "NSDT",')
content = content.replace('"Nan Sanda Htun": "နန်းစန္ဒာထွန်း",', '"Nan Sanda Htun": "NSDT",')
content = content.replace('"Nan Sanda Tun": "နန်းစန္ဒာထွန်း",', '"Nan Sanda Tun": "NSDT",')
content = content.replace('"Nan Sanda Tun": "NSDT",', '"Nan Sanda Tun": "NSDT",') # just in case

with open('src/data.ts', 'w') as f:
    f.write(content)
