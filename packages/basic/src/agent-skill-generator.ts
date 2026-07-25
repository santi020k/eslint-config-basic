import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { detectProjectOptions } from './index.js'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AgentTarget {

  /** Format variant used when generating content */
  format: 'cursor' | 'frontmatter' | 'kiro' | 'plain'

  /** Human-readable label for logging */
  label: string

  /** Folder that must exist in cwd to be considered "present" */
  markerFolder: string

  /** File name for the generated skill */
  skillFile: string

  /** Subdirectory inside the agent folder where the skill file is placed */
  skillSubdir: string
}

/**
 * Features extracted from the project's actual `eslint.config.js`.
 * All arrays hold display-friendly labels (e.g. `'TypeScript'`, `'React'`).
 */
export interface EslintConfigFeatures {

  /** Path to the config file that was loaded, or null when falling back to detection */
  configFile: null | string
  extensions: string[]
  formats: string[]
  frameworks: string[]
  libraries: string[]

  /** The lint command found in the project's package.json scripts, or a sensible default */
  lintCommand: string

  /** Whether features came from the real config file or from package.json detection */
  source: 'config-file' | 'detection-fallback'

  testing: string[]

  tools: string[]

  typescript: boolean
}

export interface GenerateSkillOptions {

  /**
   * Check mode — compare existing skill files against freshly generated
   * content without writing anything. Stale or missing files are reported
   * in {@link GenerateSkillResult.stale}.
   * @default false
   */
  check?: boolean

  /**
   * Create a root `AGENTS.md` when it does not exist yet, instead of only
   * updating an existing one.
   * @default false
   */
  createAgentsMd?: boolean

  /** Working directory — defaults to process.cwd() */
  cwd?: string

  /**
   * Overwrite files that already exist.
   * @default false
   */
  force?: boolean
}

export interface GenerateSkillResult {
  skipped: string[]

  /** Files that are out of date (or missing) — only populated in check mode */
  stale: string[]

  written: string[]
}

// ─── Known agent targets ──────────────────────────────────────────────────────

/**
 * All AI coding-assistant agent folders that are probed for.
 * Add new entries here as new agents emerge — the generator picks them up
 * automatically on the next run.
 */
export const AGENT_TARGETS: AgentTarget[] = [
  {
    format: 'frontmatter',
    label: '.agent (generic skill format)',
    markerFolder: '.agent',
    skillFile: 'SKILL.md',
    skillSubdir: 'skills/eslint-standards'
  },
  {
    format: 'frontmatter',
    label: '.agents (generic skill format)',
    markerFolder: '.agents',
    skillFile: 'SKILL.md',
    skillSubdir: 'skills/eslint-standards'
  },
  {
    format: 'plain',
    label: 'Claude Code (.claude/commands)',
    markerFolder: '.claude',
    skillFile: 'eslint.md',
    skillSubdir: 'commands'
  },
  {
    format: 'cursor',
    label: 'Cursor (.cursor/rules)',
    markerFolder: '.cursor',
    skillFile: 'eslint-standards.mdc',
    skillSubdir: 'rules'
  },
  {
    format: 'frontmatter',
    label: 'Windsurf (.windsurf/rules)',
    markerFolder: '.windsurf',
    skillFile: 'eslint-standards.md',
    skillSubdir: 'rules'
  },
  {
    format: 'plain',
    label: 'Copilot (.copilot)',
    markerFolder: '.copilot',
    skillFile: 'eslint-standards.md',
    skillSubdir: 'instructions'
  },
  {
    format: 'plain',
    label: 'Aider (.aider)',
    markerFolder: '.aider',
    skillFile: 'eslint-standards.md',
    skillSubdir: '.'
  },
  {
    format: 'plain',
    label: 'Gemini (.gemini)',
    markerFolder: '.gemini',
    skillFile: 'SKILL.md',
    skillSubdir: 'skills/eslint-standards'
  },
  {
    format: 'plain',
    label: 'Cline (.clinerules)',
    markerFolder: '.clinerules',
    skillFile: 'eslint-standards.md',
    skillSubdir: '.'
  },
  {
    format: 'plain',
    label: 'Roo Code (.roo/rules)',
    markerFolder: '.roo',
    skillFile: 'eslint-standards.md',
    skillSubdir: 'rules'
  },
  {
    format: 'kiro',
    label: 'Kiro (.kiro/steering)',
    markerFolder: '.kiro',
    skillFile: 'eslint-standards.md',
    skillSubdir: 'steering'
  }
]

