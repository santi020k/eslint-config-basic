# Playgrounds

The playground packages are one of the best parts of this repository.

They give each framework or optional integration a real project where configuration changes can be linted, tested, and debugged before release.

## Why They Matter

- They catch config regressions earlier than shape-only tests.
- They make framework behavior visible in real projects.
- They provide realistic examples for docs and troubleshooting.

## Where They Live

- Root playground package: [`packages/playground`](/packages/playground)
- Framework examples: `packages/playground/<framework>`
- Optional examples: `packages/playground/libraries`, `testing`, `formats`, `tools`, `extensions`

## Coverage Map

| Area | Example Path |
| :--- | :--- |
| React | `packages/playground/react` |
| Next.js | `packages/playground/next` |
| Astro | `packages/playground/astro` |
| Vue | `packages/playground/vue` |
| Svelte | `packages/playground/svelte` |
| Solid | `packages/playground/solid` |
| Angular | `packages/playground/angular` |
| NestJS | `packages/playground/nest` |
| Expo | `packages/playground/expo` |
| TypeScript | `packages/playground/typescript` |
| Libraries | `packages/playground/libraries/*` |
| Testing | `packages/playground/testing/*` |
| Formats | `packages/playground/formats/*` |
| Tools | `packages/playground/tools/*` |
| Extensions | `packages/playground/extensions/*` |

## How to Use Them

- Use playgrounds to verify rule behavior before changing defaults.
- Borrow snippets from playgrounds when writing example configs.
- Compare framework packages side by side when debugging cross-framework issues.

## Related Links

- Repo: [github.com/santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Website: [santi020k.me](https://santi020k.me)
- Playground Package Guide: [Playground Package](/packages/playground)
