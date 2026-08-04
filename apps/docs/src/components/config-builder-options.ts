type BuilderOption = readonly [value: string, label: string]

interface FeatureGroup {
  label: string
  options: BuilderOption[]
  packageName?: string
}

const frameworks: BuilderOption[] = [
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
  ['slidev', 'Slidev'],
  ['solid', 'Solid'],
  ['svelte', 'Svelte'],
  ['tanstack-start', 'TanStack Start'],
  ['vite', 'Vite'],
  ['vue', 'Vue']
]

const v3FeatureGroups: FeatureGroup[] = [
  {
    label: 'Testing',
    packageName: '@santi020k/eslint-config-testing',
    options: [
      ['vitest', 'Vitest'],
      ['jest', 'Jest'],
      ['jest-dom', 'Jest DOM'],
      ['playwright', 'Playwright'],
      ['cypress', 'Cypress'],
      ['testing-library', 'Testing Library']
    ]
  },
  {
    label: 'Libraries',
    packageName: '@santi020k/eslint-config-libraries',
    options: [
      ['tailwind', 'Tailwind CSS'],
      ['storybook', 'Storybook'],
      ['zod', 'Zod'],
      ['prisma', 'Prisma'],
      ['drizzle', 'Drizzle'],
      ['i18next', 'i18next']
    ]
  },
  {
    label: 'Formats',
    packageName: '@santi020k/eslint-config-formats',
    options: [
      ['css', 'CSS'],
      ['html', 'HTML'],
      ['markdown', 'Markdown'],
      ['mdx', 'MDX'],
      ['package-json', 'Package JSON'],
      ['jsonc', 'JSON / JSONC'],
      ['yaml', 'YAML'],
      ['toml', 'TOML'],
      ['graphql', 'GraphQL']
    ]
  },
  {
    label: 'Tools',
    packageName: '@santi020k/eslint-config-tools',
    options: [
      ['prettier', 'Prettier'],
      ['cspell', 'CSpell'],
      ['github-actions', 'GitHub Actions'],
      ['docker', 'Docker'],
      ['nx', 'Nx'],
      ['pnpm', 'pnpm workspaces'],
      ['jsdoc', 'JSDoc'],
      ['swagger', 'Swagger']
    ]
  },
  {
    label: 'Rule extensions',
    packageName: '@santi020k/eslint-config-extensions',
    options: [
      ['a11y', 'Accessibility'],
      ['best-practices', 'Best practices'],
      ['security', 'Security'],
      ['unicorn', 'Unicorn'],
      ['perfectionist', 'Perfectionist'],
      ['regexp', 'Regular expressions']
    ]
  }
]

const v2FeatureGroups: FeatureGroup[] = [
  {
    label: 'Testing',
    options: [
      ['vitest', 'Vitest'],
      ['jest', 'Jest'],
      ['playwright', 'Playwright'],
      ['cypress', 'Cypress'],
      ['testing-library', 'Testing Library']
    ]
  },
  {
    label: 'Libraries',
    options: [
      ['tailwind', 'Tailwind CSS'],
      ['storybook', 'Storybook'],
      ['zod', 'Zod'],
      ['prisma', 'Prisma'],
      ['drizzle', 'Drizzle'],
      ['i18next', 'i18next']
    ]
  },
  {
    label: 'Formats and tools',
    options: [
      ['prettier', 'Prettier'],
      ['markdown', 'Markdown'],
      ['mdx', 'MDX'],
      ['jsonc', 'JSON / JSONC'],
      ['yaml', 'YAML'],
      ['cspell', 'CSpell'],
      ['github-actions', 'GitHub Actions']
    ]
  },
  {
    label: 'Rule extensions',
    options: [
      ['a11y', 'Accessibility'],
      ['best-practices', 'Best practices'],
      ['security', 'Security'],
      ['unicorn', 'Unicorn'],
      ['perfectionist', 'Perfectionist'],
      ['regexp', 'Regular expressions']
    ]
  }
]

export const getConfigBuilderOptions = (version: 'v2' | 'v3') => ({
  featureGroups: version === 'v3' ? v3FeatureGroups : v2FeatureGroups,
  frameworks: version === 'v2' ?
    [
      ...frameworks.slice(0, 12),
      ['remix', 'Remix'] as const,
      ...frameworks.slice(12)
    ] :
    frameworks
})