// ─── Config-file analysis ─────────────────────────────────────────────────────

/**
 * Maps substrings found in flat-config entry `name` fields (or plugin keys /
 * rule namespaces) to the human-readable feature label that appears in the
 * generated skill.
 *
 * Each entry is [pattern, category, label]:
 *   - pattern   — substring to search for in config names, plugin keys, or rule namespaces
 *   - category  — which feature bucket to place the label into
 *   - label     — display string written to the skill file
 */
type FeatureCategory = 'extensions' | 'formats' | 'frameworks' | 'libraries' | 'testing' | 'tools' | 'typescript'

const FEATURE_MAP: readonly [pattern: string, category: FeatureCategory, label: string][] = [
  // TypeScript
  ['eslint-config-typescript/', 'typescript', 'TypeScript'],
  ['@typescript-eslint',       'typescript', 'TypeScript'],

  // Frameworks
  ['eslint-config-react/',  'frameworks', 'React'],
  ['eslint-config-next/',   'frameworks', 'Next.js'],
  ['eslint-config-vue/',    'frameworks', 'Vue'],
  ['eslint-config-svelte/', 'frameworks', 'Svelte'],
  ['eslint-config-astro/',  'frameworks', 'Astro'],
  ['eslint-config-angular/', 'frameworks', 'Angular'],
  ['eslint-config-nest/',   'frameworks', 'NestJS'],
  ['eslint-config-hono/',   'frameworks', 'Hono'],
  ['eslint-config-expo/',   'frameworks', 'Expo'],
  ['eslint-config-qwik/',   'frameworks', 'Qwik'],
  ['eslint-config-react-router/', 'frameworks', 'React Router'],
  ['eslint-config-remix/',  'frameworks', 'Remix'],
  ['eslint-config-solid/',  'frameworks', 'SolidJS'],
  ['eslint-config-nuxt/',   'frameworks', 'Nuxt'],
  ['eslint-config-lit/',    'frameworks', 'Lit'],
  ['eslint-config-tanstack-start/', 'frameworks', 'TanStack Start'],
  ['eslint-config-preact/', 'frameworks', 'Preact'],
  ['eslint-config-slidev/', 'frameworks', 'Slidev'],
  ['eslint-config-vite/',   'frameworks', 'Vite'],

  // Extensions
  ['eslint-config-integrations/astro-doctor', 'extensions', 'Astro Doctor'],
  ['astro-doctor/', 'extensions', 'Astro Doctor'],

  // Testing
  ['integrations/vitest',              'testing', 'Vitest'],
  ['integrations/jest',               'testing', 'Jest'],
  ['eslint-config-integrations/jest-dom', 'testing', 'Jest DOM'],
  ['integrations/playwright',          'testing', 'Playwright'],
  ['integrations/cypress',             'testing', 'Cypress'],
  ['integrations/testing-library',     'testing', 'Testing Library'],

  // Tools
  ['eslint-config/prettier',                  'tools', 'Prettier'],
  ['integrations/cspell',                     'tools', 'CSpell'],
  ['eslint-config-integrations/jsdoc',        'tools', 'JSDoc'],
  ['integrations/swagger',                    'tools', 'Swagger'],
  ['eslint-config-integrations/command',      'tools', 'Command'],
  ['eslint-config-integrations/docker',       'tools', 'Docker'],
  ['eslint-config-integrations/github-actions', 'tools', 'GitHub Actions'],
  ['eslint-config-integrations/nx',           'tools', 'Nx'],
  ['integrations/pnpm/',                      'tools', 'pnpm'],

  // Libraries
  ['eslint-config-integrations/ai-sdk',        'libraries', 'AI SDK'],
  ['eslint-config-integrations/mcp',           'libraries', 'MCP'],
  ['eslint-config-integrations/mastra',        'libraries', 'Mastra'],
  ['eslint-config-integrations/openai-agents', 'libraries', 'OpenAI Agents'],
  ['eslint-config-integrations/langchain',     'libraries', 'LangChain'],
  ['eslint-config-integrations/llamaindex',    'libraries', 'LlamaIndex'],
  ['santi020k/tailwind/',                      'libraries', 'Tailwind CSS'],
  ['integrations/i18next',                     'libraries', 'i18next'],
  ['integrations/stencil',                     'libraries', 'Stencil'],
  ['storybook:recommended',                    'libraries', 'Storybook'],
  ['eslint-config-integrations/tanstack-query',  'libraries', 'TanStack Query'],
  ['eslint-config-integrations/tanstack-router', 'libraries', 'TanStack Router'],
  ['eslint-config-integrations/autogen',       'libraries', 'Autogen'],
  ['eslint-config-integrations/google-genai',  'libraries', 'Google GenAI'],
  ['eslint-config-integrations/drizzle',       'libraries', 'Drizzle ORM'],
  ['eslint-config-integrations/prisma',        'libraries', 'Prisma'],
  ['eslint-config-integrations/typeorm',       'libraries', 'TypeORM'],
  ['eslint-config-integrations/mikro-orm',     'libraries', 'MikroORM'],
  ['eslint-config-integrations/sequelize',     'libraries', 'Sequelize'],
  ['eslint-config-integrations/zod',           'libraries', 'Zod'],
  ['eslint-config-turbo/',                     'libraries', 'Turbo'],

  // Formats
  ['integrations/css/',                        'formats', 'CSS'],
  ['integrations/html/',                       'formats', 'HTML'],
  ['eslint-config-integrations/package-json',  'formats', 'Package JSON'],
  ['integrations/graphql/',                    'formats', 'GraphQL'],
  ['integrations/yaml/',                       'formats', 'YAML'],
  ['integrations/jsonc/',                      'formats', 'JSONC'],
  ['integrations/markdown',                    'formats', 'Markdown'],
  ['eslint-config-mdx/',                       'formats', 'MDX'],
  ['integrations/toml/',                       'formats', 'TOML'],

  // Extensions
  ['eslint-config/unicorn',                      'extensions', 'Unicorn'],
  ['eslint-config/sonarjs',                      'extensions', 'SonarJS'],
  ['eslint-config-integrations/security',        'extensions', 'Security'],
  ['eslint-config-integrations/perfectionist',   'extensions', 'Perfectionist'],
  ['integrations/regexp',                        'extensions', 'Regexp'],
  ['eslint-config/best-practices',               'extensions', 'Best Practices'],
  ['eslint-config-integrations/a11y/',           'extensions', 'Accessibility (a11y)'],
  ['eslint-config-integrations/biome',           'extensions', 'Biome'],
  ['eslint-config-integrations/import-boundaries', 'extensions', 'Import Boundaries'],
  ['integrations/compat/',                       'extensions', 'Browser Compat'],
  ['integrations/de-morgan/',                    'extensions', 'De Morgan'],
  ['integrations/depend/',                       'extensions', 'Depend'],
  ['integrations/node/',                         'extensions', 'Node.js'],
  ['eslint-config-integrations/no-only-tests',   'extensions', 'No Only Tests'],
  ['integrations/oxlint',                        'extensions', 'Oxlint'],
]

