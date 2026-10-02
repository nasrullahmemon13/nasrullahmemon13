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
s = frame(650,'Nasrullah Dilshad — Full-stack developer, Karachi, Pakistan')
s += '''<defs>
<radialGradient id="aura"><stop stop-color="#7547eb" stop-opacity=".45"/><stop offset="1" stop-color="#10121b" stop-opacity="0"/></radialGradient>
<linearGradient id="name" x1="0" x2="1"><stop stop-color="#ffffff"/><stop offset=".5" stop-color="#b6a3ff"/><stop offset="1" stop-color="#64e7d3"/></linearGradient>
<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#8895ff" stroke-opacity=".07"/></pattern>
<clipPath id="bounds"><rect x="2" y="2" width="1196" height="646" rx="28"/></clipPath></defs>
<style>
.ring{transform-origin:958px 278px;animation:spin 22s linear infinite}.reverse{animation-direction:reverse;animation-duration:32s}.float{animation:float 6s ease-in-out infinite}.delay{animation-delay:-3s}.trace{animation:trace 7s linear infinite}.shine{animation:shine 6s ease-in-out infinite}
@keyframes spin{to{transform:rotate(360deg)}}@keyframes float{50%{transform:translateY(-9px)}}@keyframes trace{to{stroke-dashoffset:-800}}@keyframes shine{50%{opacity:.4}}
@media(prefers-reduced-motion:reduce){.ring,.float,.trace,.shine{animation:none}}
</style>
<g clip-path="url(#bounds)"><rect width="1200" height="650" fill="url(#grid)"/><ellipse cx="975" cy="277" rx="380" ry="340" fill="url(#aura)"/>
<path d="M610 110L745 245L670 320L790 440" fill="none" stroke="#7562ac" stroke-opacity=".22"/>
<path class="trace" d="M610 110L745 245L670 320L790 440" fill="none" stroke="#c4a7ff" stroke-width="2" stroke-dasharray="12 388"/>
<circle class="ring" cx="958" cy="278" r="183" fill="none" stroke="#a58bff" stroke-opacity=".7" stroke-dasharray="120 55 4 55"/>
<circle class="ring reverse" cx="958" cy="278" r="166" fill="none" stroke="#62e9d1" stroke-opacity=".55" stroke-dasharray="3 22"/>
<g class="ring"><circle cx="1141" cy="278" r="6" fill="#70ead4"/><circle cx="775" cy="278" r="4" fill="#c5a6ff"/></g>
</g>'''
s += text(48,57,'ND / ENGINEERING',16,'#c5b5ff',700)+text(985,57,'KARACHI · UTC+5',14)
s += '<line x1="48" y1="82" x2="1152" y2="82" stroke="#2c3040"/>'
s += '<path class="flow" d="M48 82 H1152" fill="none" stroke="url(#accent)" stroke-width="2" stroke-dasharray="100 500" opacity=".7"/>'
s += text(48,133,'FULL-STACK WEB DEVELOPER',15,'#7ce6ce',700)
s += text(45,211,'Nasrullah',72,'#f5f3ff',700)+text(45,290,'Dilshad.',72,'url(#name)',700)
s += text(48,324,'Thoughtful interfaces. Reliable systems.',24,'#d1d4df')
s += text(48,359,'Building for the web, from idea to deployment.',20)
s += '<rect x="48" y="389" width="348" height="43" rx="21" fill="#202333" stroke="#373b51"/>'
s += text(68,417,'React / Next.js / Node.js / TypeScript',16,'#d4c8ff')
s += '<defs><clipPath id="portrait"><circle cx="958" cy="278" r="146"/></clipPath></defs>'
s += f'<image x="812" y="118" width="292" height="330" preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait)" href="data:image/jpeg;base64,{photo}"/>'
s += '<circle cx="958" cy="278" r="146" fill="none" stroke="#b49aff" stroke-width="2"/>'
for x,y,label,color,delay in [(745,147,'</> REACT','#7ce6ce',''),(1000,409,'{ } NODE.JS','#c5a6ff',' delay')]:
    s += f'<g class="float{delay}"><rect x="{x}" y="{y}" width="151" height="46" rx="13" fill="#1e2038" stroke="{color}" stroke-opacity=".5"/>'+text(x+17,y+29,label,16,color,700)+'</g>'
