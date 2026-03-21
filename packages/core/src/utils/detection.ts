import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { type EslintConfigOptions, OptionalOption, RuntimeOption } from '../types.js'

interface PackageJson {
  dependencies?: Record<string, string | undefined>
  devDependencies?: Record<string, string | undefined>
}

/**
 * Automatically detects project settings based on package.json content
 * @param cwd Current working directory (defaults to process.cwd())
 * @returns Detected ESLint configuration options
 */
export const detectProjectOptions = (cwd: string = process.cwd()): EslintConfigOptions => {
  const packageJsonPath = join(cwd, 'package.json')

  const options: EslintConfigOptions = {
    typescript: false,
    frameworks: {},
    optionals: [],
    runtime: RuntimeOption.Universal
  }

  if (!existsSync(packageJsonPath)) {
    return options
  }

  try {
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as PackageJson
    const dependencies = pkg.dependencies ?? {}
    const devDependencies = pkg.devDependencies ?? {}

    const allDeps: Record<string, string | undefined> = {
      ...dependencies,
      ...devDependencies
    }

    const frameworks = options.frameworks!

    // Framework detection
    if (allDeps.next) {
      frameworks.next = true
      options.runtime = RuntimeOption.Universal
    }

    if (allDeps.astro) frameworks.astro = true

    if (allDeps.react && !allDeps.next && !allDeps.expo && !allDeps['react-native']) {
      frameworks.react = true
      options.runtime = RuntimeOption.Browser
    }

    if (allDeps['@nestjs/core']) {
      frameworks.nest = true
      options.runtime = RuntimeOption.Node
    }

    if (allDeps.vue) frameworks.vue = true

    if (allDeps.expo || allDeps['react-native']) frameworks.expo = true

    if (allDeps.svelte) frameworks.svelte = true

    if (allDeps['solid-js']) frameworks.solid = true

    if (allDeps['@angular/core']) frameworks.angular = true

    // Default to TS if tsconfig exists
    if (existsSync(join(cwd, 'tsconfig.json'))) {
      options.typescript = true
    }

    // Optional detection
    if (allDeps.tailwindcss) options.optionals?.push(OptionalOption.Tailwind)

    if (allDeps.vitest) options.optionals?.push(OptionalOption.Vitest)

    if (allDeps.playwright || allDeps['@playwright/test']) options.optionals?.push(OptionalOption.Playwright)

    if (allDeps.i18next) options.optionals?.push(OptionalOption.I18next)

    if (allDeps['@stencil/core']) options.optionals?.push(OptionalOption.Stencil)

    if (allDeps.storybook || allDeps['@storybook/react']) options.optionals?.push(OptionalOption.Storybook)

    if (allDeps['@nestjs/swagger']) options.optionals?.push(OptionalOption.Swagger)

    // TanStack
    if (
      allDeps['@tanstack/react-query'] ||
      allDeps['@tanstack/vue-query'] ||
      allDeps['@tanstack/svelte-query'] ||
      allDeps['@tanstack/angular-query'] ||
      allDeps['@tanstack/eslint-plugin-query']
    ) {
      options.optionals?.push(OptionalOption.TanstackQuery)
    }

    if (
      allDeps['@tanstack/react-router'] ||
      allDeps['@tanstack/vue-router'] ||
      allDeps['@tanstack/eslint-plugin-router']
    ) {
      options.optionals?.push(OptionalOption.TanstackRouter)
    }

    // Auto-enable security plugin (Professional default)
    options.optionals?.push(OptionalOption.Security)

    options.optionals = [...new Set(options.optionals)]

    return options
  } catch {
    return options
  }
}