interface RawFlatConfigEntry {
  name?: unknown
  plugins?: unknown
  rules?: unknown
}

const DETECTED_FRAMEWORK_LABELS = new Map<string, string>([
  ['angular', 'Angular'],
  ['astro', 'Astro'],
  ['expo', 'Expo'],
  ['hono', 'Hono'],
  ['lit', 'Lit'],
  ['nest', 'NestJS'],
  ['next', 'Next.js'],
  ['nuxt', 'Nuxt'],
  ['preact', 'Preact'],
  ['qwik', 'Qwik'],
  ['react', 'React'],
  ['react-router', 'React Router'],
  ['remix', 'Remix'],
  ['slidev', 'Slidev'],
  ['solid', 'SolidJS'],
  ['svelte', 'Svelte'],
  ['tanstack-start', 'TanStack Start'],
  ['vite', 'Vite'],
  ['vue', 'Vue']
])

const FEATURE_LABELS = new Map<string, string>([
  ['best-practices', 'Best Practices'],
  ['compat', 'Browser Compat'],
  ['cspell', 'CSpell'],
  ['css', 'CSS'],
  ['cypress', 'Cypress'],
  ['de-morgan', 'De Morgan'],
  ['depend', 'Depend'],
  ['graphql', 'GraphQL'],
  ['html', 'HTML'],
  ['i18next', 'i18next'],
  ['jest', 'Jest'],
  ['jsdoc', 'JSDoc'],
  ['jsonc', 'JSONC'],
  ['markdown', 'Markdown'],
  ['mdx', 'MDX'],
  ['node', 'Node.js'],
  ['oxlint', 'Oxlint'],
  ['perfectionist', 'Perfectionist'],
  ['playwright', 'Playwright'],
  ['pnpm', 'pnpm'],
  ['prettier', 'Prettier'],
  ['regexp', 'Regexp'],
  ['security', 'Security'],
  ['sonarjs', 'SonarJS'],
  ['stencil', 'Stencil'],
  ['storybook', 'Storybook'],
  ['swagger', 'Swagger'],
  ['tailwind', 'Tailwind CSS'],
  ['tanstack-query', 'TanStack Query'],
  ['tanstack-router', 'TanStack Router'],
  ['testing-library', 'Testing Library'],
  ['toml', 'TOML'],
  ['unicorn', 'Unicorn'],
  ['vitest', 'Vitest'],
  ['yaml', 'YAML']
])

