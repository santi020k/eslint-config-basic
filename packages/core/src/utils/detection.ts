import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { type EslintConfigOptions, ExtensionOption, LibraryOption, RuntimeOption, ToolOption } from '../types.js'

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
    tools: [],
    extensions: [],
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

    options.frameworks = options.frameworks ?? {}

    const frameworks = options.frameworks

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
    if (allDeps.tailwindcss) options.libraries?.push(LibraryOption.Tailwind)

    if (allDeps.vitest) options.libraries?.push(LibraryOption.Vitest)

    if (allDeps.playwright || allDeps['@playwright/test']) options.libraries?.push(LibraryOption.Playwright)

    if (allDeps.i18next) options.libraries?.push(LibraryOption.I18next)

    if (allDeps['@stencil/core']) options.libraries?.push(LibraryOption.Stencil)

    if (allDeps.storybook || allDeps['@storybook/react']) options.libraries?.push(LibraryOption.Storybook)

    if (allDeps['@nestjs/swagger']) options.tools?.push(ToolOption.Swagger)

    // TanStack
    if (
      allDeps['@tanstack/react-query'] ||
      allDeps['@tanstack/vue-query'] ||
      allDeps['@tanstack/svelte-query'] ||
      allDeps['@tanstack/angular-query'] ||
      allDeps['@tanstack/eslint-plugin-query']
    ) {
      options.libraries?.push(LibraryOption.TanstackQuery)
    }

    if (
      allDeps['@tanstack/react-router'] ||
      allDeps['@tanstack/vue-router'] ||
      allDeps['@tanstack/eslint-plugin-router']
    ) {
      options.libraries?.push(LibraryOption.TanstackRouter)
    }

    // Auto-enable security plugin (Professional default)
    options.extensions?.push(ExtensionOption.Security)

    options.libraries = [...new Set(options.libraries)]

    options.tools = [...new Set(options.tools)]

    options.extensions = [...new Set(options.extensions)]

    return options
  } catch {
    return options
  }
}
