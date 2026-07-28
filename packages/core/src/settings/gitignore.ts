import fs from 'node:fs'
import path from 'node:path'

import { includeIgnoreFile } from '@eslint/config-helpers'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Creates an ESLint ignore block from the `.gitignore` at `rootDir`.
 */
export const createGitignoreConfig = (
  rootDir: string = process.cwd()
): TSESLint.FlatConfig.ConfigArray => {
  const gitignorePath = path.resolve(rootDir, '.gitignore')

  // eslint-disable-next-line security/detect-non-literal-fs-filename -- caller-selected root plus a fixed .gitignore basename
  return fs.existsSync(gitignorePath) ?
    [includeIgnoreFile(gitignorePath, 'eslint-config/gitignore')] :
    []
}
