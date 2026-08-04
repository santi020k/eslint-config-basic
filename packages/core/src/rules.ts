import type { TSESLint } from '@typescript-eslint/utils'

// ─── Import group constants ───────────────────────────────────────────────────

/**
 * All Node.js built-in module names (without the `node:` prefix).
 * Used to catch legacy `import fs from 'fs'` alongside modern `import fs from 'node:fs'`.
 */
const NODE_BUILTINS =
  'assert|async_hooks|buffer|child_process|cluster|console|crypto|' +
  'dgram|diagnostics_channel|dns|domain|events|fs|http|http2|https|inspector|' +
  'module|net|os|path|perf_hooks|process|punycode|querystring|readline|repl|' +
  'stream|string_decoder|sys|timers|tls|tty|url|util|v8|vm|wasi|worker_threads|zlib'

/**
 * Folder names that belong to the UI / presentation layer.
 * Covers Atomic Design layers, generic component dirs, and view-based naming.
 */
const UI_LAYER_NAMES =
  'layouts?|pages?|templates?|organisms?|molecules?|atoms?|components?|ui|views?|screens?'

/**
 * Folder names that belong to the application / logic layer.
 * State, data fetching, services, utilities, and cross-cutting concerns.
 */
const APP_LAYER_NAMES =
  'stores?|api|contexts?|hooks?|composables?|services?|lib|models?|' +
  'utils?|helpers?|configs?|constants?|types?|plugins?|middlewares?|ws|assets?'

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * Options for {@link createImportGroups}.
 */
export interface ImportGroupOptions {

  /**
   * Workspace / monorepo package prefixes that should sort with internal code
   * rather than external npm packages.
   *
   * They are placed in their own group **before** the external npm packages group.
   *
   * @example
   * // Treat @acme/ui, @acme/shared, etc. as internal
   * createImportGroups({ workspacePrefixes: ['@acme'] })
   */
  workspacePrefixes?: string[]
}

/**
 * Creates the `groups` array for `simple-import-sort/imports`.
 *
 * Group ordering (each becomes its own import section):
 *  1. Side effects  — polyfills, `reflect-metadata`, `zone.js`
 *  2. Node built-ins — `node:fs` and legacy `fs`
 *  3. Framework virtual modules — Vite `virtual:`, Astro `astro:`, SvelteKit `$app/$env/$lib`, Nuxt `#imports`
 *  4. Internal UI / presentation layer — `components/`, `@/pages/`, etc.
 *  5. Internal application / logic layer — `store/`, `@/hooks/`, etc.
 *  6. Style imports — `.css`, `.scss`, `.sass`, `@/styles/theme.css`, `./Button.module.css`
 *  7. Workspace packages (when `workspacePrefixes` is set) — `@acme/shared`
 *  8. External npm packages — `react`, `@tanstack/query`
 *  9. Remaining internal aliases — `@/`, `~/`, `#`, custom extras
 * 10. Parent-relative imports — `../`
 * 11. Same-directory relative imports — `./`
 *
 * **Why internal layers and styles come before externals:**
 * Bare internal paths like `components/Button` and bare CSS like `theme.css` match
 * `^@?\w`. Placing these groups first ensures correct classification before falling
 * through to the npm packages group.
 */
