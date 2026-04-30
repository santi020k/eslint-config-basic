# Documentation Branding

This document defines the brand direction for `@santi020k/eslint-config-basic` and its documentation site `eslint.santi020k.com`.

## Brand Relationship

This project is a flagship product under the `Santi020k` umbrella:

- Parent brand: `Santi020k`
- Product: `@santi020k/eslint-config-basic`
- Site: `eslint.santi020k.com`
- Tone: senior, clear, calm, developer-first, useful without hype

The site feels like part of the Santi020k family through its color system, while establishing its own unique identity through a product-specific logo and interface elements.

## Logo And Assets

This library uses a dedicated product logo that merges the classic ESLint hexagon with config toggles, retaining the Santi020k styling:

- **Wordmark (Light)**: `src/assets/logo-santi020k.svg`
- **Wordmark (Dark)**: `src/assets/logo-santi020k-dark.svg`
- **Square Mark**: `src/assets/logo-square.svg`
- **WebP & PNG Assets**: Stored in `public/` (e.g., `logo.webp`, `cover.webp`)

### Recommended Usage:

- **Header / Navbar**: Use the full wordmark (with `replacesTitle: true` in Starlight). The wordmark itself contains both `@santi020k` and `eslint-config-basic`.
- **Favicon / App Icon**: Use the square hexagon-toggle mark (`favicon.svg`, `favicon.png`).
- **Hero / Product Visual**: Emphasize the config sliders and the purple hexagon. The `cover.webp` should always use the new composition.

## Color System

The color system extends the Santi020k purple system, applying it to linting interfaces, code blocks, and UI elements.

### Light Mode

```css
:root,
:root[data-theme='light'] {
  --s2k-theme-bg: 268 20% 98%;
  --s2k-surface: 268 20% 100%;
  --s2k-surface-muted: 268 20% 96%;
  --s2k-surface-strong: 268 15% 90%;
  --s2k-line: 268 15% 84%;
  --s2k-ink: 268 10% 20%;
  --s2k-ink-soft: 268 8% 36%;
  --s2k-ink-muted: 268 6% 28%;
  --s2k-brand: 267 77% 42%;
  --s2k-brand-solid: 267 77% 37%;
  --s2k-brand-soft: 267 52% 94%;
  --s2k-accent: 267 82% 52%;
  --s2k-glow: 268 88% 70%;
}
```

### Dark Mode

```css
:root[data-theme='dark'] {
  --s2k-theme-bg: 260 43% 8%;
  --s2k-surface: 260 30% 12%;
  --s2k-surface-muted: 260 25% 15%;
  --s2k-surface-strong: 260 20% 21%;
  --s2k-line: 260 15% 30%;
  --s2k-ink: 260 10% 88%;
  --s2k-ink-soft: 260 8% 72%;
  --s2k-ink-muted: 260 6% 56%;
  --s2k-brand: 262 87% 66%;
  --s2k-brand-solid: 262 87% 46%;
  --s2k-brand-soft: 262 50% 18%;
  --s2k-accent: 262 87% 76%;
  --s2k-glow: 262 87% 68%;
}
```

### Approximate Hex Values

- Light brand: `#6319be`
- Light canvas: `#faf9fb`
- Dark brand: `#945df4`
- Dark canvas: `#110c1d`

## Typography

- **Font family**: Montserrat variable (self-hosted).
- **Headings**: Sentence case, strong contrast. No negative letter-spacing in standard body text.

## Shape, Surface, And Layout

The UI uses a quiet, polished aesthetic:

- **Borders**: Subtle, using `--s2k-line`.
- **Corners**: Rounded corners around `0.5rem` to `0.75rem` for standard cards. The logo uses a geometric hexagon with rounded inner toggles.
- **Washes**: Soft brand washes and glow accents (no blue/teal theme).

## Implementation Notes

- Always ensure the logo SVG aspect ratio is respected (`height: 2.75rem; width: auto; transform: scale(1.1);`) rather than forcing a strict pixel width, allowing the longer library name to scale properly.
- All Starlight pages should seamlessly match the `cover.webp` branding on social platforms.
- Re-run the logo generation script if you update the SVG paths to keep `apple-touch-icon.png`, `favicon.png`, and `.webp` assets in sync.
