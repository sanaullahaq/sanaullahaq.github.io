# Sanaulla Haq — Portfolio Site

A static personal portfolio site: plain HTML/CSS, with the interactive bits
written in TypeScript and pre-compiled to plain JavaScript. No build step is
needed to host it — GitHub Pages just serves the files as-is.

## Structure

```
portfolio/
├── index.html          ← all page content
├── styles.css           ← all styling
├── script.js             ← compiled output (what the browser actually loads)
├── src/
│   └── main.ts           ← TypeScript source (edit THIS, not script.js)
├── tsconfig.json         ← compiler config
├── build.sh              ← recompiles src/main.ts → script.js
├── package.json
└── Sanaulla_Haq_CV.pdf   ← linked from the "Download CV" button
```

## Editing content

Almost everything (bio, experience, projects, skills, contact links) lives
directly in `index.html` as plain text/HTML — no templating, just edit it and
save. Colors, fonts, and spacing live in `styles.css` under `:root` at the top
(the `--accent`, `--bg`, etc. variables).

## Editing the interactive behavior (TypeScript)

The site has a few small enhancements written in TypeScript:
- scroll-triggered fade-ins for sections
- highlighting the active nav "route" as you scroll
- a back-to-top button
- auto-updating the footer year

To change any of this:

1. Edit `src/main.ts`
2. Recompile:
   ```bash
   npm install     # only needed once
   npm run build   # or: bash build.sh
   ```
3. This regenerates `script.js`. Commit both files.

**Do not hand-edit `script.js` directly** — it will be overwritten next time
someone runs the build.

## Hosting on GitHub Pages

1. Create a new GitHub repo named **exactly** `sanaullahaq.github.io`
   (must match your GitHub username precisely — this is what tells GitHub
   Pages to auto-host it as a user site).
2. Push all these files to the `main` branch:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/sanaullahaq/sanaullahaq.github.io.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, and under "Build and deployment"
   confirm the source is set to **Deploy from a branch**, branch `main`,
   folder `/ (root)`. (For a `username.github.io` repo this is usually
   already the default.)
4. Wait 1–2 minutes, then visit **https://sanaullahaq.github.io** — it should
   be live.

## Updating the site later

Any push to `main` redeploys automatically within a minute or two — no
extra steps needed.

## Optional: custom domain

If you buy a domain later:
1. Add a file named `CNAME` (no extension) in the repo root containing just
   your domain, e.g. `sanaullahaq.dev`
2. At your domain registrar, add a `CNAME` record pointing to
   `sanaullahaq.github.io`
3. Back in **Settings → Pages**, enter the custom domain and enable
   "Enforce HTTPS" once it's verified.
