# Changelog

## [2026-09-02] Fixed skill discovery and standardized skill usage across agents

- Root cause: `skills/` folder was outside `.opencode/`, and project was not a git repo — both required for OpenCode skill discovery.
- Fix: moved skills into `.opencode/skills/`, ran `git init` at project root.
- Added explicit "Skills" section to frontend.md, backend.md, database.md, devops.md, tester.md, code-reviewer.md instructing each to load its matching skill before starting work.
- Added two new skills: `database/SKILL.md` and `devops/SKILL.md`.
- Updated project-manager.md: PM is now the sole agent that reads/writes project-memory; added routing guidance (decisions.md / changelog.md / architecture.md) and a default workflow order (analyst/researcher → implementation specialist(s) → tester → code-reviewer) with feedback-loop handling for failed tests/reviews.
- Decision recorded in decisions.md: centralizing project-memory writes to PM.

## [2026-09-01] Added projects/solar-bess-simulator

- New project: 3D Solar Farm + BESS simulator.
- Stack: Three.js (CDN) + vanilla JS ES modules + Tailwind (CDN). No framework/backend/db/build.
- Modular structure under `src/` (scene, components, simulation, ui, utils).
- Features: orbitable 3D scene, clickable objects with info panel, realtime energy simulation, animated energy flow, glassmorphism dashboard with status badges.
- Project memory created at `projects/solar-bess-simulator/project-memory/`.
