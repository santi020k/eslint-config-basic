---
name: marketing
description: Content strategy, copy, and discoverability for the eslint.santi020k.com documentation site. Use this skill when writing landing page copy, guide introductions, package descriptions, changelog summaries, release announcements, social media posts, or any task aimed at communicating the library's value clearly and attracting developers. Trigger on mentions of copy, landing page, headline, CTA, call to action, release notes, social media, marketing, brand voice, or converting visitors.
---

# Marketing Skill — eslint.santi020k.com

This is a documentation site for `@santi020k/eslint-config-basic`, a developer tool. The audience is JavaScript/TypeScript developers evaluating or actively using ESLint flat config. The brand voice is **senior, clear, calm, and developer-first** — useful without hype (per `BRANDING.md`).

---

## Brand Voice

- **Tone**: Direct and confident. No filler intros ("In today's fast-paced world..."), no overclaiming ("the best ESLint config ever").
- **Technical depth**: Assume the reader knows ESLint. Don't over-explain `extends` vs flat config — explain *this library's* specific decisions.
- **Length**: Be concise. Every sentence should earn its place. A short example beats three paragraphs of prose.
- **Person**: Second person ("you", "your project") for guides. First person plural ("we") for architectural decisions and changelog entries.

---

## Homepage / Splash Page Copy

The hero answers three questions in ≤ 5 seconds:
1. What is this?
2. What problem does it solve?
3. How do I start?

**Structure:**
```
[Product identity — one line, large]
[Value proposition — 1–2 sentences on the pain it removes]
[Primary CTA] [Secondary CTA]
```

**Current tagline direction** (from `index.md`):
> Stop wrestling with configuration. Compose intelligent, strict, and framework-aware ESLint rules across React, Next.js, Astro, Vue, Svelte, and 10+ modern frameworks instantly.

When revising hero copy, reinforce these three differentiators:
1. **Zero peer-dependency hell** — `eslint` and `@eslint/js` are included, versioned, tested
2. **Auto-detection** — `eslintConfig()` with no args works out of the box
3. **ESLint 9 AND 10** — breadth that other configs lack

**CTAs** — verb-first, specific:

| Instead of... | Use... |
|---|---|
| Learn more | Read the quick start |
| Get started | Set up in 2 minutes |
| Documentation | See all frameworks |
| Changelog | What's new in v2 |

---

## Guide Page Introductions

Each framework/tooling guide should open with a 2–3 sentence intro answering:
- What does this package add? (rules, plugins)
- When do you need it? (file types, use cases)
- Any notable opinionated decisions?

**Example (React guide intro):**
> `@santi020k/eslint-config-react` adds React Hooks rules, JSX conventions, and React-specific best practices on top of the base config. It activates automatically when `eslintConfig()` detects React in your dependencies.

Avoid repeating the installation steps — link to the Getting Started guide instead.

---

## Package / API Description Copy

Package pages (`packages/basic.md`, `packages/core.md`, etc.) need a clear one-liner and a short description of the public surface:

**Template:**
```
## @santi020k/eslint-config-[name]

[One sentence: what it exports and what it configures]

[1–2 sentences on when to use it directly vs. through the basic package]
```

Keep these under 100 words. Developers read package descriptions to confirm they're in the right place — don't oversell.

---

## Changelog / Release Announcements

### In CHANGELOG.md

Changesets generates these. When writing the changeset summary (`.changeset/*.md`), use present-tense imperative:

```
Add Hono framework support with runtime-aware rules
Fix circular fix warning between perfectionist and simple-import-sort
Update eslint-plugin-unicorn to v65, remove dropped better-regex rule
```

Not:
```
Added support for...
We fixed a bug where...
```

### Social media (release posts)

**Twitter/X format:**
```
🚀 @santi020k/eslint-config-basic v[X.Y.Z]

[1 headline change — the most impactful thing]

[2–3 bullet changes with emoji]
• ✨ ...
• 🐛 ...
• 📦 ...

eslint.santi020k.com/guide/getting-started
```

**LinkedIn format:**
```
Just shipped v[X.Y.Z] of @santi020k/eslint-config-basic.

[The problem this release solves in 1–2 sentences]

Key changes:
[3–4 bullet points, concrete and specific]

If you're using ESLint flat config with [framework], this update is worth checking out.

[Link]
```

---

## Content Gaps to Prioritize

When adding new documentation, prioritize in this order:

1. **New framework package** — each new framework should have a dedicated guide page immediately on release
2. **Migration guides** — breaking changes need a dedicated guide, not just changelog entries
3. **Troubleshooting FAQ** — the most common issues surfaced in GitHub issues
4. **Integration recipes** — real-world `eslint.config.js` examples for common stacks (Next.js + TypeScript + Vitest, etc.)

---

## Writing Checklist

Before publishing any new or updated docs page:

- [ ] Opening paragraph answers "what is this and why does it matter" in ≤ 3 sentences
- [ ] Code examples are complete and copy-pasteable (no `...` placeholders unless explained)
- [ ] All CTAs are verb-first and specific
- [ ] No marketing filler phrases ("powerful", "seamless", "effortless")
- [ ] Technical terms are used precisely (flat config, not just "config"; rule, not "check")
- [ ] Links to related pages are natural and descriptive
