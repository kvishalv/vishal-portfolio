# kvishalv.com

Personal site for Vishal Kannankara. Plain HTML, CSS, and a little vanilla JavaScript. No build step, no framework, no dependencies — designed to host as static files on Cloudflare Pages.

```
index.html      → all content, one page
404.html        → page for unknown paths (Cloudflare Pages returns it with status 404)
styles.css      → design system (light + dark, responsive)
script.js       → terminal, mobile nav, active-section nav, scroll reveals
favicon.svg     → monogram favicon
robots.txt      → crawl rules, AI crawler rules and Content-Signal preferences
sitemap.xml     → canonical URL list (update <lastmod> when content changes)
_headers        → Cloudflare Pages response headers (security headers, Link header)
index.md        → Markdown copy of the home page for AI agents; keep it in step with index.html
functions/      → _middleware.js serves index.md for "/" when the request accepts text/markdown
_routes.json    → runs the function only for "/" (and hides /functions/*)
assets/         → headshot.jpg + headshot.webp, og-image.png (1200×630 link preview)
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

## Domains

- **kvishalv.com** is the canonical domain (`<link rel="canonical">`, sitemap, robots.txt).
- **vishalkannankara.com** 301-redirects to kvishalv.com.
- **www.kvishalv.com** still serves the page itself. Add a Cloudflare Redirect Rule `www.kvishalv.com/* → https://kvishalv.com/${1}` (301) so there is one URL. `_redirects` cannot redirect between hostnames.

## Open items

- [ ] Keep the Professional Journey in step with the master resume (titles, dates, numbers)
- [ ] Regenerate `assets/og-image.png` if the name, title or headshot changes
