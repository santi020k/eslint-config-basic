---
name: detection
description: How auto-detection works and how to add new auto-detectable frameworks, libraries, runtimes, or tools.
---

# Auto-Detection

Auto-detection reads `package.json` dependencies (both `dependencies` and `devDependencies`) and file system signals from the project root to infer which frameworks, libraries, testing tools, runtimes, and tools are in use.

## How It Works

`packages/core/src/utils/detection.ts` exports `detectProjectOptions(pkg, rootDir)`. It:
1. Collects all deps from `dependencies` + `devDependencies`
2. Checks for known package names → maps to `DetectedFrameworkName`, `Library`, `Testing`, `Tool`, `Extension`, `Format`, `Runtime` enum values
3. Checks for file system signals (e.g., `wrangler.toml` → `Runtime.Cloudflare`)
4. Returns a partial `EslintConfigOptions` merged into the user's explicit config

Auto-detection is **enabled by default**. Users opt out via:
```js
eslintConfig({ detection: false })              // disable entirely
eslintConfig({ autoFrameworks: false })         // detect libs/tools but not frameworks
eslintConfig({ optionMergeStrategy: 'replace' }) // explicit options win, detected ignored
```

## Adding a New Auto-Detectable Item

### Step 1 — Identify the trigger

What package name(s) in `package.json` should trigger this detection?

```typescript
// Single package
hasAnyDependency(allDeps, ['my-framework'])

// Multiple packages (any one is enough)
hasAnyDependency(allDeps, ['my-framework', '@my-framework/core', 'my-framework-cli'])
```

File system signals are also possible:
```typescript
pathExists(join(detectRootDir, 'my-framework.config.js'))
```

### Step 2 — Add detection logic to detection.ts

`packages/core/src/utils/detection.ts` — find the right section (frameworks, libraries, testing, tools, runtime) and add:

```typescript
// Example: detect a new library
if (hasAnyDependency(allDeps, ['my-lib', '@my-lib/core'])) {
  options.libraries = [...(options.libraries ?? []), Library.MyLib]
}

// Example: detect a new framework
if (hasAnyDependency(allDeps, ['my-framework'])) {
  detectedFrameworks.push('myframework')
}

// Example: detect a new runtime from a file signal
if (hasCloudflareSignal(allDeps, detectRootDir)) {
  setRuntime(Runtime.Cloudflare)
}
```

### Step 3 — Write tests (TDD)

Add tests to `packages/tests/src/detection.test.ts` **before** or **alongside** the detection logic:

```typescript
describe('my-lib detection', () => {
  it('detects my-lib from dependencies', () => {
    const options = detectProjectOptions({ dependencies: { 'my-lib': '1.0.0' } })
    expect(options.libraries).toContain(Library.MyLib)
  })

  it('does not detect my-lib when not in dependencies', () => {
    const options = detectProjectOptions({ dependencies: {} })
    expect(options.libraries ?? []).not.toContain(Library.MyLib)
  })

  it('detects my-lib from devDependencies', () => {
    const options = detectProjectOptions({ devDependencies: { 'my-lib': '1.0.0' } })
    expect(options.libraries).toContain(Library.MyLib)
  })
})
```

For fixture-based detection tests (real `package.json` files), add to `detection-fixtures.test.ts`.

### Step 4 — Validate

```bash
pnpm run test
```

## Detection Test Files

| File | Purpose |
| :--- | :--- |
| `detection.test.ts` | Main detection tests — mocks `fs` module; use for all new detection logic |
| `detection-fixtures.test.ts` | Tests with real `package.json` fixture files for complex combos |
| `detection-internals.test.ts` | Unit tests for internal helpers (deduplication etc.) |

## Common Patterns in detection.ts

```typescript
// Check any of several package names
hasAnyDependency(allDeps, ['package-a', 'package-b'])

// Check file existence
pathExists(join(detectRootDir, 'config-file.json'))

// Check for files matching a pattern
hasFileMatching(detectRootDir, name => name.endsWith('.config.ts'))

// Runtime with priority (higher priority wins over lower)
setRuntime(Runtime.Cloudflare)  // uses runtimePriority map internally
```

## Integration with optionMergeStrategy

Detected values merge with explicit user options by default (`optionMergeStrategy: 'merge'`). With `'replace'`, explicit options fully replace detected ones. Detection logic doesn't need to know about this — the merge strategy is applied by `eslintConfig()` after detection runs.
