# @santi020k/eslint-config-basic

[![CI](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml/badge.svg)](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![Docs](https://img.shields.io/badge/docs-TypeDoc-blue.svg)](https://santi020k.github.io/eslint-config-basic/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to **@santi020k/eslint-config-basic**, a comprehensive and opinionated ESLint configuration package for JavaScript, TypeScript, React, and other frameworks. Born from a desire to eliminate bad practices and ensure high-quality code, this configuration automates code quality checks and reduces cognitive load during code reviews by enforcing a consistent coding style across your projects.

## Why Use This Configuration?

- **Consistency:** Enforces a uniform coding style, reducing code discrepancies and easing collaboration.
- **Quality:** Promotes best practices and helps avoid common pitfalls in JavaScript, TypeScript, Frameworks, Libraries, Tools and more.
- **Automation:** Catches issues early in the development process, minimizing manual code review effort.
- **Customization:** While it comes with strong opinions, you can tailor it to suit your project's specific needs.

## Installation

Before installing, make sure you have ESLint (version 9.0.0 or later) installed:

```bash
npm install eslint --save-dev
```

Then, install the configuration package. **Important:** I recommend using a fixed version (do not use `^` or `~`), as any new functionality or change may introduce new linter errors that require manual updates.

```bash
npm install @santi020k/eslint-config-basic --save-dev
```

## Usage

Create an `eslint.config.js` file (or update your existing one) and extend **@santi020k/eslint-config-basic** based on your project type.

### Basic Usage

For a basic JavaScript/Node.js project:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig()
  // Your custom config
]
```

### Advanced Usage

For projects that require specific configurations (e.g., TypeScript, React, Next.js, ...Etc), use the appropriate options:

```js
import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'

// TypeScript project
export default [
  ...eslintConfig({ config: [ConfigOption.Ts] })
  // Your custom config
]

// React project
export default [
  ...eslintConfig({ config: [ConfigOption.React] })
  // Your custom config
]

// TypeScript and React project
export default [
  ...eslintConfig({ config: [ConfigOption.React, ConfigOption.Ts] })
  // Your custom config
]

// Next.js project
export default [
  ...eslintConfig({ config: [ConfigOption.Next] })
  // Your custom config
]

// Expo project
export default [
  ...eslintConfig({ config: [ConfigOption.Expo] })
  // Your custom config
]

// Astro project (supports Astro with React)
export default [
  ...eslintConfig({ config: [ConfigOption.Astro] })
  // Your custom config
]

// NestJS project
export default [
  ...eslintConfig({ config: [ConfigOption.Nest] })
  // Your custom config
]
```

### Optional Usage

There are additional optional parameters to add support for other front-end/back-end technologies. This enables you to extend support as needed:

```js
import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    config: [ConfigOption.Next, ConfigOption.Ts],
    optionals: [
      // Spell checker
      OptionalOption.Cspell,
      // TailwindCss
      OptionalOption.Tailwind,
      // Vitest and testing-library
      OptionalOption.Vitest,
      // I18next
      OptionalOption.I18next,
      // Mdx
      OptionalOption.Mdx,
      // Markdown
      OptionalOption.Markdown,
      // Stencil
      OptionalOption.Stencil
    ]
  })
  // Your custom config
]
```

### Settings Usage (Experimental)

This experimental option allows ESLint to honor your `.gitignore` file:

```js
import { eslintConfig, SettingOption } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    // ESLint will ignore files specified in .gitignore
    settings: [SettingOption.Gitignore]
  })
  // Your custom config
]
```

## Monorepo Structure

This project is a monorepo managed with **Turbo** and **npm Workspaces**.

- `packages/basic`: Main package entry point.
- `packages/core`: Core logic and shared types.
- `packages/typescript`: TypeScript specific rules.
- `packages/react`: React and Hooks rules.
- `packages/next`: Next.js rules.
- `packages/astro`: Astro rules.
- `packages/expo`: Expo/React Native rules.
- `packages/optionals`: Optional configurations (Tailwind, Vitest, etc.).
- `packages/tests`: Integration tests.
- `packages/playground`: Testing playground for local development.

## Development

If you want to contribute or modify the configurations:

### Prerequisites
- Node.js (version specified in `.nvmrc`)
- npm

### Setup
```bash
npm install
```

### Useful Commands
```bash
npm run build      # Build all packages using Turbo
npm run lint       # Lint all packages
npm run test       # Run integration tests
npm run dev        # Development mode with watch
npm run inspector  # Open ESLint config inspector
npm run docs       # Generate API documentation
```

### ESLint Config Inspector

You can visually inspect the generated ESLint configuration using the built-in inspector:

```bash
npm run inspector
```

This opens an interactive UI where you can see all active rules, plugins, and config layers. It's useful for debugging which rules are applied and understanding the final merged configuration.

### API Documentation

### API Documentation

Auto-generated API docs are available online:
[**https://santi020k.github.io/eslint-config-basic/**](https://santi020k.github.io/eslint-config-basic/)

You can also generate them locally:

```bash
npm run docs
```

This outputs markdown documentation to the `docs/` directory.

## Opinionated but Flexible

This ESLint configuration is based on my personal preferences and practices, and it may evolve over time. **Important:** I recommend using a fixed version to avoid unexpected changes that might introduce new linter errors. To ensure stability, do not use `^` or `~` when specifying the version. If a rule feels too strict, consider changing it from an error to a warning to allow more flexibility during development.

## Scripts

Add the following useful scripts to your `package.json`:

```json
"scripts": {
  "lint": "eslint . --report-unused-disable-directives",
  "lint:fix": "npm run lint -- --fix"
}
```

## How to Implement in an Existing Project

1.  **Install the Dependencies:** Ensure that both ESLint and this configuration package are installed.
2.  **Update Your ESLint Configuration:** Extend **@santi020k/eslint-config-basic** in your ESLint configuration file as shown above.
3.  **Run ESLint:** Lint your project files and automatically fix issues if possible:

    ```bash
    npm run lint
    npm run lint:fix
    ```

4.  **Adjust as Necessary:** Review and modify the linting rules based on your project's needs. Some rules might be too strict or not applicable; feel free to disable or adjust them.

## Future Features

- [x] Testing
- [x] Refactored rules structure (Monorepo transition)
- [x] Astro and Expo support
- [x] Enhanced documentation
- [ ] Additional framework support (contributions welcome!):
  - [ ] Vue
  - [ ] Angular
  - [x] NestJS

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details on setting up the project, adding new configurations, and submitting pull requests.

## Acknowledgements

Special thanks to the developers and maintainers of the following libraries, which form the backbone of this ESLint configuration:

- eslint-config-standard
- eslint-plugin-import
- eslint-plugin-jsx-a11y
- eslint-plugin-n
- eslint-plugin-promise
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-simple-import-sort
- eslint-plugin-sonarjs
- eslint-plugin-unused-imports
- @stylistic/eslint-plugin
- @typescript-eslint
- @cspell/eslint-plugin
- eslint-plugin-tailwindcss
- eslint-plugin-vitest
- ...and many others

Their ongoing contributions help maintain the high standards of code quality we all strive for.

Thank you for using **@santi020k/eslint-config-basic**. Together, let's write cleaner, more maintainable code!
