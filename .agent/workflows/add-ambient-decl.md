---
description: How to add an ambient declaration for a library or plugin.
---

# Workflow: Adding Ambient Declarations

Follow these steps when you encounter a library or plugin that lacks TypeScript types.

## 1. Verify Need for Ambient Declaration

Before adding an `ambient.d.ts` file, you MUST perform the following checks:

1. **Check for built-in types**: Look at the package's `package.json` for a `types` or `typings` field.
2. **Search for `@types/*`**: Check if there is an official DefinitelyTyped package (e.g., `npm info @types/plugin-name`).
3. **Check core architecture**: Verify if the library is already handled by another package in the monorepo (e.g., `@santi020k/eslint-config-core`).

## 2. Install Official Types (If Available)

If types are available, install them as a dev dependency in the appropriate package:

```bash
npm install -D @types/library-name --workspace @santi020k/eslint-config-target
```

## 3. Create Ambient Declaration (Last Resort)

Only if NO official types exist, create or update `packages/{package}/src/ambient.d.ts`:

1. Declare the module: `declare module 'library-name' { ... }`
2. Provide minimal types necessary for ESLint flat config compatibility.
3. Add a comment explaining why an ambient declaration is being used.

## 4. Verify Build

Run the build command to ensure the new types are correctly picked up:

```bash
npm run build
```
