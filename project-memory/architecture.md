# Project Architecture

This document describes the current architecture of the project.

---

## Overview

The workspace contains independent application projects under `projects/`.

### projects/solar-bess-simulator

Static 3D Solar Farm + BESS simulator.

- **Stack:** Three.js (r160, CDN) + vanilla JS (ES modules) + Tailwind CSS (CDN).
- **No framework, backend, database, or build tooling.**
- **Run:** open `index.html` or serve statically.
- **Structure:** `src/scene`, `src/components`, `src/simulation`, `src/ui`, `src/utils`.
- **Details:** see `projects/solar-bess-simulator/project-memory/architecture.md`.

---

## Frontend

Document:

- Framework
- Application structure
- State management
- Routing
- UI system
- API integration

Example:

```text
Frontend
├── Pages
├── Components
├── Composables
├── Stores
├── Services
└── Utilities
```
