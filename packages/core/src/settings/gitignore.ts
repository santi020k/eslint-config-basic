import fs from 'node:fs'
import path from 'node:path'

import { includeIgnoreFile } from '@eslint/config-helpers'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Gitignore ESLint configuration
 * Automatically ignores files from .gitignore if it exists
 */
const gitignorePath = path.resolve(process.cwd(), '.gitignore')

export const gitignore: TSESLint.FlatConfig.ConfigArray = fs.existsSync(gitignorePath) ?
  [includeIgnoreFile(gitignorePath)] :
  []
