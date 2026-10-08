import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { docsOrigin, packageDocs, repositoryOrigin, websiteOrigin } from './docs-packages.mjs'
import { resolvePublishedReadmeLinks } from './readme-links.mjs'

const basicPackageName = '@santi020k/eslint-config-basic'
const reactPackageName = '@santi020k/eslint-config-react'
const vuePackageName = '@santi020k/eslint-config-vue'

const impliedFrameworkPackages = {
  '@santi020k/eslint-config-expo': [reactPackageName],
  '@santi020k/eslint-config-next': [reactPackageName],
  '@santi020k/eslint-config-nuxt': [vuePackageName],
  '@santi020k/eslint-config-react-router': [reactPackageName],
  '@santi020k/eslint-config-slidev': [vuePackageName],
  '@santi020k/eslint-config-tanstack-start': [reactPackageName]
}

const categoryExamples = {
  extensions: ['security', 'unicorn'],
  formats: ['jsonc', 'markdown'],
  libraries: ['tailwind', 'zod'],
  testing: ['playwright', 'vitest'],
  tools: ['cspell', 'prettier']
}

const generateBadges = packageName => `<p align="center">
  <a href="https://www.npmjs.com/package/${packageName}"><img src="https://img.shields.io/npm/v/${packageName}?style=flat-square&amp;color=6319be" alt="Published npm version"></a>
  <a href="${repositoryOrigin}/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="MIT license"></a>
  <a href="https://www.npmjs.com/package/${packageName}"><img src="https://img.shields.io/npm/dm/${packageName}?style=flat-square" alt="Monthly npm downloads"></a>
</p>`

const resolveInstallPackages = packageName => {
  if (packageName === '@santi020k/eslint-config-core') return `eslint ${packageName}`

  if (packageName === '@santi020k/eslint-config-typescript') return `eslint typescript ${packageName}`

  const impliedPackages = impliedFrameworkPackages[packageName] ?? []

  return `eslint ${basicPackageName} ${packageName} ${impliedPackages.join(' ')}`.trim()
}

const generateInstall = packageName => {
  const packages = resolveInstallPackages(packageName)

  return `## Installation

\`\`\`sh
npm install -D ${packages}
\`\`\``
}

const generateComposerUsage = pkg => {
  const slug = pkg.packagePath.replace('packages/', '')
  const examples = categoryExamples[slug]
  const frameworkKey = slug.includes('-') ? `'${slug}'` : slug

  if (examples) {
    return `## Usage

Enable only the features your project uses:

\`\`\`js
import { defineConfig } from '${basicPackageName}'

export default await defineConfig({
  ${slug}: [${examples.map(value => `'${value}'`).join(', ')}]
})
\`\`\`

Supported features can also be auto-detected from the project. Installing this
package makes its ${slug} available to the Basic composer; it does not enable
every feature in the package.`
  }

  return `## Usage

The Basic composer can detect this framework from the project, or you can make
the choice explicit:

\`\`\`js
import { defineConfig } from '${basicPackageName}'

export default await defineConfig({
  frameworks: { ${frameworkKey}: true }
})
\`\`\`

Use \`defineConfig()\` with no options when auto-detection is enough.`
}

const generateFoundationUsage = pkg => {
  if (pkg.packageName === '@santi020k/eslint-config-core') {
    return `## Direct usage

Most projects should use ${'`'}${basicPackageName}${'`'}, which includes this package.
For custom flat-config composition, import the core array directly:

\`\`\`js
import { coreConfig } from '@santi020k/eslint-config-core'

export default [...coreConfig]
\`\`\``
  }

  return `## Direct usage

Most projects should use ${'`'}${basicPackageName}${'`'}, which enables TypeScript
automatically. For custom flat-config composition, import the TypeScript array
directly:

\`\`\`js
import typescript from '@santi020k/eslint-config-typescript'

export default [...typescript]
\`\`\``
}

