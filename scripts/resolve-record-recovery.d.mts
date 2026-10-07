import type { DocsPullRequest } from './resolve-docs-commit.mjs'

export interface RecordRecoverySource {
  repository: string
  pullRequest: DocsPullRequest & { merged: boolean }
}

export function resolveRecordRecoverySource(source: RecordRecoverySource): { commit: string, version: string }
export function isRecoveryPackageVersioned(current: { private?: boolean, version: string }, previous?: { version: string }): boolean
