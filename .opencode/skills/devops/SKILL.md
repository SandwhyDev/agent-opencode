---
name: devops
description: Reusable infrastructure and deployment guidance for Docker, CI/CD, environment configuration, servers, runtime, and deployment problems.
---

# DevOps Skill

## Principles

Prefer:

> existing infrastructure patterns
>
> existing environment configuration
>
> existing CI/CD pipeline structure
>
> new infrastructure design

Keep infrastructure changes focused and minimal.

## Implementation

Before changing something:

1. Inspect existing Docker/Compose configuration.
2. Inspect existing CI/CD pipeline definitions.
3. Check existing environment variable conventions.
4. Check existing deployment process and environments (dev/staging/prod).
5. Reuse established infrastructure patterns.

## Safety

Avoid:

- Destructive operations (e.g. volume/data deletion) without explicit approval.
- Changing business logic while fixing infrastructure issues.
- Modifying production configuration without validating in a lower environment first when possible.
- Broad, unrelated infrastructure refactors.

## Diagnosis

- Always check logs before assuming a root cause.
- Distinguish build-time vs runtime vs deploy-time failures.
- Check environment/config drift between environments.

## Validation

After implementation:

- Validate build succeeds.
- Validate runtime/deployment behavior.
- Check logs for new errors or warnings.
- Confirm the fix does not affect unrelated services.
