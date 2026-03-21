import React from 'react'

interface Feature {
  id: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    id: 'f1',
    title: 'Flat Config',
    description: 'Uses the latest ESLint 9 Flat Config format.'
  },
  {
    id: 'f2',
    title: 'Composable',
    description: 'Easily combine different rule sets for your project.'
  },
  {
    id: 'f3',
    title: 'Type-Safe',
    description: 'Deep integration with TypeScript for robust development.'
  }
]

export default function Page() {
  return (
    <div className="page-wrapper">
      <h1>Next.js Playground</h1>
      <p>This is a more comprehensive Next.js example demonstrating ESLint rules.</p>

      <section className="features-grid">
        {
          features.map(feature => (
            <article key={feature.id}>
              <h2>
                {feature.title}
              </h2>
              <p>
                {feature.description}
              </p>
            </article>
          ))
        }
      </section>

      <section className="info-box">
        <h3>Did you know?</h3>
        <p>
          This playground is part of the
          {' '}
          <code>@santi020k/eslint-config-basic</code>
          {' '}
          package.
        </p>
      </section>
    </div>
  )
}
