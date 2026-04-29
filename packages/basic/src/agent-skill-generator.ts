import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { detectProjectOptions } from './index.js'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AgentTarget {

  /** Human-readable label for logging */
  label: string

  /** Folder that must exist in cwd to be considered "present" */
  markerFolder: string

  /** Subdirectory inside the agent folder where the skill file is placed */
  skillSubdir: string

  /** File name for the generated skill */
  skillFile: string

  /** Format variant used when generating content */
  format: 'frontmatter' | 'cursor' | 'plain'
}

/**
 * Features extracted from the project's actual `eslint.config.js`.
 * All arrays hold display-friendly labels (e.g. `'TypeScript'`, `'React'`).
 */
export interface EslintConfigFeatures {
  typescript: boolean
  frameworks: string[]
  testing: string[]
  tools: string[]
  libraries: string[]
  formats: string[]
  extensions: string[]

  /** The lint command found in the project's package.json scripts, or a sensible default */
  lintCommand: string

  /** Path to the config file that was loaded, or null when falling back to detection */
  configFile: string | null

  /** Whether features came from the real config file or from package.json detection */
  source: 'config-file' | 'detection-fallback'
}

export interface GenerateSkillResult {
  written: string[]
  skipped: string[]
}

export interface GenerateSkillOptions {

  /** Working directory — defaults to process.cwd() */
  cwd?: string

  /**
   * Overwrite files that already exist.
   * @default false
   */
  force?: boolean
}

// ─── Known agent targets ──────────────────────────────────────────────────────

/**
 * All AI coding-assistant agent folders that are probed for.
 * Add new entries here as new agents emerge — the generator picks them up
 * automatically on the next run.
 */
