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

The canonical light and dark palettes come from `@santi020k/theme/tokens.css`. The documentation
stylesheet imports those tokens after Lumen, maps them into Lumen and Starlight, and keeps the
`--s2k-*` names only as compatibility aliases for existing product styles.

The product applies two deliberate accessibility adaptations:

- Light `--ink-muted` uses `268 6% 44%` so small supporting copy remains above WCAG AA contrast on
  tinted surfaces while staying visually quieter than `--ink-soft`.
- Dark `--accent` uses `264 90% 76%` because Lumen consumes it as foreground text on selected
  `brand-soft` surfaces.

Update the shared package when changing the canonical palette. Keep site-only overrides narrow,
documented, and backed by the light and dark accessibility suite.

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
