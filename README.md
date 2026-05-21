# Portfolio — GitHub Pages Setup

## File Structure

```
portfolio/
├── index.html          ← Landing page (photo gallery)
├── css/
│   └── style.css
├── js/
│   └── gallery.js
└── projects/
    ├── project-1.html  ← One file per project
    ├── project-2.html
    └── ...
```

## Deploying to GitHub Pages

1. **Create a repo** on GitHub named `your-username.github.io`
   (this gives you a clean URL: `https://your-username.github.io`)
   — or use any repo name and it'll live at `https://your-username.github.io/repo-name`

2. **Push this folder** to the repo:
   ```bash
   git init
   git add .
   git commit -m "initial portfolio"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**: Go to repo → Settings → Pages → Source: `main` branch, `/ (root)`

4. Your site will be live in ~1 minute at the URL shown in Settings → Pages.

## Customising Your Portfolio

### Replace placeholder content in `index.html`:
- Change `Your Name` in the header
- Replace each `<img src="https://images.unsplash.com/...">` with your own photos
- Update `alt` text, `.project-title`, and `.project-tag` for each item
- Update `href="projects/project-X.html"` links

### Add a new project:
1. Copy `projects/project-1.html` → `projects/project-new.html`
2. Add a new `<a class="gallery-item">` block in `index.html`
3. Customise the copy and images

### Change the color accent per card:
Each `.gallery-item` has a `style="--accent: #hexcolor;"` — change this to match your project's mood.

### Hosting your own images:
Drop photos into an `images/` folder and reference them as:
```html
<img src="images/my-photo.jpg" alt="Description" />
```

## Fonts
Uses Google Fonts (loaded from CDN):
- **Cormorant Garamond** — headings and body on project pages
- **DM Mono** — UI chrome and labels

For offline/self-hosted use, download from fonts.google.com and update the `<link>` tags.
