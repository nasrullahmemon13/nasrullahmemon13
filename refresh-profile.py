from pathlib import Path
from html import escape
import base64
import xml.etree.ElementTree as ET

ROOT = Path(__file__).parent
def text(x,y,value,size=18,color='#a6adbf',weight=400):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}">{escape(value)}</text>'
def frame(height,label):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{height}" viewBox="0 0 1200 {height}" role="img" aria-label="{label}">
<title>{label}</title><defs><linearGradient id="accent"><stop stop-color="#b7a3ff"/><stop offset="1" stop-color="#7ce6ce"/></linearGradient><radialGradient id="wash"><stop stop-color="#8270bd" stop-opacity=".18"/><stop offset="1" stop-color="#8270bd" stop-opacity="0"/></radialGradient></defs>
<style>text{{font-family:Arial,Helvetica,sans-serif}}.mono{{font-family:Consolas,monospace}}.orbit{{transform-origin:1000px 160px;animation:rotate 36s linear infinite}}.flow{{animation:flow 12s linear infinite}}@keyframes flow{{to{{stroke-dashoffset:-600}}}}.pulse{{animation:pulse 5s ease-in-out infinite}}@keyframes rotate{{to{{transform:rotate(360deg)}}}}@keyframes pulse{{50%{{opacity:.45}}}}@media(prefers-reduced-motion:reduce){{.orbit,.pulse,.flow{{animation:none}}}}</style>
<rect x="1" y="1" width="1198" height="{height-2}" rx="28" fill="#10121b" stroke="#2c3040"/><g>'''
photo = base64.b64encode((ROOT/'assets/img/nasrullah-dilshad.jpg').read_bytes()).decode()
s = frame(580,'Nasrullah Dilshad — Full-stack developer, Karachi, Pakistan')
s += '<ellipse cx="1000" cy="150" rx="360" ry="320" fill="url(#wash)"/>'
s += text(48,57,'ND / ENGINEERING',16,'#c5b5ff',700)+text(985,57,'KARACHI · UTC+5',14)
s += '<line x1="48" y1="82" x2="1152" y2="82" stroke="#2c3040"/>'
s += '<path class="flow" d="M48 82 H1152" fill="none" stroke="url(#accent)" stroke-width="2" stroke-dasharray="100 500" opacity=".7"/>'
s += text(48,133,'FULL-STACK WEB DEVELOPER',15,'#7ce6ce',700)
s += text(45,204,'Nasrullah',66,'#f5f3ff',700)+text(45,276,'Dilshad.',66,'#f5f3ff',700)
s += text(48,324,'Thoughtful interfaces. Reliable systems.',24,'#d1d4df')
s += text(48,359,'Building for the web, from idea to deployment.',20)
s += '<rect x="48" y="389" width="348" height="43" rx="21" fill="#202333" stroke="#373b51"/>'
s += text(68,417,'React / Next.js / Node.js / TypeScript',16,'#d4c8ff')
s += '<defs><clipPath id="portrait"><rect x="846" y="111" width="290" height="322" rx="22"/></clipPath></defs>'
s += f'<image x="846" y="111" width="290" height="322" preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait)" href="data:image/jpeg;base64,{photo}"/>'
s += '<rect x="846" y="111" width="290" height="322" rx="22" fill="none" stroke="#555067"/>'
s += '<circle class="pulse" cx="862" cy="459" r="5" fill="#7ce6ce"/>'+text(877,465,'BUILDING · LEARNING · SHIPPING',13,'#7ce6ce',700)
s += '<line x1="48" y1="486" x2="1152" y2="486" stroke="#2c3040"/>'
for x,label,value in [(48,'FRONTEND','React · Next.js · Tailwind'),(431,'BACKEND','Node.js · Express · MongoDB'),(832,'AI INTEGRATIONS','OpenAI · Gemini · Groq')]:
    s += text(x,516,label,12,'#8a91a6',700)+text(x,547,value,18,'#e2e4ec')
s+='</g></svg>'
(ROOT/'assets/profile-hero.svg').write_text(s,encoding='utf-8')
projects=[('Inside-Hunters-SFC','AI meeting intelligence & document synthesis','Python / Flask / MongoDB'),('LuxuryStay','Full-stack hotel management platform','React / Node.js / MongoDB'),('ElevateX-Fitness','Gym and wellness web portal','Bootstrap / JavaScript'),('Portfolio-N','Personal developer portfolio','JavaScript / Tailwind / Canvas')]
s=frame(530,'Selected projects by Nasrullah Dilshad')+text(48,59,'SELECTED WORK',15,'#7ce6ce',700)+text(48,103,'Ideas, engineered into experiences.',32,'#f5f3ff',700)
for i,(name,desc,stack) in enumerate(projects):
    x=48+(i%2)*564; y=139+(i//2)*178
    s+=f'<rect x="{x}" y="{y}" width="540" height="154" rx="18" fill="#191c28" stroke="#303447"/>'
    s+=text(x+24,y+33,f'0{i+1} / PROJECT',12,'#b7a3ff',700)+text(x+24,y+70,name,25,'#f5f3ff',700)+text(x+24,y+101,desc,17)+text(x+24,y+131,stack,14,'#7ce6ce')
s+='</g></svg>'
(ROOT/'assets/selected-work.svg').write_text(s,encoding='utf-8')
old=(ROOT/'README.md').read_text(encoding='utf-8')
docs_start=old.rfind('<details>')
docs=old[docs_start:old.index('</details>', docs_start)+len('</details>')]
readme='''<div align="center">
  <img src="./assets/profile-hero.svg" width="100%" alt="Nasrullah Dilshad — Full-stack developer. Thoughtful interfaces, reliable systems." />
