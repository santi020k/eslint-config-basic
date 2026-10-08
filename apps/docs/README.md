<p align="center">
  <a href="../../README.md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="../../assets/readme/workspace-dark.svg">
      <img src="../../assets/readme/workspace-light.svg" alt="ESLint Config Basic — Less setup. Clearer feedback." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Documentation</h1>

<p align="center">
  <a href="../../LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="License: MIT"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/built_with-Astro-6319be?style=flat-square" alt="Built With: Astro"></a>
</p>

<p align="center">
  <a href="../../README.md">Project overview</a> ·
  <a href="package.json">Package manifest</a> ·
  <a href="https://eslint.santi020k.com/guide/changelog/">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

**On this page:** [Design and motion](#design-and-motion) · [Testing & Quality](#testing--quality) · [Browser and visual release checks](#browser-and-visual-release-checks) · [Generated social images](#generated-social-images) · [Resources](#resources)

Internal Astro Starlight documentation workspace for the [`@santi020k/eslint-config-basic`](https://github.com/santi020k/eslint-config-basic) monorepo.

- Docs: [eslint.santi020k.com](https://eslint.santi020k.com/)
- Custom Domain Target: `eslint.santi020k.com`
- Author: [santi020k](https://santi020k.com)

## Design and motion

The shared documentation shell follows the sculpted direction of the Santi020k website and
theme family: locally served Montserrat, semantic theme colors, solid reading surfaces,
fine rules, and restrained violet accents. The header uses the website's option 2, Split
studio: a standalone identity and a rounded navigation cluster. It composes Starlight's
native indexed search with starting hints and no-result guidance, plus a Lumen theme toggle and GitHub icon button with matching restrained hover states; the mobile sidebar keeps its native
popover, keyboard, and focus behavior. The compact mobile cluster groups search, theme, and menu with evenly spaced 44px controls; the centered menu/close icon uses a quiet surface and an accented open state. Mobile menu icons crossfade with a small rotation, while the drawer fades and moves 8px with a brief 2px blur on entry and exit. Reduced motion switches states immediately without blur or movement. Browsers without discrete overlay transitions close the native drawer immediately while retaining icon motion.

Lumen v4 provides the homepage's bare statistics, command tabs, and short heading reveals.
Long sections remain visible independently of reveal thresholds. Native cross-document
view transitions progressively enhance same-origin navigation without adding a client router.
Reduced motion disables reveals, transitions, and smooth scrolling. Tables and rendered
code blocks are keyboard focusable for horizontal scrolling. Production builds force a
content sync so changes to rendering hooks apply to every cached documentation page.
Rendered Markdown references resolve to published routes, including frozen archive links;
code examples and archived source content remain intact.

- `src/styles/starlight.css`: theme bridge and existing documentation/tool styles.
- `src/styles/reading.css`: shared typography, reading surfaces, quiet feedback, and navigation motion.
- `src/components/Footer.astro`: split project identity and resource links with author and license credits.
- `src/styles/navigation.css`: sculpted header and native sidebar styling, with compact group
  headings, a single guide rail, quiet badges, and a violet active-page marker. Mobile links
  retain 44px touch targets and native disclosure and keyboard behavior. The mobile
  identity scales to narrow screens, and the in-flow contents bar reserves no extra
  space below the fixed header.
- `src/styles/home.css`: editorial homepage compositions.

The shared styles cover current documentation and both frozen archives; archive content
and the ESLint package version remain independent of the Lumen version.

## Testing & Quality

This workspace includes automated testing to ensure the documentation remains accessible, performant, and SEO-friendly.

- **Accessibility**: Powered by Playwright and axe-core.
- **SEO**: Automated checks for meta tags and canonical URLs.
- **Lighthouse**: Repository-owned performance, accessibility, best-practices, and SEO audits.

### Commands

```bash
pnpm run test:a11y     # Run accessibility and SEO tests
pnpm run lighthouse    # Run Lighthouse audits and enforce local budgets
```

`tests/design-system.spec.ts` additionally checks narrow route families and archives, keyboard
navigation, theme persistence, version switching, and reduced-motion visibility. Keep material
design changes verified in light/dark themes at mobile and desktop widths.

## Browser and visual release checks

`pnpm run docs:test:a11y` runs the full Chromium suite, including mandatory screenshot
comparisons, plus Firefox and WebKit navigation, search, theme, keyboard, and responsive
checks. Playwright starts its own preview server; set `DOCS_TEST_PORT` to a free port
when another checkout is using the default 4173.

Screenshot baselines cover the home and installation pages at 390px and 1440px in both
appearance modes. They are maintained separately for macOS and Ubuntu 24.04 ARM64;
the docs workflow uses `ubuntu-24.04-arm` with the lockfile's Playwright browser build.
Generate Linux baselines on that same platform, inspect the images, and then run the
suite without `--update-snapshots` before committing them. Never generate replacements
inside the validation workflow.

After Pages deployment, the workflow checks `release-build.json` against the exact
build commit, representative live routes, and the Pagefind search bundle. It retries
briefly for deployment propagation and fails if the live site stays stale or broken.

## Generated social images

The documentation uses `@santi020k/og` 1.1 presets and a route manifest.
Run `pnpm run docs:build` from the repository root to regenerate cards and verify
the built metadata, images, and sitemap audit. Renderer configuration lives in
`scripts/generate-og-images.mjs`.

## Resources

[Project overview](../../README.md) · [Contributing](../../.github/CONTRIBUTING.md) · [License](../../LICENSE)
