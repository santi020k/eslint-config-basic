# Development

## Quick Start

```bash
# Enable corepack and use pnpm
corepack enable
corepack use pnpm@10.33.0

# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run tests
pnpm run test
```

## Common Commands

| Command | Description |
| :--- | :--- |
| `pnpm run build` | Build all packages (Turborepo) |
| `pnpm run dev` | Watch mode for development |
| `pnpm run lint` | Lint the entire monorepo |
| `pnpm run lint:fix` | Auto-fix lint issues |
| `pnpm run test` | Run integration tests (Vitest) |
| `pnpm run inspector` | Open ESLint config inspector UI |
| `pnpm run docs` | Generate API docs (TypeDoc) |
| `pnpm run clean` | Remove all `dist/` and `node_modules/` |

## Project Structure

This is a **monorepo** using Turborepo + pnpm Workspaces. Each config lives under `packages/`:

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
pnpm run build && pnpm run lint && pnpm run test
```

For full contributing guidelines, see **[CONTRIBUTING.md](CONTRIBUTING.md)**.
