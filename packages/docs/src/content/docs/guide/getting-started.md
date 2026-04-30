---
title: "Getting Started"
description: "This library is a DX-first, composable ESLint 9/10+ flat-config toolkit for JavaScript and TypeScript teams. In v2, application projects install @santi020k/"
---

import { Steps, Tabs, TabItem, Card, CardGrid } from '@astrojs/starlight/components';

This library is a DX-first, composable ESLint 9/10+ flat-config toolkit for JavaScript and TypeScript teams. In v2, application projects install [`@santi020k/eslint-config-basic`](https://www.npmjs.com/package/@santi020k/eslint-config-basic) and enable bundled framework configs directly from it.

## Requirements

- Node.js `>=22.18.0`
- ESLint `9+`

## Setup Process

<Steps>
1. **Install the Base Package**

    The smallest install is the main package itself. It brings a supported ESLint version automatically.

    <Tabs>
      <TabItem label="pnpm">
      ```sh
      pnpm add -D @santi020k/eslint-config-basic
      ```
      </TabItem>
      <TabItem label="npm">
      ```sh
      npm install -D @santi020k/eslint-config-basic
      ```
      </TabItem>
      <TabItem label="yarn">
      ```sh
      yarn add -D @santi020k/eslint-config-basic
      ```
      </TabItem>
      <TabItem label="bun">
      ```sh
      bun add -d @santi020k/eslint-config-basic
      ```
      </TabItem>
    </Tabs>

2. **Create Configuration File**

    Create an `eslint.config.mjs` file, or `eslint.config.js` if your project uses `"type": "module"`.

    ```js title="eslint.config.mjs"
    import { eslintConfig } from '@santi020k/eslint-config-basic'

    export default eslintConfig()
    ```
</Steps>

## Understand the Architecture

<CardGrid>
  <Card title="Unified Entry" icon="rocket">
    `@santi020k/eslint-config-basic` is the main package. You no longer need to install framework configs directly.
  </Card>
  <Card title="Enum Based Toggles" icon="setting">
    Integrations are enabled through enums from the main package instead of scattered config objects.
  </Card>
  <Card title="Flexible Versions" icon="puzzle">
    ESLint can still be installed manually if you want to pin it yourself, as long as you stay on `^9` or `^10`.
  </Card>
</CardGrid>

## Pick the Right Starting Point

Use the links below to navigate based on your immediate needs:

- **[Configuration](/guide/configuration):** When you want to compose the config manually.
- **[CLI](/guide/cli):** When you want a generated starting file.
- **[Frameworks](/frameworks/typescript):** When you already know the application stack.
- **[Integrations](/tooling/overview):** When the main need is integrating Tailwind, Vitest, Prettier, or similar packages.
- **[Packages](/packages/basic):** When you want to understand how the monorepo is organized.

## Next Steps

- Continue with **[Detailed Installation](/guide/installation)**
- Review **[Configuration Options](/guide/configuration)**
- Use the **[CLI generator](/guide/cli)** if you want scaffolding
- Jump to **[Framework Guides](/frameworks/typescript)**
