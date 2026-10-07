export interface PublishedProvenance {
  metadata: unknown
  attestations: unknown
  name: string
  version: string
  commit: string
  repository: string
}
export function verifyProvenance(input: PublishedProvenance): void

export interface PublishedConsumerOptions {
  basic: { name: string, version: string }
  full: { name: string, version: string }
}
export function verifyPublishedConsumer(options: PublishedConsumerOptions): void

export interface ReleaseRefs {
  object: unknown
  release: unknown
  tag: string
  commit: string
}
export function verifyReleaseRefs(input: ReleaseRefs): void
