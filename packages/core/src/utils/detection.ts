import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { ConfigOption, type EslintConfigOptions, OptionalOption, RuntimeOption } from '../types.js'

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
    config: [],
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

    // Framework detection
    if (allDeps.next) {
      options.config?.push(ConfigOption.Next)

      options.runtime = RuntimeOption.Universal // Next.js uses both server and client
    }

    if (allDeps.astro) options.config?.push(ConfigOption.Astro)

    if (allDeps.react && !allDeps.next && !allDeps.expo && !allDeps['react-native']) {
      options.config?.push(ConfigOption.React)

      options.runtime = RuntimeOption.Browser
    }

    if (allDeps['@nestjs/core']) {
      options.config?.push(ConfigOption.Nest)

      options.runtime = RuntimeOption.Node
    }

    if (allDeps.vue) options.config?.push(ConfigOption.Vue)

    if (allDeps.expo || allDeps['react-native']) options.config?.push(ConfigOption.Expo)

    if (allDeps.svelte) options.config?.push(ConfigOption.Svelte)

    if (allDeps['solid-js']) options.config?.push(ConfigOption.Solid)

    if (allDeps['@angular/core']) options.config?.push(ConfigOption.Angular)

    // Default to TS if tsconfig exists
    if (existsSync(join(cwd, 'tsconfig.json'))) {
      options.config?.push(ConfigOption.Ts)
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

    // Deduplicate in case of multi-framework matches
    options.config = [...new Set(options.config)]

    options.optionals = [...new Set(options.optionals)]

    return options
  } catch {
    return options
  }
}
