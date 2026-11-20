# assets

| File | What |
|------|------|
| `headshot.jpg` | Hero photo, 1254×1254 JPEG. Fallback for browsers without WebP. |
| `headshot.webp` | The same photo at 800×800 WebP (about 30 KB), served first through `<picture>`. |
| `og-image.png` | Link-preview image (LinkedIn, X, Slack), 1200×630. Name, title and headshot. |

If the headshot fails to load, the hero shows a "VK" monogram instead (see `script.js`).
