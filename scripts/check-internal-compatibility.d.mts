export interface InternalCompatibilityIssue {
  dependent?: string
  expectedMajor?: number
  expectedRange?: string
  foundMajor?: number
  kind: string
  package?: string
  target?: string
  version?: string
}

export interface InternalCompatibilityReport {
  edges: unknown[]
  familyMajor: null | number
  healthy: boolean
  issues: InternalCompatibilityIssue[]
  packages: { name: string, path: string, version: string }[]
}

export function createInternalCompatibilityReport(cwd: string): InternalCompatibilityReport
export function checkInternalCompatibility(cwd: string): InternalCompatibilityReport
