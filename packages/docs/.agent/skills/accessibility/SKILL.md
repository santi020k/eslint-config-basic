---
name: accessibility
description: Web accessibility (a11y) for the eslint.santi020k.com documentation site (Astro Starlight). Use this skill when auditing docs pages for accessibility, adding ARIA attributes, fixing keyboard navigation, improving color contrast, writing semantic MDX/HTML, overriding Starlight components accessibly, or any task related to WCAG compliance, screen reader compatibility, or inclusive design. Trigger on mentions of accessibility, a11y, WCAG, ARIA, screen reader, keyboard navigation, focus management, color contrast, or inclusive design.
---

# Accessibility Skill — eslint.santi020k.com (Starlight)

Target: **WCAG 2.2 Level AA** conformance. The site is Astro Starlight — Starlight handles most baseline a11y automatically (skip links, landmark regions, keyboard nav in the sidebar). Work here focuses on custom components, MDX content, color overrides, and interactive enhancements.

---

## Starlight Baseline (already handled)

Starlight provides out of the box:
- Skip-to-content link
- `<nav>` with `aria-label` for sidebar and header nav
- Correct heading hierarchy per page (Starlight enforces one `<h1>` via frontmatter `title`)
- Mobile nav toggle with `aria-expanded` / `aria-controls`
- Theme toggle with `aria-label`
- Focus management on route transitions

**Do not reimplement these.** Only intervene when a custom component or MDX override needs additional attention.

---

## Semantic HTML in MDX

Starlight renders MDX pages inside `<article>`. Standard markdown produces correct semantics automatically. Watch out for:

```mdx
<!-- ✅ Good — correct heading hierarchy -->
## Setup
### Installation

<!-- ❌ Bad — skipping levels for visual sizing -->
## Setup
#### Installation

<!-- ✅ Good — use remark/rehype for custom blocks, not bare divs -->
:::note
This config requires ESLint 9+.
:::

<!-- ✅ Icon in a link — decorative, so aria-hidden -->
<a href="/guide/getting-started">
  Get started <Icon name="right-arrow" aria-hidden="true" />
</a>
```

---

## Starlight Component Overrides

Custom components live in `src/components/`. When overriding a Starlight component, always preserve its accessibility contract.

### Safe override pattern

```astro
---
// src/components/CustomHeader.astro — overriding Starlight's Header
import Default from '@astrojs/starlight/components/Header.astro'
---
<!-- Wrap, don't replace. Keep Default's landmark and skip-link intact. -->
<div class="custom-header-wrapper">
  <Default {...Astro.props}><slot /></Default>
</div>
```

### Custom interactive components

Any component with show/hide state needs explicit ARIA:

```astro
---
// VersionBadge.astro — expandable release notes
const { version, notes } = Astro.props
const id = `notes-${version.replace(/\./g, '-')}`
---
<div x-data="{ open: false }">
  <button
    type="button"
    :aria-expanded="open.toString()"
    :aria-controls={id}
    @click="open = !open"
  >
    {version} <Icon name="chevron-down" aria-hidden="true" />
  </button>
  <div :id={id} x-show="open">
    <Fragment set:html={notes} />
  </div>
</div>
```

---

## Color System & Contrast

The docs site uses a custom CSS variable system (`--s2k-*`) mapped to Starlight's `--sl-*` variables in `src/styles/starlight.css`. Brand colors:

- Light mode brand: `#6319be` (purple)
- Light canvas: `#faf9fb`
- Dark mode brand: `#945df4`
- Dark canvas: `#110c1d`

### Contrast requirements

| Context | Ratio | Variable pair to check |
|---|---|---|
| Body text on canvas | 4.5:1 | `--s2k-ink` on `--s2k-theme-bg` |
| Muted text | 4.5:1 | `--s2k-ink-soft` on `--s2k-surface` |
| Brand links | 4.5:1 | `--s2k-brand` on `--s2k-theme-bg` |
| Large headings | 3:1 | `--s2k-ink` on `--s2k-theme-bg` |
| Focus ring | 3:1 | `--s2k-accent` on adjacent background |

When adding new color tokens or adjusting existing ones in `starlight.css`, verify against the canvas background before committing. Use [coolors.co/contrast-checker](https://coolors.co/contrast-checker) or Chrome DevTools > Accessibility.

---

## Custom Code Blocks

Starlight uses Expressive Code for syntax highlighting. Never override code block contrast via inline styles — adjust via the Expressive Code theme in `astro.config.mjs`:

```js
// astro.config.mjs
expressiveCode({
  themes: ['github-dark', 'github-light'],
  styleOverrides: {
    // Ensure comment text meets 3:1 on code background
    codeComment: 'hsl(268 10% 55%)'
  }
})
```

---

## Images & Icons

All docs pages should use Astro's `<Image>` for raster assets. For SVG icons use Starlight's `<Icon>` component.

```astro
import { Image } from 'astro:assets'
import screenshot from '@/assets/screenshot.png'

<!-- Informative screenshot -->
<Image
  src={screenshot}
  alt="ESLint Config Inspector showing active rules for a React project"
  width={1200}
  height={630}
/>

<!-- Decorative image -->
<Image src={decoration} alt="" role="presentation" />

<!-- Icon alongside label text — icon is decorative -->
<Icon name="seti:typescript" aria-hidden="true" />
TypeScript
```

---

## Tables in MDX

Starlight styles markdown tables. Always include a header row — screen readers use `<th>` for column context:

```md
| Package | Version | ESLint |
|---|---|---|
| `@santi020k/eslint-config-basic` | 2.x | 9 / 10 |
```

For complex tables with merged cells, use HTML directly and add `scope` attributes:

```html
<table>
  <thead>
    <tr>
      <th scope="col">Rule</th>
      <th scope="col">Default</th>
    </tr>
  </thead>
  ...
</table>
```

---

## Reduced Motion

Add reduced-motion safety to any custom CSS animations in `src/styles/`:

```css
@media (prefers-reduced-motion: reduce) {
  .s2k-hero-visual__line {
    animation: none;
  }
}
```

Starlight's own transitions already respect this. Check any custom hero or badge animations.

---

## Accessibility Audit Checklist

Run before any significant docs page or component change:

**Automated:**
- [ ] Lighthouse accessibility audit ≥ 95 on the changed page
- [ ] axe DevTools — zero critical/serious violations

**Manual:**
- [ ] Tab through page — sidebar links, code copy buttons, theme toggle all reachable
- [ ] Heading order is sequential (use HeadingsMap extension to verify)
- [ ] All images have descriptive `alt` text (or `alt=""` if decorative)
- [ ] Color contrast passes AA (all foreground/background pairs)
- [ ] Animations respect `prefers-reduced-motion`
