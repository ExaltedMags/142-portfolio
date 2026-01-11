# Kodi Magadia — Personal Artifact

A single-page, typographic-first personal site with an editorial aesthetic. Built with React, TypeScript, Tailwind CSS, and Radix UI primitives.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/              # Reusable UI primitives (Dialog, Tooltip)
│   ├── Header.tsx
│   ├── AchievementList.tsx
│   ├── AchievementItem.tsx
│   ├── PreviewRail.tsx
│   ├── ArtifactDialog.tsx
│   ├── TooltipPreview.tsx
│   ├── Narrative.tsx
│   └── Footer.tsx
├── content/
│   └── achievements.ts  # All content data (edit copy here)
├── lib/
│   └── utils.ts         # Utility functions
├── styles/
│   └── globals.css      # Design tokens + Tailwind
├── App.tsx
└── main.tsx

public/
└── assets/              # Images (replace placeholders)
    ├── unilab.svg       # Replace with .webp/.png
    ├── gdsc.svg
    ├── somnium.svg
    ├── alaga-network.svg
    └── venue-checker.svg
```

## Replacing Placeholder Assets

1. Navigate to `public/assets/`
2. Replace placeholder files with your actual images
3. Recommended format: `.webp` for best compression
4. Recommended dimensions:
   - Preview rail images: 640×480px (4:3 aspect ratio)
   - Dialog images: 800×450px (16:9 aspect ratio)

## Editing Content

All text content lives in `src/content/achievements.ts`:

- `headerContent` — Name, program, tagline
- `achievements[]` — List of achievements with interaction types
- `narrativeContent` — About section paragraphs
- `footerContent` — Footer text

Each achievement can have:
- `interaction: 'previewRail'` — Shows in side rail on hover
- `interaction: 'dialog'` — Opens modal on click
- `interaction: 'tooltip'` — Shows tooltip on hover

## Accessibility

- All interactive elements are keyboard accessible
- Focus states are visible
- Dialog closes with Escape key
- `aria-live` regions for dynamic content
- Core content readable without JavaScript (noscript fallback)

## Design Tokens

Edit design variables in `src/styles/globals.css`:

```css
@theme {
  --font-display: "Playfair Display", Georgia, serif;
  --font-body: "Instrument Sans", system-ui, sans-serif;
  --color-ink: #1a1814;
  --color-paper: #f8f6f1;
  --color-accent: #c45d3a;
  /* ... more tokens */
}
```

## Tech Stack

- [Vite](https://vite.dev/) — Build tool
- [React 18](https://react.dev/) — UI framework
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS v4](https://tailwindcss.com/) — Styling
- [Radix UI](https://www.radix-ui.com/) — Accessible primitives
- [Lucide React](https://lucide.dev/) — Icons

## License

Personal project. All rights reserved.
