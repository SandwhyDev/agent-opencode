---
name: backend
description: Reusable backend engineering guidance for Node.js, Express, APIs, services, validation, authentication, integrations, and server-side architecture.
---

# Backend Skill

## Architecture

Prefer existing project patterns.

Typical separation:

- Routes
- Controllers
- Services
- Validation
- Data access

Do not introduce unnecessary layers.

## APIs

Follow existing:

- URL conventions
- HTTP methods
- Response formats
- Error formats
- Authentication patterns

## Validation

Validate external input at the appropriate boundary.

Do not trust client input.

## Error Handling

Return meaningful errors.

Do not expose sensitive internal information.

## Changes

Keep backend changes focused.

Avoid unrelated refactoring.
