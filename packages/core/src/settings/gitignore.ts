import { includeIgnoreFile } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Gitignore ESLint configuration
 * Automatically ignores files from .gitignore
 */
export const gitignore: TSESLint.FlatConfig.ConfigArray = [
  includeIgnoreFile(`${process.cwd()}/.gitignore`) as TSESLint.FlatConfig.Config
]
