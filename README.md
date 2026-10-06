# Portfolio Website

A static portfolio website with:
- Masonry-style landing gallery
- Three columns on desktop (equal width, varying image heights)
- Click-through project detail pages
- Responsive behavior for tablet and mobile

## Structure

- index.html: Landing page with masonry photo grid
- style.css: Shared styles for landing and project pages
- project-1.html to project-6.html: Individual project detail pages

## Customize Content

1. Open index.html
2. Replace image URLs, project names, and categories in each gallery tile
3. Update links if you add or rename project pages

To customize each project page:
1. Open project-X.html
2. Replace hero image URL
3. Update title, description, role, timeline, and deliverables

## Run Locally

Open index.html in your browser.

## Apps Resources

The Apps page pairs the Actor Network GIF with a favicon-blue resource panel.
On desktop, the panel matches the GIF's height and displays a large white info icon.
Hovering the panel or keyboard-focusing a resource link dims the icon and reveals
the labels. Tutorial, Methodology, and Importing custom datasets each link to their
own page; only the hovered or focused link is underlined.
On mobile (640px and narrower), the panel is a full-width strip below the GIF with
the labels always visible. Update their destinations and labels in `apps/index.html`;
its layout is defined by the `.app-resource-tile` rules in `assets/css/style.css`.

## Deploy With GitHub Pages

1. Push this project to a GitHub repository
2. In GitHub, open repository Settings > Pages
3. Under Build and deployment:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /(root)
4. Save and wait for deployment

Your site URL will be shown in the Pages settings after deployment.
