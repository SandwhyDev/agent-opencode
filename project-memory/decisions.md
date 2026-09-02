# Technical Decisions

This file records important project decisions.

---

## Template

### [DATE] Decision Title

**Context**

What problem needed to be solved?

**Decision**

What was decided?

**Reason**

Why was this approach selected?

**Alternatives**

What alternatives were considered?

**Impact**

What are the consequences of this decision?

---

# Decisions

### [2026-09-02] Centralize project-memory writes to Project Manager only

**Context**

Skills folder (`.opencode/skills/`) was not being picked up by any agent. Investigation found two root causes: (1) skills lived at project root as a sibling of `.opencode/` instead of inside it, and (2) the project directory was not a git repository, which broke OpenCode's worktree-based skill discovery. While fixing this, it also became clear that specialist agent files (frontend.md, backend.md, etc.) never explicitly instructed agents to load their matching skill, and that there was no single owner for reading/writing project-memory.

**Decision**

- Moved `skills/` into `.opencode/skills/` and ran `git init` at the project root.
- Added an explicit "Skills" section to every implementation specialist (frontend, backend, database, devops, tester, code-reviewer) instructing them to load their matching skill at the start of a task, not after implementation.
- Created two new skills that were missing: `database` and `devops`, matching the style of existing skills.
- Made the Project Manager the sole agent responsible for reading and writing project-memory. Specialist agents report findings back to the PM instead of writing to project-memory themselves.

**Reason**

- Skill discovery requires being inside `.opencode/` and inside a git worktree — without both, skills are invisible to all agents regardless of how correct their frontmatter is.
- Skill *discovery* (appearing in `<available_skills>`) does not guarantee skill *usage*; agents need an explicit instruction to call it.
- Centralizing project-memory writes to the PM avoids conflicting or duplicated entries from multiple specialists writing independently, since the PM is the only agent with full cross-task visibility.

**Alternatives**

- Letting each specialist write directly to project-memory — rejected due to risk of duplicate/contradictory entries.
- Leaving skill folder at project root — rejected, incompatible with OpenCode's discovery mechanism.
- Disabling the global `caveman-*` skills to reduce noise — rejected for now; token cost is negligible (only names/descriptions are loaded until called) and no evidence yet of agents mis-selecting skills. Revisit if project-memory skills grow much larger or mis-selection is observed. Note: these global skills are personal to this machine and won't be present for other developers who clone this repo.

**Impact**

- All 6 implementation specialists now reliably load their matching skill before implementation work.
- `database` and `devops` specialists now have skill guidance where previously they had none.
- project-memory now has a single writer (PM), reducing risk of inconsistent records.
- Project is portable via git — required for the planned GitHub push so other developers get working skill discovery out of the box.