export interface ReleaseSource {
  candidate?: boolean
  eventName: string
  ref: string
  repository: string
  version: string
  previousVersion?: string
  pullRequest?: {
    merged: boolean
    base: { ref: string }
    head: { ref: string, repo: { full_name: string } | null }
  }
}

export function validateReleaseSource(source: ReleaseSource): void

export function validateConsumedChangesets(fileNames: string[]): void
