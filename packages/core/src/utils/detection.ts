import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { type EslintConfigOptions, Extension, Format, Library, NextMode, Preset, Runtime, Testing, Tool } from '../types.js'

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
    detectedFrameworks: [],
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

    options.detectedFrameworks = options.detectedFrameworks ?? []

    const detected = options.detectedFrameworks

    // Framework detection — populates detectedFrameworks (informational).
    // To enable linting for a detected framework, import its config package
    // and pass it via frameworks.<name> in eslintConfig().
    if (allDeps.next) {
      detected.push('next')

      detected.push('react') // next always implies react

      options.runtime = Runtime.Universal
    }

    if (allDeps.astro) {
      detected.push('astro')

      options.runtime = Runtime.Browser
    }

    if (allDeps.react && !allDeps.next && !allDeps.expo && !allDeps['react-native']) {
      detected.push('react')

      options.runtime = Runtime.Browser
    }

    if (allDeps['@nestjs/core']) {
      detected.push('nest')

      options.runtime = Runtime.Node
    }

    if (allDeps.vue) {
      detected.push('vue')

      options.runtime = Runtime.Browser
    }

    if (allDeps.expo || allDeps['react-native']) {
      detected.push('expo')

      detected.push('react') // expo always implies react
    }

    if (allDeps.svelte) {
      detected.push('svelte')

      options.runtime = Runtime.Browser
    }

    if (allDeps['solid-js']) {
      detected.push('solid')

      options.runtime = Runtime.Browser
    }

    if (allDeps['@angular/core']) {
      detected.push('angular')

      options.runtime = Runtime.Browser
    }

    if (allDeps['@builder.io/qwik']) {
      detected.push('qwik')

      options.runtime = Runtime.Browser
    }

    if (allDeps['@remix-run/react'] || allDeps['@remix-run/node']) {
      detected.push('remix')

      options.runtime = Runtime.Browser
    }

    options.detectedFrameworks = [...new Set(detected)]

    // Next.js routing mode detection: app/ directory = App Router, pages/ = Pages Router
    if (allDeps.next) {
      if (existsSync(join(cwd, 'app')) || existsSync(join(cwd, 'src/app'))) {
        options.nextMode = NextMode.AppRouter
      } else {
        options.nextMode = NextMode.Pages
      }
    }

    // Default to TS if tsconfig exists
    if (
      existsSync(join(cwd, 'tsconfig.json')) ||
      existsSync(join(cwd, 'tsconfig.base.json'))
    ) {
      options.typescript = true
    }

    // Optional detection
    if (allDeps.tailwindcss) options.libraries?.push(Library.Tailwind)

    if (allDeps.vitest) options.testing?.push(Testing.Vitest)

    if (allDeps.playwright || allDeps['@playwright/test']) options.testing?.push(Testing.Playwright)

    if (allDeps.jest || allDeps['@jest/core'] || allDeps['jest-circus']) options.testing?.push(Testing.Jest)

    if (allDeps.cypress) options.testing?.push(Testing.Cypress)

    if (
      allDeps['@testing-library/react'] ||
      allDeps['@testing-library/vue'] ||
      allDeps['@testing-library/angular'] ||
      allDeps['@testing-library/svelte'] ||
      allDeps['@testing-library/user-event'] ||
      allDeps['@testing-library/jest-dom'] ||
      allDeps['@testing-library/dom']
    ) {
      options.testing?.push(Testing.TestingLibrary)
    }

    if (allDeps.i18next) options.libraries?.push(Library.I18next)

    if (allDeps['@stencil/core']) options.libraries?.push(Library.Stencil)

    if (
      allDeps.storybook ||
      allDeps['@storybook/react'] ||
      allDeps['@storybook/core'] ||
      allDeps['@storybook/nextjs'] ||
      allDeps['@storybook/vue3'] ||
      allDeps['@storybook/svelte'] ||
      allDeps['@storybook/angular'] ||
      allDeps['@storybook/experimental-nextjs-vite']
    ) {
      options.libraries?.push(Library.Storybook)
    }

    if (allDeps['@nestjs/swagger']) options.tools?.push(Tool.Swagger)

    if (allDeps.prettier) options.tools?.push(Tool.Prettier)

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

    if (
      allDeps.graphql ||
      allDeps['@apollo/client'] ||
      allDeps['relay-runtime'] ||
      allDeps.urql ||
      allDeps['graphql-tag'] ||
      allDeps['@graphql-typed-document-node/core'] ||
      existsSync(join(cwd, 'schema.graphql')) ||
      existsSync(join(cwd, 'schema.gql'))
    ) {
      options.formats?.push(Format.Graphql)
    }

    // Auto-enable security plugin (Professional default)
    options.extensions?.push(Extension.Security)

    // Preset detection logic
    if (options.typescript) {
      if (options.runtime === Runtime.Node) {
        options.preset = Preset.Node
      } else if (options.runtime === Runtime.Browser) {
        options.preset = Preset.Browser
      }
    } else {
      options.preset = Preset.Basic
    }

    options.libraries = [...new Set(options.libraries)]

    options.testing = [...new Set(options.testing)]

    options.formats = [...new Set(options.formats)]

    options.tools = [...new Set(options.tools)]

    options.extensions = [...new Set(options.extensions)]

    return options
  } catch (err) {
    if (process.env.ESLINT_BASIC_DEBUG) {
      console.warn('[ESLint Basic] Failed to detect project options from package.json:', err)
    }

    return options
  }
}
