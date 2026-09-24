import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { docsOrigin, packageDocs, repositoryOrigin, websiteOrigin } from './docs-packages.mjs'

const basicPackageName = '@santi020k/eslint-config-basic'

const categoryExamples = {
  extensions: ['security', 'unicorn'],
  formats: ['jsonc', 'markdown'],
  libraries: ['tailwind', 'zod'],
  testing: ['playwright', 'vitest'],
  tools: ['cspell', 'prettier']
}

const generateBadges = packageName => `[![npm version](https://img.shields.io/npm/v/${packageName}.svg)](https://www.npmjs.com/package/${packageName})
[![npm downloads](https://img.shields.io/npm/dm/${packageName}.svg)](https://www.npmjs.com/package/${packageName})
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](${repositoryOrigin}/blob/main/LICENSE)`

const resolveInstallPackages = packageName => {
  if (packageName === '@santi020k/eslint-config-core') return `eslint ${packageName}`

  if (packageName === '@santi020k/eslint-config-typescript') return `eslint typescript ${packageName}`

  return `eslint ${basicPackageName} ${packageName}`
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
    return readFileSync(join(process.cwd(), 'README.md'), 'utf8')
      .replaceAll('(LICENSE)', `(${repositoryOrigin}/blob/main/LICENSE)`)
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

  return `# ${packageName}

${notice}${description}

${generateBadges(packageName)}

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
