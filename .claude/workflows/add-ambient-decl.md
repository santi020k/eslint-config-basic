---
description: How to add an ambient declaration for a library or plugin that lacks TypeScript types.
---

# Workflow: Adding Ambient Declarations

Ambient declarations are a **last resort**. Always exhaust alternatives first.

## 1. Check for Built-In Types

Look at the plugin package's `package.json` for a `types` or `typings` field.

## 2. Search for `@types/*`

```bash
npm info @types/plugin-name
```

If available, install as a dev dependency in the affected package:
```bash
pnpm add -D @types/plugin-name --filter @santi020k/eslint-config-target
```

## 3. Create Ambient Declaration (Last Resort Only)

Only if no official types exist anywhere, create `packages/{package}/src/ambient.d.ts`:

```typescript
// Ambient declaration required: no official types exist for eslint-plugin-X as of YYYY-MM-DD
declare module 'eslint-plugin-name' {
  // minimal types needed for ESLint flat config compatibility
}
```

Include a comment explaining why the ambient declaration is needed — future maintainers need to know when to revisit.

## 4. Verify Build

```bash
pnpm run build
```