const toFeatureLabel = (value: string): string => FEATURE_LABELS.get(value) ?? value

const extractRuleNamespaces = (rules: object): string[] =>
  Object.keys(rules)
    .filter(key => key.includes('/'))
    .map(key => key.slice(0, key.indexOf('/')))

/**
 * Extracts all searchable tokens from a flat-config array:
 * config entry names, plugin keys, and rule namespace prefixes.
 */
const collectTokens = (configs: unknown[]): string[] => {
  const tokens: string[] = []

  for (const entry of configs) {
    if (!entry || typeof entry !== 'object') continue

    const cfg = entry as RawFlatConfigEntry

    // Config entry name
    if (typeof cfg.name === 'string') {
      tokens.push(cfg.name)
    }

    // Plugin keys (e.g. '@typescript-eslint', 'react', 'vue', …)
    if (cfg.plugins && typeof cfg.plugins === 'object') {
      tokens.push(...Object.keys(cfg.plugins))
    }

    // Rule namespace prefixes (e.g. '@typescript-eslint/no-…' → '@typescript-eslint')
    if (cfg.rules && typeof cfg.rules === 'object') {
      tokens.push(...extractRuleNamespaces(cfg.rules))
    }
  }

  return tokens
}

const recordFeature = (features: EslintConfigFeatures, category: string, label: string): void => {
  if (category === 'typescript') {
    features.typescript = true

    return
  }

  switch (category) {
    case 'extensions':
      features.extensions.push(label)

      break

    case 'formats':
      features.formats.push(label)

      break

    case 'frameworks':
      features.frameworks.push(label)

      break

    case 'libraries':
      features.libraries.push(label)

      break

    case 'testing':
      features.testing.push(label)

      break

    case 'tools':
      features.tools.push(label)

      break
  }
}

/**
 * Derives {@link EslintConfigFeatures} from the raw flat-config array loaded
 * from the user's `eslint.config.js`.
 */
const extractFeatures = (
  configs: unknown[],
  lintCommand: string,
  configFile: string
): EslintConfigFeatures => {
  const tokens = collectTokens(configs)

  const features: EslintConfigFeatures = {
    configFile,
    extensions: [],
    formats: [],
    frameworks: [],
    libraries: [],
    lintCommand,
    source: 'config-file',
    testing: [],
    tools: [],
    typescript: false
  }

  const seen = new Set<string>()

  for (const [pattern, category, label] of FEATURE_MAP) {
    if (seen.has(label)) continue

    const matched = tokens.some(t => t.includes(pattern))

    if (!matched) continue

    seen.add(label)

    recordFeature(features, category, label)
  }

  return features
}

/**
 * Tries each candidate config filename in order and returns the first one
 * found, or `null` when none exist.
 */
const findEslintConfig = (cwd: string): null | string => {
  for (const name of ['eslint.config.js', 'eslint.config.mjs', 'eslint.config.cjs']) {
    const p = join(cwd, name)

    if (existsSync(p)) return p
  }

  return null
}

/**
 * Reads the user's `package.json` to find the lint script (e.g. `pnpm run lint`).
 * Falls back to `npm run lint` when no script or lockfile can be identified.
 */
const detectLintCommand = (cwd: string): string => {
  // Prefer the package manager implied by lockfiles
  let pkgManager = 'npm'

  if (existsSync(join(cwd, 'pnpm-lock.yaml')) || existsSync(join(cwd, 'pnpm-workspace.yaml'))) {
    pkgManager = 'pnpm'
  } else if (existsSync(join(cwd, 'yarn.lock'))) {
    pkgManager = 'yarn'
  } else if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) {
    pkgManager = 'bun'
  }

  // Check that a `lint` script actually exists in package.json
  const pkgPath = join(cwd, 'package.json')

  try {
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as {
        scripts?: Record<string, string>
      }

      if (pkg.scripts?.lint) return `${pkgManager} run lint`
    }
  } catch {
    // ignore — fall through to default
  }

  return 'npx eslint .'
}

