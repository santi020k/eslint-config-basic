import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { docsOrigin, packageDocs } from '../config/docs-packages.mjs'

/**
 * Generate a standard README.md content for a package.
 */
const generateReadmeContent = pkg => {
  const { packageName, title, description, docsPath } = pkg

  return `# ${packageName}

${description}

This package is part of the [\`@santi020k/eslint-config-basic\`](https://github.com/santi020k/eslint-config-basic) monorepo.

- Docs: [${title}](${docsOrigin}${docsPath})
- Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Author: [santi020k](https://santi020k.com)

The canonical documentation lives on the VitePress site, so this README intentionally stays short to avoid duplication.
`
}

// Ensure scripts are run from the root
const rootDir = process.cwd()

packageDocs.forEach(pkg => {
  if (pkg.isPrivate) return // Skip private packages if desired

  const readmePath = join(rootDir, pkg.packagePath, 'README.md')
  const content = generateReadmeContent(pkg)

  try {
    writeFileSync(readmePath, content, 'utf8')

    console.log(`✅ Generated README for ${pkg.packageName} at ${pkg.packagePath}`)
  } catch (error) {
    console.error(`❌ Failed to generate README for ${pkg.packageName}:`, error.message)
  }
})

console.log('🚀 Documentation sync complete!')
