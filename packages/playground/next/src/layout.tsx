import React from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'A playground for testing ESLint rules in a Next.js environment.',
  title: 'Next.js Playground'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout-container">
          <nav>
            <ul>
              <li>Home</li>
              <li>About</li>
            </ul>
          </nav>
          <main>{children}</main>
          <footer>
            <p>&copy; 2026 ESLint Config Basic Playground</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
