import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const rootDir = process.cwd()
const sourcePath = join(rootDir, 'packages/basic/CHANGELOG.md')
const targetPath = join(rootDir, 'packages/docs/guide/changelog.md')

try {
  const content = readFileSync(sourcePath, 'utf8')
  const modifiedContent = content.replace(/^# @santi020k\/eslint-config-basic/, '# Changelog')

  writeFileSync(targetPath, modifiedContent, 'utf8')

  console.log('✅ Synchronized basic changelog to docs')
} catch (error) {
  throw new Error('❌ Failed to sync changelog', { cause: error })
}
