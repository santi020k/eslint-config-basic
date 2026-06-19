# @santi020k/eslint-config-docs

Internal Astro Starlight documentation workspace for the [`@santi020k/eslint-config-basic`](https://github.com/santi020k/eslint-config-basic) monorepo.

- Docs: [eslint.santi020k.com](https://eslint.santi020k.com/)
- Custom Domain Target: `eslint.santi020k.com`
- Author: [santi020k](https://santi020k.com)

## Testing & Quality

This workspace includes automated testing to ensure the documentation remains accessible, performant, and SEO-friendly.

- **Accessibility**: Powered by Playwright and axe-core.
- **SEO**: Automated checks for meta tags and canonical URLs.
- **Lighthouse CI**: Comprehensive audits for performance and best practices.

### Commands

```bash
pnpm run test:a11y     # Run accessibility and SEO tests
pnpm run lighthouse    # Run Lighthouse CI audits
```
