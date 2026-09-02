---
name: orchestration
description: Provides reusable orchestration rules for coordinating specialist agents, dependencies, delegation, validation, and escalation.
---

# Orchestration Skill

Use this skill when coordinating multi-agent work.

## Principle

The Project Manager coordinates.

Specialists investigate and implement.

Tester validates.

Code Reviewer reviews.

## Delegation

Every delegated task should include:

- Objective
- Context
- Expected behavior
- Constraints
- Relevant files
- Dependencies
- Expected output
- Validation requirements

## Dependencies

Use sequential execution when one task depends on another.

Example:

Database
→ Backend
→ Frontend
→ Tester
→ Reviewer

Use parallel execution only when tasks are independent.

## Bug Escalation

When validation fails:

1. Identify the responsible domain.
2. Delegate the correction.
3. Re-run validation.
4. Review again when necessary.

Never personally fix application code as the orchestrator.

## Minimal Agent Principle

Use the smallest number of agents required.

Do not involve analyst, researcher, tester, or reviewer when their involvement provides no meaningful value.
