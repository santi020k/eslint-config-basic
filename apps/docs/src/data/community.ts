const repository = 'https://github.com/santi020k/eslint-config-basic'

export const communityLinks = {
  bugs: `${repository}/issues/new?template=bug_report.yml`,
  ideas: `${repository}/issues/new?template=feature_request.yml`,
  issues: `${repository}/issues`,
  questions: `${repository}/issues/new?template=question.yml`,
  security: `${repository}/security/advisories/new`
} as const

export const documentationIssueUrl = (pathname: string, title: string): string => {
  const url = new URL(`${repository}/issues/new`)

  url.searchParams.set('template', 'documentation.yml')

  url.searchParams.set('title', `Docs: ${title}`)

  // Share only the documentation path; builder query strings can contain project choices.
  url.searchParams.set('page', `https://eslint.santi020k.com${pathname}`)

  return url.href
}
