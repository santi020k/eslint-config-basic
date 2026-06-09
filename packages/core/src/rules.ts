import type { TSESLint } from '@typescript-eslint/utils'

const groups: string[][] = [
  // Internal packages.
  // Atomic Design and components
  ['^(components|@/components|@components)(/.*|$)'],
  ['^(ui|@/ui|@ui)(/.*|$)'],
  ['^(atoms|@/atoms|@atoms)(/.*|$)'],
  ['^(molecules|@/molecules|@molecules)(/.*|$)'],
  ['^(organisms|@/organisms|@organisms)(/.*|$)'],
  ['^(templates|@/templates|@templates)(/.*|$)'],
  ['^(pages|@/pages|@pages)(/.*|$)'],
  // Other possible folders
  ['^(store|@/store|@store)(/.*|$)'],
  ['^(api|@/api|@api)(/.*|$)'],
  ['^(contexts|@/contexts|@contexts)(/.*|$)'],
  ['^(hooks|@/hooks|@hooks)(/.*|$)'],
  ['^(lib|@/lib|@lib)(/.*|$)'],
  ['^(services|@/services|@services)(/.*|$)'],
  ['^(models|@/models|@models)(/.*|$)'],
  ['^(utils|@/utils|@utils)(/.*|$)'],
  ['^(ws|@/ws|@ws)(/.*|$)'],
  // npm packages
  ['^\\w'],
  // Side effect imports.
  ['^\\u0000'],
  // Other relative imports. Put same-folder imports and `.` last.
  ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
  // Parent imports. Put `..` last.
  ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
  // Style imports.
  ['^.+\\.?(css|scss)$']
]

export const rules: TSESLint.Linter.RulesRecord = {
  '@stylistic/array-element-newline': ['warn', 'consistent'],
  '@stylistic/arrow-parens': ['warn', 'as-needed'],
  '@stylistic/brace-style': ['warn', '1tbs'],
  '@stylistic/comma-dangle': ['warn', 'never'],
  '@stylistic/dot-location': ['warn', 'property'],
  '@stylistic/function-call-argument-newline': ['warn', 'never'],
  '@stylistic/function-paren-newline': ['warn', 'consistent'],
  '@stylistic/implicit-arrow-linebreak': 'warn',
  '@stylistic/indent': ['warn', 2],
  '@stylistic/lines-around-comment': ['error', { allowBlockStart: true, allowClassStart: true, beforeLineComment: false }],
  '@stylistic/max-len': [
    'warn',
    {
      code: 120,
      comments: 200,
      ignoreStrings: true,
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
  '@stylistic/operator-linebreak': ['error', 'after'],
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
  camelcase: 'warn',
  'comma-dangle': 'off',
  eqeqeq: 'warn',
  'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
  'import/export': 'warn',
  'import/no-duplicates': 'warn',
  indent: 'off',
  'jsx-a11y/alt-text': 'warn',
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
  'no-void': 'warn',
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
    {
      groups
    }
  ],
  'space-before-function-paren': 'off',

  'unused-imports/no-unused-imports': 'warn',
  'valid-typeof': 'warn'
}

export { groups }
