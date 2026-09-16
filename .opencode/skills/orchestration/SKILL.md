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

Use analyst and researcher only when needed. Application-code changes require relevant tester validation and code-reviewer review; questions and analysis-only tasks do not.

## Delegation template

- Objective and request type: new project / bug / feature / analysis.
- Project path and working directory (including whether the directory exists).
- Relevant context and project-memory excerpts; existing user changes to preserve.
- Expected behavior and observable acceptance criteria.
- Scope: owned files, allowed changes, exclusions, and agreed API/schema contracts.
- Dependencies and prerequisite results; do not edit files owned by another active task.
- Required validation and expected deliverables.
- Result format below.

## Specialist result template

- Status: complete / blocked / needs-decision.
- Findings or changes, with file paths and root cause where applicable.
- Validation: exact commands/checks, actual results, and not-run checks with reasons.
- Remaining risks, blockers, and required decisions.
- Proposed memory updates for project-manager; specialists do not write memory.

## Completion

Validate the final changed state. Route failures to the responsible specialist, then repeat affected checks. Missing or blocked checks are not passing checks. Reassess repeated blockers instead of looping indefinitely. PM summarizes evidence and limitations and records meaningful memory updates.
