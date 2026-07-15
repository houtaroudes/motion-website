# ✦ Motion — Interactive Animation Showcase

A visually stunning, interactive website showcasing modern UI/UX animation principles — inspired by [motion.zajno.com](https://motion.zajno.com).

## ✨ Features

- **Custom 3D Cursor** — Smooth, interactive cursor that follows mouse movement with hover effects
- **Parallax Depth** — Multi-layered parallax scrolling with independent speed layers
- **Easing Demonstrations** — Interactive visualizations of easing functions (Linear, Ease Out, Bounce, Spring, Cubic Bezier)
- **Shape Morphing** — Geometric shape transitions with smooth CSS animations
- **Mask Reveals** — Clip-path mask animations (Circle, Wipe, Diamond)
- **3D Tilt Cards** — Interactive cards with perspective transforms and shine effects
- **Animated Showcase** — Floating orbs, pulse waves, stagger bars, morphing rings, orbit systems, and glow auras
- **Particle System** — Dynamic floating particles in the hero section
- **Scroll Animations** — Element reveals with staggered timing as you scroll
- **Counter Animations** — Animated number counters with easing
- **Progress Bar** — Scroll progress indicator at the top
- **Responsive Design** — Fully responsive across all screen sizes
- **Smooth Navigation** — Active section highlighting and smooth scroll-to-anchor

## 🛠️ Built With

- [Vite](https://vitejs.dev/) — Fast build tool
- Vanilla JavaScript — No framework dependencies
- CSS3 — Animations, 3D Transforms, Gradients, Clip-paths

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/motion-website.git

# Navigate to project
cd motion-website

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist` folder to the `gh-pages` branch
3. Enable GitHub Pages in your repository settings

Or use the GitHub Action:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📁 Project Structure

```
motion-website/
├── index.html          # Main HTML with all sections
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
├── README.md           # This file
├── src/
│   ├── main.js         # JavaScript — all interactivity & animations
│   └── style.css       # CSS — all styles, animations, responsive
└── public/             # Static assets (empty)
```

## 🎯 Sections

| # | Section | Animation Type |
|---|---------|---------------|
| 01 | Easing & Timing | Motion curves, ball animations |
| 02 | Depth & Parallax | Multi-layer scroll parallax |
| 03 | Transform & Morph | Shape-shifting geometry |
| 04 | Masking & Reveal | Clip-path reveal animations |
| 05 | 3D Dimensions | Interactive tilt + shine |
| 06 | Animation Showcase | Floating, pulse, orbit, glow |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Crafted with 🎨 and ⚡