s += '<circle class="pulse" cx="862" cy="488" r="5" fill="#7ce6ce"/>'+text(877,494,'BUILD · LEARN · SHIP',14,'#7ce6ce',700)
s += '<rect x="48" y="458" width="632" height="49" rx="12" fill="#161b2a" stroke="#303950"/>'+text(67,489,'> turning ideas into digital experiences_',18,'#7ce6ce')
s += '<line x1="48" y1="536" x2="1152" y2="536" stroke="#2c3040"/>'
for x,label,value in [(48,'FRONTEND','React · Next.js · Tailwind'),(431,'BACKEND','Node.js · Express · MongoDB'),(832,'AI INTEGRATIONS','OpenAI · Gemini · Groq')]:
    s += text(x,570,label,12,'#a29fba',700)+text(x,604,value,18,'#e2e4ec')
s+='</g></svg>'
(ROOT/'assets/profile-hero-orbit-v2.svg').write_text(s,encoding='utf-8')
projects=[('Inside-Hunters-SFC','AI meeting intelligence & document synthesis','Python / Flask / MongoDB'),('LuxuryStay','Full-stack hotel management platform','React / Node.js / MongoDB'),('ElevateX-Fitness','Gym and wellness web portal','Bootstrap / JavaScript'),('Portfolio-N','Personal developer portfolio','JavaScript / Tailwind / Canvas')]
s=frame(530,'Selected projects by Nasrullah Dilshad')+text(48,59,'SELECTED WORK',15,'#7ce6ce',700)+text(48,103,'Ideas, engineered into experiences.',32,'#f5f3ff',700)
for i,(name,desc,stack) in enumerate(projects):
    x=48+(i%2)*564; y=139+(i//2)*178
    s+=f'<rect x="{x}" y="{y}" width="540" height="154" rx="18" fill="#191c28" stroke="#303447"/>'
    s+=f'<rect class="flow" x="{x}" y="{y}" width="540" height="154" rx="18" fill="none" stroke="url(#accent)" stroke-width="1.5" stroke-dasharray="80 520" style="animation-delay:-{i*2}s"/>'
    s+=f'<circle class="pulse" cx="{x+504}" cy="{y+29}" r="5" fill="#7ce6ce" style="animation-delay:-{i}s"/>'
    s+=text(x+24,y+33,f'0{i+1} / PROJECT',12,'#b7a3ff',700)+text(x+24,y+70,name,25,'#f5f3ff',700)+text(x+24,y+101,desc,17)+text(x+24,y+131,stack,14,'#7ce6ce')
s+='</g></svg>'
(ROOT/'assets/selected-work-motion-v2.svg').write_text(s,encoding='utf-8')
old=(ROOT/'README.md').read_text(encoding='utf-8')
docs_start=old.rfind('<details>')
docs=old[docs_start:old.index('</details>', docs_start)+len('</details>')]
readme='''<div align="center">
  <img src="./assets/profile-hero-orbit-v2.svg" width="100%" alt="Nasrullah Dilshad — Full-stack developer. Thoughtful interfaces, reliable systems." />
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

<img src="./assets/selected-work-motion-v2.svg" width="100%" alt="Selected work: Inside-Hunters-SFC, LuxuryStay, ElevateX-Fitness, and Portfolio-N" />

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
for asset in ['profile-hero-orbit-v2.svg','selected-work-motion-v2.svg']:
    ET.parse(ROOT/'assets'/asset)
print('Generated and XML-validated profile assets; preserved repository documentation.')



