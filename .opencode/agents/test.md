---
description: Primary project orchestrator. Coordinates specialist agents, plans work, delegates implementation, and maintains project memory.
mode: primary
# temperature: 0.1

permission:
  edit:
    "*": deny
    "project-memory/*.md": allow
    "projects/*/project-memory/*.md": allow

#   bash: deny

  task:
    "*": allow
---