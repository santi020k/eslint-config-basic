import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { docsOrigin, packageDocs } from './docs-packages.mjs'

/**
 * Generate a standard README.md content for a package.
 */
const generateReadmeContent = pkg => {
  const { description, docsPath, packageName, title } = pkg

  const monorepoLine =
    'This package is part of the [`@santi020k/eslint-config-basic`](https://github.com/santi020k/eslint-config-basic) monorepo.'

  return `# ${packageName}

${description}

${monorepoLine}

- Docs: [${title}](${docsOrigin}${docsPath})
- Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Author: [santi020k](https://santi020k.com)

The canonical documentation lives on the Starlight site, so this README intentionally stays short to avoid duplication.
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
