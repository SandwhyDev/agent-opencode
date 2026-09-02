---
name: testing
description: Reusable testing guidance for bug reproduction, regression testing, unit testing, integration testing, acceptance testing, and validation.
---

# Testing Skill

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
