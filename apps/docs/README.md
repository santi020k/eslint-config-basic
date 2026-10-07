# @santi020k/eslint-config-docs

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
popover, keyboard, and focus behavior. The compact mobile cluster groups search and menu.

Lumen v4 provides the homepage's bare statistics, command tabs, and short heading reveals.
Long sections remain visible independently of reveal thresholds. Native cross-document
view transitions progressively enhance same-origin navigation without adding a client router.
Reduced motion disables reveals, transitions, and smooth scrolling. Tables and rendered
code blocks are keyboard focusable for horizontal scrolling. Production builds force a
content sync so changes to rendering hooks apply to every cached documentation page.

- `src/styles/starlight.css`: theme bridge and existing documentation/tool styles.
- `src/styles/reading.css`: shared typography, reading surfaces, quiet feedback, and navigation motion.
- `src/components/Footer.astro`: split project identity and resource links with author and license credits.
- `src/styles/navigation.css`: sculpted header and native sidebar styling, with compact group
  headings, a single guide rail, quiet badges, and a violet active-page marker. Mobile links
  retain 44px touch targets and native disclosure and keyboard behavior.
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
