import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const rootDir = process.cwd()
const sourcePath = join(rootDir, 'packages/basic/CHANGELOG.md')
const targetPath = join(rootDir, 'apps/docs/src/content/docs/guide/changelog.md')

try {
  const content = readFileSync(sourcePath, 'utf8')

  const modifiedContent = content.replace(
    /^# @santi020k\/eslint-config-basic/, '---\ntitle: "Changelog"\ndescription: "Release history for @santi020k/eslint-config-basic."\n---\n\n# Changelog'
  )

  writeFileSync(targetPath, modifiedContent, 'utf8')

  process.stdout.write('✅ Synchronized basic changelog to docs\n')
} catch (error) {
  throw new Error('❌ Failed to sync changelog', { cause: error })
}