const generateCompatibility = packagePath => {
  const manifestPath = join(process.cwd(), packagePath, 'package.json')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const eslintRange = manifest.peerDependencies?.eslint ?? '^10.0.0'

  return `## Compatibility

- Node.js: \`${manifest.engines.node}\`
- ESLint: \`${eslintRange}\`
- ESM and ESLint flat config`
}

const generateInstallAndUsage = (pkg, isCompatibilityPackage, isFoundation) => {
  if (isCompatibilityPackage) {
    return `## Recommended replacement

See the [migration guide](${docsOrigin}/guide/migration-v2-to-v3/) for the
copy-paste installation and configuration steps for your project.`
  }

  const usage = isFoundation ? generateFoundationUsage(pkg) : generateComposerUsage(pkg)

  return `${generateInstall(pkg.packageName)}\n\n${usage}`
}

/**
 * Generate a standard README.md content for a package.
 */
const generateReadmeContent = pkg => {
  const { description, docsPath, packageName, readmeNotice, title } = pkg

  if (packageName === basicPackageName) {
    return resolvePublishedReadmeLinks(readFileSync(join(process.cwd(), 'README.md'), 'utf8'))
  }

  const notice = readmeNotice?.length ?
    `> [!WARNING]\n${readmeNotice.map(line => `> ${line}`).join('\n')}\n\n` :
    ''

  const isFoundation = ['@santi020k/eslint-config-core', '@santi020k/eslint-config-typescript'].includes(packageName)

  const isCompatibilityPackage = [
    '@santi020k/eslint-config-integrations',
    '@santi020k/eslint-config-lite'
  ].includes(packageName)

  const installAndUsage = generateInstallAndUsage(pkg, isCompatibilityPackage, isFoundation)
  const firstSection = isCompatibilityPackage ? 'Recommended replacement' : 'Installation'
  const usageSection = isFoundation ? 'Direct usage' : 'Usage'
  const usageLink = isCompatibilityPackage ? '' : ` · [${usageSection}](#${usageSection.toLowerCase().replaceAll(' ', '-')})`

  return `<p align="center">
  <a href="${docsOrigin}">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/workspace-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/workspace-light.svg" alt="ESLint Config Basic — Less setup. Clearer feedback." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">${title}</h1>

${description}

${generateBadges(packageName)}

<p align="center">
  <a href="${docsOrigin}${docsPath}">Documentation</a> ·
  <a href="https://www.npmjs.com/package/${packageName}">npm</a> ·
  <a href="${repositoryOrigin}/tree/main/${pkg.packagePath}">Source</a> ·
  <a href="${repositoryOrigin}/blob/main/${pkg.packagePath}/CHANGELOG.md">Changelog</a>
</p>

**On this page:** [${firstSection}](#${firstSection.toLowerCase().replaceAll(' ', '-')})${usageLink} · [Compatibility](#compatibility) · [Documentation](#documentation) · [License](#license)

${notice}Package: \`${packageName}\`.

${installAndUsage}

${generateCompatibility(pkg.packagePath)}

## Documentation

- [${title}](${docsOrigin}${docsPath})
- [Configuration guide](${docsOrigin}/guide/configuration/)
- [Package family and repository](${repositoryOrigin})
- [Changelog](${repositoryOrigin}/blob/main/${pkg.packagePath}/CHANGELOG.md)

## License

MIT © [santi020k](${websiteOrigin}). See the [license](${repositoryOrigin}/blob/main/LICENSE).
`
}

// Ensure scripts are run from the root
const rootDir = process.cwd()

for (const pkg of packageDocs) {
  if (pkg.isPrivate) continue // Skip private packages if desired

  const readmePath = join(rootDir, pkg.packagePath, 'README.md')
  const content = generateReadmeContent(pkg)

  try {
    writeFileSync(readmePath, content, 'utf8')

    process.stdout.write(`✅ Generated README for ${pkg.packageName} at ${pkg.packagePath}\n`)
  } catch (error) {
    process.stderr.write(`❌ Failed to generate README for ${pkg.packageName}: ${String(error.message)}\n`)
  }
}

process.stdout.write('🚀 Documentation sync complete!\n')
