---
name: orchestration
description: Provides reusable orchestration rules for coordinating specialist agents, dependencies, delegation, validation, and escalation.
---

# Orchestration Skill

Use this skill when coordinating multi-agent work.

## Principle

The Project Manager coordinates.

Specialists investigate and implement.

The user performs manual acceptance testing using the checklist prepared by specialists and summarized by PM. There is no tester subagent.

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
→ Reviewer
→ PM delivers manual test checklist
→ User tests manually

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

Use analyst and researcher only when needed. Application-code changes require code-reviewer review and a manual test handoff to the user. Implementation specialists may perform focused, quick checks; do not create a replacement testing agent or automatically run lengthy test suites. Broader tests require an explicit user request. Questions and analysis-only tasks do not require review or manual testing.

## Delegation template

- Objective and request type: new project / bug / feature / analysis.
- Project path and working directory (including whether the directory exists).
- Relevant context and project-memory excerpts; existing user changes to preserve.
- Expected behavior and observable acceptance criteria.
- Scope: owned files, allowed changes, exclusions, and agreed API/schema contracts.
- Dependencies and prerequisite results; do not edit files owned by another active task.
- Required validation and expected deliverables.
- Manual testing is performed by the user: provide setup steps, actions, and expected results; limit automated checks to focused, quick checks unless the user explicitly requests broader testing.
- Result format below.

## Specialist result template

- Status: complete / blocked / needs-decision.
- Findings or changes, with file paths and root cause where applicable.
- Validation: exact commands/checks, actual results, and not-run checks with reasons.
- Manual test checklist: setup/start commands, required test data, numbered actions and expected results, including the original bug and nearby behavior when applicable. Mark these as pending user testing.
- Remaining risks, blockers, and required decisions.
- Proposed memory updates for project-manager; specialists do not write memory.

## Completion

Report focused check results for the final changed state. Route failures or user-reported manual test failures to the responsible specialist, then repeat affected quick checks and update the manual checklist. Missing or blocked checks are not passing checks. Reassess repeated blockers instead of looping indefinitely. PM summarizes evidence and limitations, records meaningful memory updates, and hands off as ready for user testing without waiting for manual results. Manual acceptance remains pending until the user reports it.
