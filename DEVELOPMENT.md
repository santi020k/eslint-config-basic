# Development

## Quick Start

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build all packages (Turborepo) |
| `npm run dev` | Watch mode for development |
| `npm run lint` | Lint the entire monorepo |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run test` | Run integration tests (Vitest) |
| `npm run inspector` | Open ESLint config inspector UI |
| `npm run docs` | Generate API docs (TypeDoc) |
| `npm run clean` | Remove all `dist/` and `node_modules/` |

## Project Structure

This is a **monorepo** using Turborepo + npm Workspaces. Each config lives under `packages/`:

- `packages/basic` — Main entry point, composes all configs
- `packages/core` — Core JS rules, types, utilities
- `packages/typescript` — TypeScript rules
- `packages/react` — React + Hooks rules
- `packages/next` — Next.js rules
- `packages/astro` — Astro rules
- `packages/expo` — Expo/React Native rules
- `packages/nest` — NestJS rules
- `packages/vue` — Vue rules
- `packages/optionals` — Optional configs (Tailwind, Vitest, Prettier, Unicorn, etc.)
- `packages/tests` — Integration tests
- `packages/playground` — Local testing playground

## Validation

Always validate your changes before submitting:

```bash
npm run build && npm run lint && npm run test
```

For full contributing guidelines, see **[CONTRIBUTING.md](CONTRIBUTING.md)**.