export const createImportGroups = (options: ImportGroupOptions = {}): string[][] => {
  const workspacePatterns = (options.workspacePrefixes ?? []).map(
    p => `^${p.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/.*|$)`
  )

  return [
    // [1] Side effects — polyfills and global module registrations
    // e.g.: import 'reflect-metadata', import 'zone.js', import '@angular/localize/init'
    ['^\\u0000'],

    // [2] Node.js built-in modules
    // Modern `node:` prefix is preferred; legacy bare names included for compatibility.
    // e.g.: import fs from 'node:fs', import path from 'path'
    ['^node:', `^(${NODE_BUILTINS})(/.*|$)`],

    // [3] Framework virtual modules — must precede externals
    // `virtual:icons` and `astro:content` also match ^@?\w, so they go here first.
    // Vite:     virtual:*
    // Astro:    astro:*
    // SvelteKit: $app/*, $env/*, $lib/*
    // Nuxt:     #imports, #build/*, #app/*
    ['^virtual:', '^astro:', '^\\$app/', '^\\$env/', '^\\$lib/', '^#imports', '^#build/', '^#app/'],

    // [4] Internal — UI / presentation layer — must precede externals
    // Bare subdirectory paths (components/Button) and @/ ~/ aliases.
    // Note: bare paths require a trailing `/` to avoid matching npm packages with
    // the same name (e.g. the `ui` npm package vs the `ui/` internal folder).
    [
      `^(${UI_LAYER_NAMES})/`,
      `^(@/|~/)(${UI_LAYER_NAMES})(/.*|$)`
    ],

    // [5] Internal — application / logic layer — must precede externals
    // Same rule: bare paths require a trailing `/`.
    [
      `^(${APP_LAYER_NAMES})/`,
      `^(@/|~/)(${APP_LAYER_NAMES})(/.*|$)`
    ],

    // [6] Style imports — must precede externals and relatives
    // Bare CSS filenames (theme.css) match ^@?\w; relative paths (./Button.module.css)
    // match relative groups. Placing styles here ensures they are always caught before
    // the externals and relative groups regardless of import style.
    // Covers: CSS Modules, plain CSS, Sass/SCSS, Less, Stylus, PostCSS
    // e.g.: import './Button.module.css', import '@/styles/globals.scss', import 'theme.sass'
    ['^.+\\.(css|scss|sass|less|styl|stylus|postcss)$'],

    // [7] Workspace / monorepo packages (optional, only when workspacePrefixes is set)
    // Inserted before external packages so @acme/shared sorts separately from @tanstack/query.
    ...(workspacePatterns.length ? [workspacePatterns] : []),

    // [8] External npm packages — scoped (@org/pkg) and unscoped (pkg)
    // @/... and ~/... aliases do NOT reach here because @ must be followed by a
    // word character (not /), so path aliases are correctly excluded.
    ['^@?\\w'],

    // [9] Remaining internal path aliases — catch-all for anything not matched above
    // @/  — common in Next.js, Vite, Vue CLI projects
    // ~/  — common in Nuxt, Vue CLI, Webpack projects
    // #   — Node.js subpath imports (e.g. #app/config) not already handled above
    ['^@/', '^~/', '^#'],

    // [10] Parent-relative imports (../) — farther ancestors first
    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

    // [11] Same-directory relative imports (./)
    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
  ]
}

/**
 * Default import sort groups used by the core config.
 * Export allows downstream packages and end users to reference or extend them.
 */
export const groups = createImportGroups()

// ─── Rules ────────────────────────────────────────────────────────────────────

