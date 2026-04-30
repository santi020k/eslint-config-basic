# Documentation Branding

This document defines the brand direction for `eslint.santi020k.com` after the
Astro Starlight migration.

The source of truth for the parent brand is:

- `../private-website/docs/brand-guidelines.md`
- `../private-website/src/styles/partials/tokens.css`
- `../private-website/src/assets/brand/logos/`

Do not treat the old VitePress docs theme as canonical. It changed over time and
no longer reflects the current `santi020k` identity.

## Brand Relationship

This documentation site is a product under the `santi020k` brand:

- Parent brand: `Santi020k`
- Product: `@santi020k/eslint-config-basic`
- Site: `eslint.santi020k.com`
- Tone: senior, clear, calm, developer-first, useful without hype

The site should feel like part of the private website family, while still making
the ESLint library/product obvious in the first viewport.

## Logo And Assets

Use the current `santi020k` logo system from the private website:

- Wordmark: `../private-website/src/assets/brand/logos/logo-santi020k.svg`
- Dark wordmark: `../private-website/src/assets/brand/logos/logo-santi020k-dark.svg`
- Square mark: `../private-website/src/assets/brand/logos/logo-square.svg`
- WebP wordmark: `../private-website/src/assets/brand/logos/logo-santi020k.webp`

Recommended docs usage:

- Header: `Santi020k` wordmark, plus a small `ESLint Config` product label.
- Favicon/app icon: square `S2K` mark unless a dedicated ESLint product icon is
  created.
- Hero/product visual: use a library-specific composition, not the old personal
  logo alone.
- Social preview: use a product-specific card that combines the `Santi020k`
  mark with `ESLint Config`.

Avoid using the older docs `logo-square.webp` as the main identity if it reads
like an outdated personal mark.

## Color System

Use the private website purple system as the base. Blue/teal/gold from the old
docs theme is no longer canonical.

### Light Mode

```css
:root,
:root[data-theme='light'] {
  --theme-bg: 268 20% 98%;
  --surface: 268 20% 100%;
  --surface-muted: 268 20% 96%;
  --surface-strong: 268 15% 90%;
  --line: 268 15% 84%;
  --ink: 268 10% 20%;
  --ink-soft: 268 8% 36%;
  --ink-muted: 268 6% 28%;
  --brand: 267 77% 42%;
  --brand-solid: 267 77% 37%;
  --brand-soft: 267 52% 94%;
  --accent: 267 82% 52%;
  --glow: 268 88% 70%;
}
```

### Dark Mode

```css
:root[data-theme='dark'] {
  --theme-bg: 277 20% 10%;
  --surface: 277 20% 14%;
  --surface-muted: 277 18% 17%;
  --surface-strong: 277 15% 23%;
  --line: 277 12% 32%;
  --ink: 277 10% 88%;
  --ink-soft: 277 8% 72%;
  --ink-muted: 277 6% 56%;
  --brand: 277 75% 62%;
  --brand-solid: 277 70% 46%;
  --brand-soft: 277 48% 18%;
  --accent: 277 82% 72%;
  --glow: 280 85% 68%;
}
```

### Approximate Hex Values

- Light brand: `#6319be`
- Light accent: `#7b20e9`
- Light canvas: `#faf9fb`
- Light ink: `#332e38`
- Dark brand: `#af55e7`
- Dark canvas: `#1b141f`

## Typography

- Font family: Montserrat variable.
- Font source: self-hosted fonts in `packages/docs/public/fonts/`.
- Global letter spacing should be restrained. Match the private website where
  possible, but avoid the SVG logo's negative tracking in normal HTML text.
- Headings should be sentence case and strong, not generic docs-template copy.

## Shape, Surface, And Layout

The private website is polished but quiet. Use that feeling here:

- Purple-tinted neutrals.
- Subtle borders using `--line`.
- Cards/panels on `--surface` or `--surface-muted`.
- Rounded corners around `0.5rem` to `0.75rem`; avoid overly pill-shaped cards.
- Soft brand washes and glow accents; no blue/teal/gold theme.
- High contrast in both themes.

## Homepage Direction

The current Starlight default splash page is not enough. Replace it with a
custom Astro homepage that includes:

- `Santi020k` brand signal in the header.
- `@santi020k/eslint-config-basic` or `ESLint Config` as the product signal in
  the hero.
- A clean product visual: lint command, flat-config layers, framework coverage,
  or a config inspector-style panel.
- Primary path: install -> configure -> verify.
- Secondary path: framework guides, integrations, migration, API reference.
- v1/v2 awareness without making versioning dominate the page.

## Content Rules

- Avoid duplicate titles. If Starlight renders the page title from frontmatter,
  the Markdown body should not repeat the same `# H1`.
- Generated TypeDoc pages need Starlight frontmatter but should not feel like raw
  generated dumps.
- v1 pages are an archive and should be visually marked as legacy.
- Product copy should be direct and concrete: what to install, what to import,
  how to verify, and when to migrate.

## Implementation Notes

- Port private website tokens into `packages/docs/src/styles/starlight.css`.
- Copy or reference the current logo assets intentionally. If copied, keep the
  provenance documented here.
- Build product-specific Starlight overrides instead of fighting defaults only
  with broad CSS selectors.
- Validate with desktop and mobile screenshots before considering the brand pass
  complete.
