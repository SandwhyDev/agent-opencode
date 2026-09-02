---
name: database
description: Reusable database engineering guidance for MySQL, Prisma, schema design, relations, migrations, queries, indexing, and data integrity.
---

# Database Skill

## Principles

Prefer:

> existing schema conventions
>
> existing relation patterns
>
> existing migration patterns
>
> new schema design

Keep database changes focused and minimal.

## Implementation

Before creating or changing something:

1. Search for existing tables/models that already cover the need.
2. Check existing naming conventions (tables, columns, keys).
3. Check existing relation and foreign key patterns.
4. Check existing indexing conventions.
5. Consider current data before altering schema.

## Migrations

Avoid:

- Destructive migrations unless explicitly required.
- Dropping or renaming columns/tables without a clear migration path.
- Changing types in ways that risk silent data loss.
- Large unrelated schema refactors bundled into one migration.

When a destructive change is required, state the risk explicitly before proceeding.

## Query Design

- Reuse existing query patterns and ORM conventions (e.g. Prisma client usage).
- Avoid N+1 query patterns.
- Add or reuse indexes for frequently filtered/sorted columns.
- Keep transactions scoped to what actually needs atomicity.

## Validation

After implementation:

- Validate the migration applies cleanly.
- Validate schema/query behavior against expected data.
- Check foreign key and constraint behavior.
- Check for data integrity risks on existing rows.
