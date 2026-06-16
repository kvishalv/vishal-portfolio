# vishalkannankara.com

Personal site for Vishal Kannankara. Plain HTML, CSS, and a little vanilla JavaScript. No build step, no framework, no dependencies — designed to host as static files on Cloudflare Pages.

```
index.html      → all content, one page
styles.css      → design system (light + dark, responsive)
script.js       → terminal, mobile nav, active-section nav, scroll reveals
favicon.svg     → monogram favicon
assets/         → drop headshot.jpg, resume.pdf, og-image.png here (see assets/README.md)
```

## Preview locally

Just open `index.html` in a browser, or serve it:

```bash
cd vishal-portfolio
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repo (e.g. `kvishalv/vishalkannankara.com`).
2. Cloudflare dashboard → Pages → Create → connect the repo.
3. Build settings: **Framework preset = None**, **Build command = (blank)**, **Output directory = `/`**.
4. Add custom domains under the Pages project.

## Domain notes (the cleanup we parked)

- Make **vishalkannankara.com** the canonical domain.
- 301-redirect **kvishalv.com → vishalkannankara.com** (Cloudflare Redirect Rule).
- Add a rule **`www.* → apex`** to fix the current 522 on the www hostnames.

## Before it's live — checklist

- [ ] Add `assets/headshot.jpg` (professional headshot)
- [ ] Add `assets/resume.pdf`
- [ ] Add `assets/og-image.png` (1200×630)
- [ ] Push `kvishalv/brain-stack` public so the Brain Stack "View code" link resolves
- [ ] Confirm the Payment-Agent / Reliable Orders links point where you want (currently your GitHub profile)