/**
 * Loads the user's `eslint.config.js` (or `.mjs` / `.cjs`) via dynamic
 * `import()` and derives features from the resulting flat-config array.
 *
 * Returns `null` when no config file is found or it cannot be imported.
 */
export const analyzeEslintConfig = async (cwd: string): Promise<EslintConfigFeatures | null> => {
  const configPath = findEslintConfig(cwd)

  if (!configPath) return null

  const lintCommand = detectLintCommand(cwd)

  try {
    // Dynamic import — the user's config is an ES module exporting the flat array
    const mod = await import(pathToFileURL(resolve(configPath)).href) as { default?: unknown }
    const raw = (mod.default ?? mod) as unknown
    // The export can be a direct array or a Promise (async configs)
    let configs: unknown = null

    if (Array.isArray(raw)) {
      configs = raw
    } else if (raw instanceof Promise) {
      configs = await raw
    }

    if (!Array.isArray(configs)) return null

    return extractFeatures(configs, lintCommand, configPath)
  } catch {
    return null
  }
}

// ─── Fallback: derive features from detectProjectOptions ─────────────────────

/**
 * Converts the output of `detectProjectOptions()` into `EslintConfigFeatures`
 * when the config file cannot be loaded.
 */
const featuresFromDetection = (cwd: string): EslintConfigFeatures => {
  const opts = detectProjectOptions(cwd)
  const lintCommand = detectLintCommand(cwd)
  const frameworks = (opts.detectedFrameworks ?? []).map(f => DETECTED_FRAMEWORK_LABELS.get(f) ?? f)

  return {
    configFile: null,
    extensions: (opts.extensions ?? []).map(toFeatureLabel),
    formats: (opts.formats ?? []).map(toFeatureLabel),
    frameworks,
    libraries: (opts.libraries ?? []).map(toFeatureLabel),
    lintCommand,
    source: 'detection-fallback',
    testing: (opts.testing ?? []).map(toFeatureLabel),
    tools: (opts.tools ?? []).map(toFeatureLabel),
    typescript: opts.typescript === true
  }
}

// ─── Skill content generation ─────────────────────────────────────────────────

const buildSummaryLines = (features: EslintConfigFeatures): string[] => {
  const { extensions, formats, frameworks, libraries, testing, tools, typescript } = features
  const lines: string[] = []

  lines.push(`- **TypeScript**: ${typescript ? 'enabled' : 'disabled'}`)

  if (frameworks.length > 0) lines.push(`- **Frameworks**: ${frameworks.join(', ')}`)

  if (testing.length > 0) lines.push(`- **Testing**: ${testing.join(', ')}`)

  if (tools.length > 0) lines.push(`- **Tools**: ${tools.join(', ')}`)

  if (libraries.length > 0) lines.push(`- **Libraries**: ${libraries.join(', ')}`)

  if (formats.length > 0) lines.push(`- **Formats**: ${formats.join(', ')}`)

  if (extensions.length > 0) lines.push(`- **Extensions**: ${extensions.join(', ')}`)

  return lines
}

const buildFrameworkSections = (frameworks: string[]): string[] => {
  const sections: string[] = []

  if (frameworks.some(f => f === 'React' || f === 'Next.js')) {
    sections.push(`
### React / JSX

- Prefer function components over class components
- Hooks must follow the Rules of Hooks (no conditional calls, no loops)
- Avoid inline arrow functions in JSX props where it hurts readability
- Use \`key\` props when rendering lists
`)
  }

  if (frameworks.includes('Next.js')) {
    sections.push(`
### Next.js

- Follow App Router conventions (Server Components by default, \`"use client"\` when needed)
- Avoid \`<img>\` — use \`next/image\`
- Avoid \`<a>\` for internal navigation — use \`next/link\`
`)
  }

  if (frameworks.includes('Vue')) {
    sections.push(`
### Vue

- Prefer Composition API (\`<script setup>\`) over Options API
- Use single-word or multi-word component names consistently
`)
  }

  if (frameworks.includes('Svelte')) {
    sections.push(`
### Svelte

- Virtual \`*.svelte/*.ts\` files are handled by the ESLint config — do not manually adjust \`allowDefaultProject\`
`)
  }

  if (frameworks.includes('Astro')) {
    sections.push(`
### Astro

- Virtual \`*.astro/*.ts\` files are handled by the ESLint config
- Prefer Astro components over framework components when no interactivity is needed
`)
  }

  if (frameworks.includes('Angular')) {
    sections.push(`
### Angular

- Follow the Angular style guide component, directive, and service naming conventions
- Use standalone components by default; avoid NgModule unless required
`)
  }

  return sections
}

