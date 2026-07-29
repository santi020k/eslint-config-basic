# AI Agent Guidelines

## Dependencies and Environment Requirements

* **Node.js Engine Floor**: The `engines.node` requirement in `package.json` files should be `">=22.19.0"`. Node 20 is not supported. This floor matches the workspace's Lighthouse requirement and must stay aligned with `.nvmrc`, package manifests, documentation, and CI.

## ESLint Requirements

* **Zero Errors and Warnings**: Always leave files changed by an AI agent with no ESLint errors or warnings. Before completing a task, run `pnpm lint:changed` (or a more targeted ESLint command with `--max-warnings=0`), use `pnpm lint:changed:fix` when appropriate, and resolve every remaining issue introduced by the changes. Do not disable rules or add suppression comments merely to make the check pass.
