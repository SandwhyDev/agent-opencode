---
name: testing
description: Prepare actionable manual test checklists for the user and report focused implementation checks honestly.
---

# Testing Skill

## Ownership and scope

There is no tester subagent. The responsible implementation specialist prepares manual test instructions; PM consolidates and delivers them to the user. The user performs acceptance testing. Limit automated validation to focused, quick checks by default; do not automatically run lengthy suites or add a separate testing phase. Broader automated testing is performed only when explicitly requested by the user.

## Manual test checklist

Provide verified setup/start commands, prerequisites and test data when needed. For each scenario, list numbered user actions and the expected visible result. Cover the requested change, original bug when applicable, and important nearby behavior. Separate actual checks already run from manual checks pending user testing. Return the checklist with implementation results; do not wait for the user to complete it before handing back the work.

## Testing Principle

Test the behavior that changed.

Do not only test whether the code executes.

## Bug Testing

For a bug:

1. Understand the original failure.
2. Reproduce it when possible.
3. Verify the fix.
4. Test important nearby behavior.
5. Check for regression.

## Reporting

Report:

- Test performed.
- Expected result.
- Actual result.
- Pass/fail.
- Remaining issue.

Never claim a test passed without actually running it.
