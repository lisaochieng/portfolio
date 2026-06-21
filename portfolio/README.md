# Lisa Ochieng — Portfolio

A clean, deployment-ready personal portfolio with a scrapbook / journal aesthetic. Built from a reverse-engineered Claude Design export into readable HTML, CSS, and JavaScript.

## Live preview

Open `index.html` directly in a browser, or serve the folder locally:

```bash
cd portfolio
python3 -m http.server 8080
# Visit http://localhost:8080
```

## Project structure

```
portfolio/
├── index.html          # Semantic HTML5 page
├── css/
│   └── style.css       # All styles (no inline CSS)
├── js/
│   └── script.js       # Scroll, reveal, parallax, interactions
├── assets/
│   ├── images/         # Portfolio photos & project screenshots
│   ├── icons/          # Optional icon assets
│   └── resume/         # Add lisa-ochieng-resume.pdf here
├── README.md
└── .gitignore
```

## GitHub Pages deployment

1. Push this `portfolio/` folder to your repository.
2. Go to **Settings → Pages**.
3. Set **Source** to deploy from branch `main` (or your default branch).
4. Set **Folder** to `/portfolio` (or move files to repo root and use `/root`).
5. Save — your site will be live at `https://<username>.github.io/<repo>/`.

All asset paths are relative. No build step required.

## Editing content

| Section | File | What to change |
|---------|------|----------------|
| Hero text & badges | `index.html` → `#hero` | Name, tagline, badges |
| About bio | `index.html` → `#about` | Paragraphs, stats |
| Projects | `index.html` → `#projects` | Card titles, descriptions, tags, links |
| Skills | `index.html` → `#skills` | Skill chips per category |
| Experience | `index.html` → `#experience` | Timeline entries |
| Contact | `index.html` → `#contact` | Email, GitHub, LinkedIn URLs |
| Résumé | `assets/resume/` | Add `lisa-ochieng-resume.pdf` |
| Colors & fonts | `css/style.css` → `:root` | CSS custom properties |

## Design features preserved

- Cream paper / notebook scrapbook layout
- Handwritten display typography (Birds of Paradise, Caveat)
- Sticky notes, torn-paper photo frames, masking tape
- Scroll progress bar, marquee band, scroll-reveal animations
- Hero pointer parallax, project card 3D tilt on hover
- Fully responsive (mobile, tablet, desktop)

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Respects `prefers-reduced-motion`.

## License

© 2026 Lisa Ochieng. All rights reserved.