const wrapWithFormat = (body: string, format: AgentTarget['format']): string => {
  if (format === 'frontmatter') {
    return `---
name: eslint-standards
description: >
  Code quality standards enforced by @santi020k/eslint-config-basic. Follow these
  conventions whenever writing or editing code in this project.
trigger: always_on
---

${body}`
  }

  if (format === 'cursor') {
    return `---
description: >
  ESLint code standards for this project. Apply these conventions when writing
  or editing any source file.
globs:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.vue"
  - "**/*.svelte"
  - "**/*.astro"
alwaysApply: true
---

${body}`
  }

  if (format === 'kiro') {
    return `---
inclusion: always
---

${body}`
  }

  return body
}

/**
 * Builds the skill document body from the project's {@link EslintConfigFeatures}.
 * Four format variants are produced:
 *
 * - `frontmatter` — YAML front-matter + Markdown (`.agent`, `.agents`, `.windsurf`)
 * - `cursor`      — Cursor MDC front-matter + Markdown
 * - `kiro`        — Kiro steering front-matter (`inclusion: always`) + Markdown
 * - `plain`       — pure Markdown, no front-matter (Claude Code, Copilot, Aider, Gemini, Cline, Roo Code)
 */
export const generateSkillContent = (
  features: EslintConfigFeatures,
  format: AgentTarget['format']
): string => {
  const { frameworks, libraries, lintCommand, testing, tools, typescript } = features
  // ── Summary ────────────────────────────────────────────────────────────────
  const summaryLines = buildSummaryLines(features)

  // ── TypeScript conventions ─────────────────────────────────────────────────
  const tsSection = typescript ?
    `
### TypeScript

- Use explicit type annotations on all exported functions and values
- Use \`import type\` for type-only imports
- Avoid \`any\` — prefer \`unknown\` with type guards
- Prefer \`const\` over \`let\` whenever the binding is not reassigned
- Return types must be explicit on exported functions
` :
    ''

  // ── Framework hints ────────────────────────────────────────────────────────
  const frameworkSections = buildFrameworkSections(frameworks)
  // ── Testing hints ──────────────────────────────────────────────────────────
  const testingSections: string[] = []

  if (testing.some(t => t === 'Vitest' || t === 'Jest')) {
    testingSections.push(`
### Tests

- Name test files \`*.test.ts\` or \`*.spec.ts\`
- Use \`describe\` blocks to group related cases
- Avoid testing implementation details — test observable behaviour
`)
  }

  if (testing.includes('Playwright')) {
    testingSections.push(`
### Playwright

- Place tests in a dedicated \`e2e/\` or \`tests/\` directory
- Use \`page.getByRole\` / \`page.getByText\` over CSS selectors where possible
`)
  }

  // ── Tool hints ─────────────────────────────────────────────────────────────
  const toolSections: string[] = []

  if (tools.includes('Prettier')) {
    toolSections.push(`
### Formatting

- Do not manually format — Prettier handles all formatting
- Prettier runs as the **last** ESLint config; never override its rules
`)
  }

  if (tools.includes('Tailwind CSS') || libraries.includes('Tailwind CSS')) {
    toolSections.push(`
### Tailwind CSS

- Use Tailwind utility classes directly in templates rather than hand-written CSS where possible
- The \`better-tailwindcss\` plugin enforces ordering; do not disable class-ordering rules
`)
  }

  // ── Assemble body ─────────────────────────────────────────────────────────
  const body = `# ESLint Code Standards

This project uses [\`@santi020k/eslint-config-basic\`](https://github.com/santi020k/eslint-config-basic) —
a composable ESLint 10+ Flat Config package.

**Always run \`${lintCommand}\` to validate your changes before finishing any task.**

## Active Configuration

${summaryLines.join('\n')}

## Conventions
${tsSection}${frameworkSections.join('')}${testingSections.join('')}${toolSections.join('')}
### General

- ESLint 10 **Flat Config** format only — no \`.eslintrc\` files
- Use \`.js\` extensions on relative imports (ESM requirement)
- Use \`type\` imports for type-only values; regular imports for runtime values

## Verification

\`\`\`bash
${lintCommand}
\`\`\`

If the command is unavailable, fall back to:

\`\`\`bash
npx eslint .
\`\`\`
`

  // ── Format-specific wrappers ───────────────────────────────────────────────
  return wrapWithFormat(body, format)
}

