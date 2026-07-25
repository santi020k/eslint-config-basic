# Astro Doctor Native Integration for v2

## Status

The opt-in Astro Doctor ESLint extension ships in the 1.1.0 release line. Native, default integration with the bundled Astro configuration is planned for `@santi020k/eslint-config-basic` v2.

## Goal

Evolve the opt-in 1.1.0 extension into a native part of the bundled Astro configuration. In v2, projects that enable Astro should receive the additional performance, accessibility, security, and best-practice diagnostics without enabling a separate feature.

Astro Doctor's CLI-only capabilities remain separate:

- Project health scores
- Project-level audits
- Baselines
- Changed-file and pull-request analysis
- Machine-readable security reports
- Agent skill installation

## Current 1.1.0 Behavior

Astro Doctor is available as an opt-in extension:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  features: {
    'astro-doctor': true
  },
  frameworks: {
    astro: true
  }
})
```

The extension applies only Astro Doctor's proprietary ESLint rules. It does not duplicate the official Astro preset and does not enable CLI-only audits or scoring.

## Proposed v2 Behavior

The standard Astro configuration should enable the recommended Astro Doctor rules:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    astro: true
  }
})
```

If v2 supports framework option objects, provide an explicit escape hatch and preset selection:

```js
export default await defineConfig({
  frameworks: {
    astro: {
      doctor: true,
      doctorPreset: 'recommended'
    }
  }
})
```

The exact option shape should be finalized with the broader v2 configuration API. Astro Doctor should be enabled by default when Astro is enabled, with a documented opt-out for gradual adoption.

## Implementation Design

The integration belongs in `packages/astro`, not in the generic integrations package.

1. `packages/astro` continues to apply the official `eslint-plugin-astro` recommended configuration once.
2. Register `@santi020k/eslint-plugin-astro-doctor` under the `astro-doctor` plugin namespace.
3. Apply only Astro Doctor's proprietary rules. Do not append `astroDoctorPlugin.configs.recommended`, because that preset also includes the official Astro rules and would duplicate the existing configuration.
4. Keep the Astro Doctor dependency lazy when practical so non-Astro projects do not pay its startup cost.
5. Keep CLI project audits and scoring out of ESLint configuration.

The Astro Doctor plugin should expose a stable rules-only preset or factory so consumers do not need to assemble `RECOMMENDED_RULES` manually.

## Compatibility Requirements

Before the native integration is released:

- Align the Astro Doctor plugin's Node engine with the v2 config's supported Node range.
- Change the plugin's exact ESLint peer requirement to the compatible v2 range.
- Confirm both projects resolve the same `eslint-plugin-astro` and `astro-eslint-parser` versions.
- Verify that plugin registration does not create flat-config plugin redefinition errors.
- Define the release order so a compatible Astro Doctor version is published before the config package depends on it.

## Migration and Semver

Native enablement adds new lint findings, including rules that may report errors. Treat default enablement as a v2 behavior change and document it in the migration guide.

The migration guide should include:

- The new diagnostics enabled by default
- How to disable Astro Doctor temporarily
- How to override individual `astro-doctor/*` severities
- How to continue using the separate CLI for scoring and project audits
- How to remove manual Astro Doctor composition from an existing ESLint config

## Required Tests

- Astro configuration includes Astro Doctor rules by default in v2.
- The opt-out removes all `astro-doctor/*` rules.
- The official Astro preset is applied only once.
- Representative Doctor diagnostics execute against `.astro` files.
- Astro virtual JavaScript and TypeScript fragments continue to parse.
- Non-Astro configurations do not load or expose Astro Doctor rules.
- Package artifacts, public exports, type declarations, and dependency metadata remain valid.

## 1.1.0 Scope

For the current 1.1.0 line:

- Ship Astro Doctor as the opt-in `Extension.AstroDoctor` extension.
- Support the equivalent `features: { "astro-doctor": true }` API.
- Apply only the proprietary Astro Doctor rules.
- Keep the bundled Astro configuration unchanged unless the feature is enabled.
- Keep CLI audits, scoring, baselines, and reporting in the separate Astro Doctor package.
- Use the rest of this document as the plan for making the integration native and enabled by default in v2.
