# Project Memory

This directory contains persistent project knowledge used by the Project Manager and specialist agents.

## Files

### decisions.md

Contains important technical and architectural decisions.

Examples:

- Why a framework was selected
- Why an API pattern was chosen
- Why a database structure exists
- Important trade-offs

### architecture.md

Contains the current project architecture.

Examples:

- Frontend structure
- Backend structure
- Database structure
- Services
- Integrations
- Important dependencies

### changelog.md

Contains meaningful project changes.

Do not record every tiny edit.

Record:

- New features
- Important bug fixes
- Architecture changes
- Database migrations
- Infrastructure changes
- Major refactors

---

# Memory Rules

Memory should be:

- Accurate
- Concise
- Current
- Useful for future work

Do not store temporary debugging output.

Do not store secrets.

Do not store passwords, tokens, API keys, or credentials.

When architecture changes, update architecture.md.

When an important technical decision is made, update decisions.md.

When a meaningful feature or fix is completed, update changelog.md.
