export interface PeerHealthIssue {
  foundVersion: null | string
  introducedBy: string
  kind: string
  owner?: string
  peer: string
  project: string
  removalCondition?: string
  wantedRange: null | string
}

export interface PeerHealthReport {
  accepted: PeerHealthIssue[]
  actionable: PeerHealthIssue[]
  healthy: boolean
  issues: PeerHealthIssue[]
}

export function createPeerHealthReport(
  cwd: string,
  rawReport: Record<string, unknown>,
  policy: {
    accepted: {
      introducedBy: string
      kind: string
      owner: string
      peer: string
      removalCondition: string
      wantedRange: null | string
    }[]
  }
): PeerHealthReport

export function checkPeerHealth(cwd: string, policyPath: string): PeerHealthReport
