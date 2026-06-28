# Nasrullah Dilshad — Portfolio (Aurora / Advanced Edition)

## Files
- `index.html` — the page
- `css/style.css` — compiled Tailwind CSS (ready to use, no build step needed to view it)
- `css/input.css` — Tailwind source + all custom animation CSS (edit this, then rebuild)
- `js/script.js` — core animations: preloader, constellation canvas, custom cursor, magnetic
  buttons, scroll reveals, animated counters, skill bars, 3D tilt card, timeline draw, marquee,
  mobile menu, parallax blobs, button ripple, cursor spotlight, letter-stagger heading
- `js/chatbot.js` — a small rule-based JavaScript chatbot ("ND-Bot") that answers visitor
  questions about skills, the LuxuryStay project, education and contact info
- `assets/cv/Nasrullah-Dilshad-CV.pdf` — downloadable resume (linked from the navbar, hero,
  contact section, mobile menu, and footer)
- `assets/img/project-*.svg` — stylized preview "screenshots" of the LuxuryStay project. These
  are illustrative mockups, not real screenshots (I couldn't pull actual ones from the repo) —
  swap in real PNG/JPG screenshots anytime by replacing these files or updating the `<img src>`
  paths in the Work section of `index.html`.
- `tailwind.config.js` / `package.json` — only needed if you want to rebuild the CSS

## New in this version
- Real project preview gallery in the Work section
- GitHub + LinkedIn links throughout (nav isn't cluttered, but hero/contact/footer have them)
- "Download CV" button in the navbar, hero, contact section, mobile menu and footer
- ND-Bot — a simple JS chatbot (bottom-right bubble) for quick visitor Q&A
- Extra animation layer: parallax background blobs, button ripple clicks, a soft cursor
  spotlight, and a letter-by-letter stagger on the hero heading

## How to use
Open `index.html` in a browser, or upload the whole folder to GitHub Pages / Netlify / Vercel.

## To edit & rebuild the CSS later
```
npm install -D tailwindcss@3
npx tailwindcss -i ./css/input.css -o ./css/style.css --minify
```

## Notes
- Respects `prefers-reduced-motion` (cursor, canvas, tilt, parallax, chat animations all turn off).
- Custom cursor and tilt effects are desktop-only (disabled on touch devices).
- ND-Bot runs entirely in the browser — no API key, no server, no data leaves the page.
- All content (skills, project, education, contact) is pulled directly from your CV.

