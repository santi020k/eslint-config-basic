export interface FullReleaseReport {
  changedDependencies: string[]
  fullReleasePresent: boolean
  fullReleaseRequired: boolean
  valid: boolean
}

export function parseChangesetPackages(content: string): string[]

export function createFullReleaseReport(
  fullDependencies: string[],
  changesets: string[]
): FullReleaseReport

export function checkFullRelease(cwd: string): FullReleaseReport