export const AGENT_TARGETS: AgentTarget[] = [
  {
    label: '.agent (generic skill format)',
    markerFolder: '.agent',
    skillSubdir: 'skills',
    skillFile: 'eslint-standards.md',
    format: 'frontmatter'
  },
  {
    label: '.agents (generic skill format)',
    markerFolder: '.agents',
    skillSubdir: 'skills',
    skillFile: 'eslint-standards.md',
    format: 'frontmatter'
  },
  {
    label: 'Claude Code (.claude/commands)',
    markerFolder: '.claude',
    skillSubdir: 'commands',
    skillFile: 'eslint.md',
    format: 'plain'
  },
  {
    label: 'Cursor (.cursor/rules)',
    markerFolder: '.cursor',
    skillSubdir: 'rules',
    skillFile: 'eslint-standards.mdc',
    format: 'cursor'
  },
  {
    label: 'Windsurf (.windsurf/rules)',
    markerFolder: '.windsurf',
    skillSubdir: 'rules',
    skillFile: 'eslint-standards.md',
    format: 'frontmatter'
  },
  {
    label: 'Copilot (.copilot)',
    markerFolder: '.copilot',
    skillSubdir: 'instructions',
    skillFile: 'eslint-standards.md',
    format: 'plain'
  },
  {
    label: 'Aider (.aider)',
    markerFolder: '.aider',
    skillSubdir: '.',
    skillFile: 'eslint-standards.md',
    format: 'plain'
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
type FeatureCategory = 'typescript' | 'frameworks' | 'testing' | 'tools' | 'libraries' | 'formats' | 'extensions'

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
  ['eslint-config-remix/',  'frameworks', 'Remix'],
  ['eslint-config-solid/',  'frameworks', 'SolidJS'],

  // Testing
  ['optionals/vitest',         'testing', 'Vitest'],
  ['optionals/jest',           'testing', 'Jest'],
  ['optionals/playwright',     'testing', 'Playwright'],
  ['optionals/cypress',        'testing', 'Cypress'],
  ['optionals/testing-library', 'testing', 'Testing Library'],

  // Tools
  ['eslint-config/prettier',     'tools', 'Prettier'],
  ['optionals/cspell',           'tools', 'CSpell'],
  ['eslint-config-optionals/jsdoc', 'tools', 'JSDoc'],
  ['optionals/swagger',          'tools', 'Swagger'],

  // Libraries
  ['santi020k/tailwind/',                  'libraries', 'Tailwind CSS'],
  ['optionals/i18next',                    'libraries', 'i18next'],
  ['optionals/stencil',                    'libraries', 'Stencil'],
  ['optionals/storybook',                  'libraries', 'Storybook'],
  ['eslint-config-optionals/tanstack-query', 'libraries', 'TanStack Query'],
  ['eslint-config-optionals/tanstack-router', 'libraries', 'TanStack Router'],

  // Formats
  ['optionals/graphql/',  'formats', 'GraphQL'],
  ['optionals/yaml/',     'formats', 'YAML'],
  ['optionals/jsonc/',    'formats', 'JSONC'],
  ['optionals/markdown',  'formats', 'Markdown'],
  ['eslint-config-mdx/',  'formats', 'MDX'],
  ['optionals/toml/',     'formats', 'TOML'],

  // Extensions
  ['eslint-config/unicorn',                'extensions', 'Unicorn'],
  ['eslint-config/sonarjs',               'extensions', 'SonarJS'],
  ['eslint-config-optionals/security',    'extensions', 'Security'],
  ['eslint-config-optionals/perfectionist', 'extensions', 'Perfectionist'],
  ['optionals/regexp',                    'extensions', 'Regexp'],
  ['eslint-config/best-practices',        'extensions', 'Best Practices']
]

interface RawFlatConfigEntry {
  name?: unknown
  plugins?: unknown
  rules?: unknown
}

const DETECTED_FRAMEWORK_LABELS: Record<string, string> = {
  angular: 'Angular',
  astro: 'Astro',
  expo: 'Expo',
  hono: 'Hono',
  nest: 'NestJS',
  next: 'Next.js',
  qwik: 'Qwik',
  react: 'React',
  remix: 'Remix',
  solid: 'SolidJS',
  svelte: 'Svelte',
  vue: 'Vue'
}

const FEATURE_LABELS: Record<string, string> = {
  'best-practices': 'Best Practices',
  cspell: 'CSpell',
  cypress: 'Cypress',
  graphql: 'GraphQL',
  i18next: 'i18next',
  jest: 'Jest',
  jsdoc: 'JSDoc',
  jsonc: 'JSONC',
  markdown: 'Markdown',
  mdx: 'MDX',
  perfectionist: 'Perfectionist',
  playwright: 'Playwright',
  prettier: 'Prettier',
  regexp: 'Regexp',
  security: 'Security',
  sonarjs: 'SonarJS',
  stencil: 'Stencil',
  storybook: 'Storybook',
  swagger: 'Swagger',
  tailwind: 'Tailwind CSS',
  'tanstack-query': 'TanStack Query',
  'tanstack-router': 'TanStack Router',
  'testing-library': 'Testing Library',
  toml: 'TOML',
  unicorn: 'Unicorn',
  vitest: 'Vitest',
  yaml: 'YAML'
}

const toFeatureLabel = (value: string): string => FEATURE_LABELS[value] ?? value

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
      for (const key of Object.keys(cfg.rules)) {
        const slash = key.indexOf('/')

        if (slash > -1) tokens.push(key.slice(0, slash))
      }
    }
  }

  return tokens
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
    typescript: false,
    frameworks: [],
    testing: [],
    tools: [],
    libraries: [],
    formats: [],
    extensions: [],
    lintCommand,
    configFile,
    source: 'config-file'
  }

  const seen = new Set<string>()

  for (const [pattern, category, label] of FEATURE_MAP) {
    if (seen.has(label)) continue

    const matched = tokens.some(t => t.includes(pattern))

    if (!matched) continue

    seen.add(label)

    if (category === 'typescript') {
      features.typescript = true
    } else {
      features[category].push(label)
    }
  }

  return features
}

/**
 * Tries each candidate config filename in order and returns the first one
 * found, or `null` when none exist.
 */