// ─── File writer ──────────────────────────────────────────────────────────────

const writeSkillFile = (filePath: string, content: string, force: boolean): boolean => {
  if (existsSync(filePath) && !force) return false

  mkdirSync(join(filePath, '..'), { recursive: true })

  writeFileSync(filePath, content, 'utf-8')

  return true
}

// ─── Guarded-section files (Copilot instructions, AGENTS.md) ──────────────────

const COPILOT_INSTRUCTIONS_PATH = '.github/copilot-instructions.md'
const AGENTS_MD_PATH = 'AGENTS.md'
const COPILOT_SECTION_START = '<!-- eslint-standards:start -->'
const COPILOT_SECTION_END   = '<!-- eslint-standards:end -->'

const buildGuardedSection = (body: string): string => (
  `${COPILOT_SECTION_START}\n${body}\n${COPILOT_SECTION_END}`
)

type GuardedSectionResult = 'skipped' | 'stale' | 'written' | null

/**
 * Appends or updates a guarded ESLint-standards section inside an existing
 * instructions file (`.github/copilot-instructions.md` or root `AGENTS.md`,
 * the open agent-instructions standard read by Codex CLI, OpenCode, Jules,
 * Amp, and many other AI coding tools).
 *
 * In check mode nothing is written; the function reports `'stale'` when the
 * section is missing or out of date and `'skipped'` when it is up to date.
 */
const handleGuardedSectionFile = (
  filePath: string,
  body: string,
  force: boolean,
  check: boolean,
  createIfMissing = false
): GuardedSectionResult => {
  const section = buildGuardedSection(body)

  if (!existsSync(filePath)) {
    if (!createIfMissing || check) return null

    writeFileSync(filePath, `# Agent instructions\n\n${section}\n`, 'utf-8')

    return 'written'
  }

  const existing = readFileSync(filePath, 'utf-8')

  if (check) {
    return existing.includes(section) ? 'skipped' : 'stale'
  }

  if (existing.includes(COPILOT_SECTION_START)) {
    if (!force) return 'skipped'

    const updated = existing.replaceAll(
      new RegExp(`${COPILOT_SECTION_START}[\\s\\S]*?${COPILOT_SECTION_END}`, 'g'), section
    )

    writeFileSync(filePath, updated, 'utf-8')

    return 'written'
  }

  writeFileSync(filePath, `${existing}\n${section}\n`, 'utf-8')

  return 'written'
}

// ─── Public API ───────────────────────────────────────────────────────────────

const resolveSkillOptions = (opts: GenerateSkillOptions) => ({
  check: opts.check ?? false,
  createAgentsMd: opts.createAgentsMd ?? false,
  cwd: opts.cwd ?? process.cwd(),
  force: opts.force ?? false
})

/**
 * Detects which AI agent folders exist in the project, reads the actual
 * `eslint.config.js` to understand what is configured, and writes a tailored
 * ESLint standards skill file into each found folder.
 *
 * Falls back to package.json auto-detection when the config file cannot be
 * dynamically imported (e.g. when running outside a built environment).
 *
 * @example
 * ```ts
 * import { generateAgentSkills } from '@santi020k/eslint-config-basic'
 *
 * const result = await generateAgentSkills({ cwd: process.cwd() })
 * process.stdout.write(`Written to: ${result.written}\n`)
 * ```
 */