</div>

<p align="center">
  <a href="https://www.linkedin.com/in/nasrullah-dilshad-6419a734a">LinkedIn</a> &nbsp; / &nbsp;
  <a href="mailto:nasrullahdilshad0@gmail.com">Email</a> &nbsp; / &nbsp;
  <a href="./assets/cv/Nasrullah-Dilshad-CV.pdf">Resume</a> &nbsp; / &nbsp;
  <a href="https://orcid.org/0009-0007-7736-7248">ORCID</a>
</p>

### A little about me

I'm Nasrullah, a full-stack web developer based in Karachi, Pakistan. I build responsive interfaces, backend APIs, and AI-powered web experiences. I care about clean code, useful products, and learning through building.

- **Frontend:** JavaScript, TypeScript, React, Next.js, Tailwind CSS
- **Backend:** Node.js, Express, Python, Flask, REST APIs
- **Data & tools:** MongoDB, Mongoose, SQLite, Git, Postman, Figma
- **Education:** BS in Computer Science (VU) · ADSE (Aptech)

<img src="./assets/selected-work.svg" width="100%" alt="Selected work: Inside-Hunters-SFC, LuxuryStay, ElevateX-Fitness, and Portfolio-N" />

| Project | Explore |
| :--- | :--- |
| Inside-Hunters-SFC — AI meeting intelligence | [View repository](https://github.com/nasrullahmemon13/Inside-Hunters-SFC) |
| LuxuryStay — Hotel management | [Browse my repositories](https://github.com/nasrullahmemon13?tab=repositories) |
| ElevateX-Fitness — Fitness web portal | [View repository](https://github.com/nasrullahmemon13/ElevateX-Fitness) |
| Portfolio-N — Developer portfolio | [View repository](https://github.com/nasrullahmemon13/Portfolio-N) |

<details>
<summary><b>Contribution activity</b></summary>
<br />
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nasrullahmemon13/nasrullahmemon13/output/github-contribution-grid-snake-dark.svg" />
  <img width="100%" src="https://raw.githubusercontent.com/nasrullahmemon13/nasrullahmemon13/output/github-contribution-grid-snake.svg" alt="Animated GitHub contribution grid" />
</picture>
</details>

'''+docs+'''

<p align="center"><sub>Nasrullah Dilshad · Building with intention.</sub></p>
'''
(ROOT/'README.md').write_text(readme,encoding='utf-8')
for asset in ['profile-hero.svg','selected-work.svg']:
    ET.parse(ROOT/'assets'/asset)
print('Generated and XML-validated profile assets; preserved repository documentation.')


