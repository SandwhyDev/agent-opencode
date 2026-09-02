---
name: frontend
description: Reusable frontend engineering guidance for HTML, CSS, Tailwind, JavaScript, TypeScript, Vue, Nuxt, React, Next.js, UI, and client-side applications.
---

# Frontend Skill

## Principles

Prefer:

existing architecture

> existing components
>
> existing utilities
>
> new implementation

Keep frontend changes focused.

## Implementation

Before creating something new:

1. Search for existing components.
2. Search for existing utilities.
3. Check existing styling conventions.
4. Check existing state management.
5. Reuse established patterns.

## Performance

Avoid:

- Unnecessary renders.
- Repeated allocations.
- Unnecessary dependencies.
- Large unrelated refactors.

## Validation

After implementation:

- Run relevant tests.
- Run build when applicable.
- Check browser/runtime behavior.
- Check responsive behavior when UI is affected.