export const generateAgentSkills = async (
  opts: GenerateSkillOptions = {}
): Promise<GenerateSkillResult> => {
  const { check, createAgentsMd, cwd, force } = resolveSkillOptions(opts)
  const written: string[] = []
  const skipped: string[] = []
  const stale: string[] = []
  // Primary: load the real eslint.config.js; fallback: package.json detection
  const features = (await analyzeEslintConfig(cwd)) ?? featuresFromDetection(cwd)
  const plainBody = generateSkillContent(features, 'plain')

  const recordGuardedResult = (filePath: string, result: GuardedSectionResult): void => {
    switch (result) {
      case 'skipped':
        skipped.push(filePath)

        break

      case 'stale':
        stale.push(filePath)

        break

      case 'written':
        written.push(filePath)

        break
    }
  }

  // ── Copilot instructions (append/update guarded section) ──────────────────
  const copilotPath = join(cwd, COPILOT_INSTRUCTIONS_PATH)

  recordGuardedResult(copilotPath, handleGuardedSectionFile(copilotPath, plainBody, force, check))

  // ── AGENTS.md (append/update guarded section, Codex CLI / OpenCode / etc.) ─
  const agentsMdPath = join(cwd, AGENTS_MD_PATH)

  recordGuardedResult(agentsMdPath, handleGuardedSectionFile(agentsMdPath, plainBody, force, check, createAgentsMd))

  // ── Standard agent targets ─────────────────────────────────────────────────
  for (const target of AGENT_TARGETS) {
    const agentFolder = join(cwd, target.markerFolder)

    if (!existsSync(agentFolder)) continue

    const subdir = target.skillSubdir === '.' ? agentFolder : join(agentFolder, target.skillSubdir)
    const filePath = join(subdir, target.skillFile)
    const content = generateSkillContent(features, target.format)

    if (check) {
      const upToDate = existsSync(filePath) && readFileSync(filePath, 'utf-8') === content

      if (upToDate) skipped.push(filePath)
      else stale.push(filePath)

      continue
    }

    const didWrite = writeSkillFile(filePath, content, force)

    if (didWrite) written.push(filePath)
    else skipped.push(filePath)
  }

  return { skipped, stale, written }
}

// ─── CLI handler ──────────────────────────────────────────────────────────────

export interface HandleGenerateSkillFlags {

  /** Check mode — report stale files and set a non-zero exit code, write nothing */
  check?: boolean

  /** Create a root `AGENTS.md` when it does not exist */
  createAgentsMd?: boolean
}

const resolveGenerateSkillFlags = (flags: HandleGenerateSkillFlags) => ({
  check: flags.check ?? false,
  createAgentsMd: flags.createAgentsMd ?? false
})

const outputGenerateSkillResults = (
  check: boolean,
  result: Awaited<ReturnType<typeof generateAgentSkills>>,
  cwd: string
): void => {
  if (check) {
    for (const file of result.skipped) {
      console.log(`✅ Up to date: ${file.replace(cwd + '/', '')}`)
    }

    for (const file of result.stale) {
      console.log(`❌ Stale or missing: ${file.replace(cwd + '/', '')}`)
    }

    if (result.stale.length > 0) {
      console.log(`\n⚠️  ${result.stale.length} skill file(s) are out of date. Run \`generate-skill --force\` to regenerate them.`)

      process.exitCode = 1
    } else {
      console.log('\n🎉 All agent skill files are up to date!')
    }

    return
  }

  for (const file of result.written) {
    console.log(`✅ Written: ${file.replace(cwd + '/', '')}`)
  }

  for (const file of result.skipped) {
    console.log(`⏭️  Skipped (already exists): ${file.replace(cwd + '/', '')}`)
  }

  if (result.written.length > 0) {
    console.log(`\n🎉 Generated ${result.written.length} skill file(s)!`)

    console.log('   Agents will now follow your project\'s ESLint standards automatically.')
  }

  if (result.skipped.length > 0) {
    console.log('\n💡 Tip: run with --force to overwrite existing skill files.')
  }
}

export const handleGenerateSkill = async (
  cwd: string = process.cwd(),
  force = false,
  flags: HandleGenerateSkillFlags = {}
): Promise<void> => {
  const { check, createAgentsMd } = resolveGenerateSkillFlags(flags)

  console.log(check ? '🔍 Checking AI agent skill files...' : '🔍 Scanning for AI agent folders...')

  const configFile = findEslintConfig(cwd)

  if (configFile) {
    console.log(`📄 Reading config from: ${configFile.replace(cwd + '/', '')}`)
  } else {
    console.log('⚠️  No eslint.config.js found — falling back to package.json detection.')
  }

  const result = await generateAgentSkills({ check, createAgentsMd, cwd, force })

  if (result.written.length === 0 && result.skipped.length === 0 && result.stale.length === 0) {
    console.log('\n⚠️  No agent folders found (.agent, .agents, .claude, .cursor, .windsurf, .copilot, .aider, .gemini, .clinerules, .roo, .kiro) and no AGENTS.md.')

    console.log('   Create one of those folders first (or re-run with --create to scaffold AGENTS.md).')

    return
  }

  outputGenerateSkillResults(check, result, cwd)
}
