import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { type EslintConfigOptions, Extension, Library, Runtime, Testing, Tool } from '../types.js'

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
    libraries: [],
    testing: [],
    formats: [],
    tools: [],
    extensions: [],
    runtime: Runtime.Universal
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

    options.frameworks = options.frameworks ?? {}

    const frameworks = options.frameworks

    // Framework detection
    if (allDeps.next) {
      frameworks.next = true

      options.runtime = Runtime.Universal
    }

    if (allDeps.astro) frameworks.astro = true

    if (allDeps.react && !allDeps.next && !allDeps.expo && !allDeps['react-native']) {
      frameworks.react = true

      options.runtime = Runtime.Browser
    }

    if (allDeps['@nestjs/core']) {
      frameworks.nest = true

      options.runtime = Runtime.Node
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
    if (allDeps.tailwindcss) options.libraries?.push(Library.Tailwind)

    if (allDeps.vitest) options.testing?.push(Testing.Vitest)

    if (allDeps.playwright || allDeps['@playwright/test']) options.testing?.push(Testing.Playwright)

    if (allDeps.i18next) options.libraries?.push(Library.I18next)

    if (allDeps['@stencil/core']) options.libraries?.push(Library.Stencil)

    if (allDeps.storybook || allDeps['@storybook/react']) options.libraries?.push(Library.Storybook)

    if (allDeps['@nestjs/swagger']) options.tools?.push(Tool.Swagger)

    // TanStack
    if (
      allDeps['@tanstack/react-query'] ||
      allDeps['@tanstack/vue-query'] ||
      allDeps['@tanstack/svelte-query'] ||
      allDeps['@tanstack/angular-query'] ||
      allDeps['@tanstack/eslint-plugin-query']
    ) {
      options.libraries?.push(Library.TanstackQuery)
    }

    if (
      allDeps['@tanstack/react-router'] ||
      allDeps['@tanstack/vue-router'] ||
      allDeps['@tanstack/eslint-plugin-router']
    ) {
      options.libraries?.push(Library.TanstackRouter)
    }

    // Auto-enable security plugin (Professional default)
    options.extensions?.push(Extension.Security)

    options.libraries = [...new Set(options.libraries)]

    options.testing = [...new Set(options.testing)]

    options.formats = [...new Set(options.formats)]

    options.tools = [...new Set(options.tools)]

    options.extensions = [...new Set(options.extensions)]

    return options
  } catch {
    return options
  }
}