const findEslintConfig = (cwd: string): string | null => {
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
  const frameworks = (opts.detectedFrameworks ?? []).map(f => DETECTED_FRAMEWORK_LABELS[f] ?? f)

  return {
    typescript: opts.typescript === true,
    frameworks,
    testing: (opts.testing ?? []).map(toFeatureLabel),
    tools: (opts.tools ?? []).map(toFeatureLabel),
    libraries: (opts.libraries ?? []).map(toFeatureLabel),
    formats: (opts.formats ?? []).map(toFeatureLabel),
    extensions: (opts.extensions ?? []).map(toFeatureLabel),
    lintCommand,
    configFile: null,
    source: 'detection-fallback'
  }
}

// ─── Skill content generation ─────────────────────────────────────────────────

/**
 * Builds the skill document body from the project's {@link EslintConfigFeatures}.
 * Three format variants are produced:
 *
 * - `frontmatter` — YAML front-matter + Markdown (`.agent`, `.agents`, `.windsurf`)
 * - `cursor`      — Cursor MDC front-matter + Markdown
 * - `plain`       — pure Markdown, no front-matter (Claude Code, Copilot, Aider)
 */
export const generateSkillContent = (
  features: EslintConfigFeatures,
  format: AgentTarget['format']
): string => {
  const { typescript, frameworks, testing, tools, libraries, formats, extensions, lintCommand } = features
  // ── Summary ────────────────────────────────────────────────────────────────
  const summaryLines: string[] = []

  summaryLines.push(`- **TypeScript**: ${typescript ? 'enabled' : 'disabled'}`)

  if (frameworks.length > 0) summaryLines.push(`- **Frameworks**: ${frameworks.join(', ')}`)

  if (testing.length > 0)    summaryLines.push(`- **Testing**: ${testing.join(', ')}`)

  if (tools.length > 0)      summaryLines.push(`- **Tools**: ${tools.join(', ')}`)

  if (libraries.length > 0)  summaryLines.push(`- **Libraries**: ${libraries.join(', ')}`)

  if (formats.length > 0)    summaryLines.push(`- **Formats**: ${formats.join(', ')}`)

  if (extensions.length > 0) summaryLines.push(`- **Extensions**: ${extensions.join(', ')}`)

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
  const frameworkSections: string[] = []

  if (frameworks.some(f => f === 'React' || f === 'Next.js')) {
    frameworkSections.push(`
### React / JSX

- Prefer function components over class components
- Hooks must follow the Rules of Hooks (no conditional calls, no loops)
- Avoid inline arrow functions in JSX props where it hurts readability
- Use \`key\` props when rendering lists
`)
  }

  if (frameworks.includes('Next.js')) {
    frameworkSections.push(`
### Next.js

- Follow App Router conventions (Server Components by default, \`"use client"\` when needed)
- Avoid \`<img>\` — use \`next/image\`
- Avoid \`<a>\` for internal navigation — use \`next/link\`
`)
  }

  if (frameworks.includes('Vue')) {
    frameworkSections.push(`
### Vue

- Prefer Composition API (\`<script setup>\`) over Options API
- Use single-word or multi-word component names consistently
`)
  }

  if (frameworks.includes('Svelte')) {
    frameworkSections.push(`
### Svelte

- Virtual \`*.svelte/*.ts\` files are handled by the ESLint config — do not manually adjust \`allowDefaultProject\`
`)
  }

  if (frameworks.includes('Astro')) {
    frameworkSections.push(`
### Astro

- Virtual \`*.astro/*.ts\` files are handled by the ESLint config
- Prefer Astro components over framework components when no interactivity is needed
`)
  }

  if (frameworks.includes('Angular')) {
    frameworkSections.push(`
### Angular

- Follow the Angular style guide component, directive, and service naming conventions
- Use standalone components by default; avoid NgModule unless required
`)
  }

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

This project uses [\`@santi020k/eslint-config-basic\`](https://github.com/santi020k/eslint-config-basic) — a composable ESLint 9/10+ Flat Config package.

**Always run \`${lintCommand}\` to validate your changes before finishing any task.**

## Active Configuration

${summaryLines.join('\n')}

## Conventions
${tsSection}${frameworkSections.join('')}${testingSections.join('')}${toolSections.join('')}
### General

- ESLint 9/10 **Flat Config** format only — no \`.eslintrc\` files
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

  // plain — no front-matter
  return body
}

// ─── File writer ──────────────────────────────────────────────────────────────

const writeSkillFile = (filePath: string, content: string, force: boolean): boolean => {
  if (existsSync(filePath) && !force) return false

  mkdirSync(join(filePath, '..'), { recursive: true })

  writeFileSync(filePath, content, 'utf-8')

  return true
}

// ─── GitHub Copilot special case ──────────────────────────────────────────────

const COPILOT_INSTRUCTIONS_PATH = '.github/copilot-instructions.md'
const COPILOT_SECTION_START = '<!-- eslint-standards:start -->'
const COPILOT_SECTION_END   = '<!-- eslint-standards:end -->'

const handleCopilotInstructions = (
  cwd: string,
  body: string,
  force: boolean
): 'written' | 'skipped' | null => {
  const filePath = join(cwd, COPILOT_INSTRUCTIONS_PATH)

  if (!existsSync(filePath)) return null

  const existing = readFileSync(filePath, 'utf-8')

  if (existing.includes(COPILOT_SECTION_START)) {
    if (!force) return 'skipped'

    const updated = existing.replace(
      new RegExp(`${COPILOT_SECTION_START}[\\s\\S]*?${COPILOT_SECTION_END}`, 'g'), `${COPILOT_SECTION_START}\n${body}\n${COPILOT_SECTION_END}`
    )

    writeFileSync(filePath, updated, 'utf-8')

    return 'written'
  }

  writeFileSync(
    filePath, `${existing}\n${COPILOT_SECTION_START}\n${body}\n${COPILOT_SECTION_END}\n`, 'utf-8'
  )

  return 'written'
}

// ─── Public API ───────────────────────────────────────────────────────────────

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
 * console.log('Written to:', result.written)
 * ```
 */
export const generateAgentSkills = async (
  opts: GenerateSkillOptions = {}
): Promise<GenerateSkillResult> => {
  const cwd = opts.cwd ?? process.cwd()
  const force = opts.force ?? false
  const written: string[] = []
  const skipped: string[] = []
  // Primary: load the real eslint.config.js; fallback: package.json detection
  const features = (await analyzeEslintConfig(cwd)) ?? featuresFromDetection(cwd)
  const plainBody = generateSkillContent(features, 'plain')
  // ── Copilot instructions (append/update guarded section) ──────────────────
  const copilotResult = handleCopilotInstructions(cwd, plainBody, force)

  if (copilotResult === 'written') written.push(join(cwd, COPILOT_INSTRUCTIONS_PATH))
  else if (copilotResult === 'skipped') skipped.push(join(cwd, COPILOT_INSTRUCTIONS_PATH))

  // ── Standard agent targets ─────────────────────────────────────────────────
  for (const target of AGENT_TARGETS) {
    const agentFolder = join(cwd, target.markerFolder)

    if (!existsSync(agentFolder)) continue

    const subdir = target.skillSubdir === '.' ? agentFolder : join(agentFolder, target.skillSubdir)
    const filePath = join(subdir, target.skillFile)
    const content = generateSkillContent(features, target.format)
    const didWrite = writeSkillFile(filePath, content, force)

    if (didWrite) written.push(filePath)
    else skipped.push(filePath)
  }

  return { written, skipped }
}

// ─── CLI handler ──────────────────────────────────────────────────────────────

export const handleGenerateSkill = async (
  cwd: string = process.cwd(),
  force = false
): Promise<void> => {
  console.log('🔍 Scanning for AI agent folders...')

  const configFile = findEslintConfig(cwd)

  if (configFile) {
    console.log(`📄 Reading config from: ${configFile.replace(cwd + '/', '')}`)
  } else {
    console.log('⚠️  No eslint.config.js found — falling back to package.json detection.')
  }

  const result = await generateAgentSkills({ cwd, force })

  if (result.written.length === 0 && result.skipped.length === 0) {
    console.log(
      '\n⚠️  No agent folders found (.agent, .agents, .claude, .cursor, .windsurf, .copilot, .aider).'
    )

    console.log('   Create one of those folders first, then re-run this command.')

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
