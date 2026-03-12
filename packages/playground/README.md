# ESLint Config Playground

This directory contains several isolated environments (playgrounds) used to test and validate `@santi020k/eslint-config-basic` against different frameworks and configurations.

## Structure

Each sub-directory within `packages/playground/` represents a different technological stack or framework setup:

- `react/` - React application
- `next/` - Next.js application
- `vue/` - Vue application
- `astro/` - Astro application
- `nest/` - NestJS application
- `typescript/` - Vanilla TypeScript
- `expo/` - Expo React Native application
- `tailwind/` - Tailwind CSS combined setup
- `vitest/` - Vitest test suite setup

Each of these playgrounds has its own `package.json` (named `@playground/<framework>`) and an `eslint.config.js` file importing the local ESLint configs.

## How to Use the Playground

### Running Lint Checks

You can lint all playgrounds at once from the root of this monorepo:

```bash
# Lints all packages and playgrounds in the monorepo
npm run lint

# Or run the playground-specific script (if standing in the playground root):
npm run lint
```

If you want to test a specific playground (e.g., Vue):

```bash
cd packages/playground/vue
npm run lint

# To automatically fix actionable issues:
npm run lint -- --fix
```

### Developing and Testing Changes

When you make changes to the ESLint rules in any of the core packages (like `packages/react/src/rules.ts`):
1. Run `npm run build` at the root to compile your changes.
2. Navigate to the relevant playground or stay at the root.
3. Run `npm run lint` to see how your new rules apply to the sample code in that playground environment.
   - If the rules are working properly, you should see warnings/errors triggered based on your new config.
   - You can add code examples to the playground files (e.g. `src/App.vue` or `src/index.tsx`) to manually verify that new ESLint rules are catching specific code patterns.