export const rules: TSESLint.Linter.RulesRecord = {
  '@stylistic/array-element-newline': ['warn', 'consistent'],
  '@stylistic/arrow-parens': ['warn', 'as-needed'],
  '@stylistic/brace-style': ['warn', '1tbs'],
  '@stylistic/comma-dangle': ['warn', 'never'],
  '@stylistic/dot-location': ['warn', 'property'],
  '@stylistic/function-call-argument-newline': ['warn', 'consistent'],
  '@stylistic/function-paren-newline': ['warn', 'consistent'],
  '@stylistic/implicit-arrow-linebreak': 'warn',
  '@stylistic/indent': ['warn', 2],
  '@stylistic/lines-around-comment': ['warn', {
    allowBlockStart: true,
    allowClassStart: true,
    // JSDoc belongs to the declaration immediately following it. Requiring a
    // blank line can conflict with variable-declaration padding rules.
    ignorePattern: '^\\*'
  }],
  '@stylistic/max-len': [
    'warn',
    {
      code: 120,
      comments: 200,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
      tabWidth: 2
    }
  ],
  '@stylistic/max-statements-per-line': ['warn', { max: 1 }],
  '@stylistic/member-delimiter-style': ['error', {
    multiline: {
      delimiter: 'none',
      requireLast: false
    },
    overrides: {
      interface: {
        multiline: {
          delimiter: 'none',
          requireLast: false
        }
      }
    },
    singleline: {
      delimiter: 'comma',
      requireLast: false
    }
  }],
  '@stylistic/multiline-comment-style': 'off',
  '@stylistic/multiline-ternary': ['warn', 'always-multiline'],
  '@stylistic/no-extra-parens': 'off',
  '@stylistic/no-extra-semi': 'off',
  '@stylistic/no-multi-spaces': 'off',
  '@stylistic/object-curly-spacing': ['warn', 'always'],
  '@stylistic/object-property-newline': [
    'warn',
    { allowAllPropertiesOnSameLine: true }
  ],
  '@stylistic/operator-linebreak': ['warn', 'after'],
  '@stylistic/padded-blocks': ['warn', 'never'],
  '@stylistic/padding-line-between-statements': [
    'warn',
    { blankLine: 'always', next: '*', prev: '*' },
    { blankLine: 'any', next: 'import', prev: 'import' },
    { blankLine: 'any', next: 'export', prev: 'export' },
    { blankLine: 'any', next: 'cjs-export', prev: 'cjs-export' },
    {
      blankLine: 'always',
      next: ['const', 'let', 'var'],
      prev: ['const', 'let', 'var']
    },
    {
      blankLine: 'never',
      next: ['singleline-const', 'singleline-let', 'singleline-var'],
      prev: ['singleline-const', 'singleline-let', 'singleline-var']
    },
    { blankLine: 'always', next: 'const', prev: 'block-like' },
    { blankLine: 'always', next: 'block-like', prev: 'const' }
  ],
  '@stylistic/quote-props': ['warn', 'as-needed'],
  '@stylistic/quotes': ['warn', 'single'],
  '@stylistic/semi': ['warn', 'never'],
  'array-callback-return': 'warn',
  'arrow-body-style': ['warn', 'as-needed'],
  'brace-style': 'off',
  // External wire formats commonly use snake_case property names. Keep
  // enforcing camelCase for local bindings while leaving property keys alone.
  // We explicitly allow common OSV vulnerability properties as local bindings.
  camelcase: ['warn', {
    allow: ['database_specific', 'ecosystem_specific'],
    properties: 'never'
  }],
  'comma-dangle': 'off',
  eqeqeq: 'warn',
  'func-style': ['warn', 'expression'],
  'import/export': 'warn',
  'import/no-duplicates': 'warn',
  indent: 'off',
  // Node rules
  'n/no-extraneous-import': 'off',
  'n/no-missing-import': 'off',
  'n/no-unsupported-features/node-builtins': 'off',
  'no-constant-binary-expression': 'warn',
  'no-constant-condition': 'warn',
  'no-empty': 'warn',
  'no-fallthrough': 'warn',
  'no-nested-ternary': 'warn',
  'no-new': 'warn',
  'no-unassigned-vars': 'error',
  'no-undef': 'warn',
  'no-unused-vars': ['error', {
    args: 'after-used',
    argsIgnorePattern: '^_',
    ignoreRestSiblings: true,
    vars: 'all',
    varsIgnorePattern: '^_'
  }],
  'no-use-before-define': 'warn',
  'no-useless-assignment': 'error',
  'no-useless-constructor': 'warn',
  'no-useless-escape': 'warn',
  'no-useless-return': 'warn',
  // A standalone `void promise` is an explicit fire-and-forget marker. Other
  // uses of void remain disallowed.
  'no-void': ['warn', { allowAsStatement: true }],
  'operator-linebreak': 'off',
  'prefer-arrow-callback': ['warn', { allowNamedFunctions: true }],
  'prefer-promise-reject-errors': 'warn',
  'prefer-regex-literals': 'warn',
  'preserve-caught-error': 'error',
  // Promise rules
  'promise/always-return': 'warn',
  'promise/catch-or-return': 'warn',
  'quote-props': 'off',
  quotes: 'off',
  'simple-import-sort/imports': [
    'warn',
    { groups }
  ],
  'space-before-function-paren': 'off',
  'unused-imports/no-unused-imports': 'warn',
  'valid-typeof': 'warn'
}
