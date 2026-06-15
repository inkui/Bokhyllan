# Table Runtime Model Audit

## Purpose

This audit compares the Phase T2 runtime table model in `lib/tables/` against `docs/TABLE_DATA_CONTRACT.md`.

It is documentation plus minimal type alignment only. It does not add real table content, assign books, change UI, routing, recommendation logic, Atlas, reveal, affiliate, analytics, or runtime behavior.

## Files Inspected

- `docs/TABLE_DATA_CONTRACT.md`
- `docs/TABLE_SYSTEM_DEFINITION.md`
- `docs/TABLE_SET_V1.md`
- `lib/tables/table.ts`
- `lib/tables/table-membership.ts`
- `lib/tables/table-capacity.ts`
- `lib/tables/index.ts`

## What Matches

### Atlas To Table To Book

The T2 model preserves the core authority chain:

- Atlas routes to a table.
- The table holds curator-authored book membership.
- Books are referenced by `bookId`.

The code comments in `table.ts`, `table-membership.ts`, and `table-capacity.ts` explicitly state that Atlas does not select books directly.

### Table As Curator Artifact

The model represents tables as authored objects with:

- `purpose`
- `readerMoment`
- `curatorIntent`
- `membership`
- `capacityGuidance`
- `qualityGuidance`

This matches the contract's requirement that a table be more than a metadata category or generated candidate set.

### Membership Roles

`TableMembershipRole` supports all required roles:

- `lead`
- `supporting`
- `alternative`
- `surprise`

This matches the contract's anatomy of a table.

### Closed Membership

`Table.membership` is an explicit array of authored placements. The model does not include score queries, dynamic filters, behavioral signals, affiliate availability, or generated membership.

### Capacity As Within-Table Guidance

`TableCapacityGuidance` represents capacity guidance as authored instructions, not computed ranking. It supports reading energy, difficulty tolerance, and entry rules.

### No Forbidden Runtime Signals

The T2 model does not contain:

- ranking scores
- AI confidence values
- recommendation weights
- click-through data
- save-rate data
- affiliate availability
- behavioral optimization fields

This matches the contract's exclusions.

## What Differed

The T2 model was intentionally conservative because the contract file was not present during T2. After reviewing the contract, several concepts needed slightly more explicit representation.

### Version Marker

Contract requirement:

- A table identity includes a version marker.

T2 state:

- `Table` had `id` and `name`, but no explicit version.

Adjustment:

- Added `version: string` to `Table` and `TableSummary`.

### Display Name

Contract requirement:

- Stable identifier and display name are distinct.

T2 state:

- `id` represented the stable identifier.
- `name` represented the display name concept implicitly.

Adjustment:

- Added `displayName: string`.
- Kept `name` as an existing readable alias until a future authoring format decides whether to keep both.

### Human Moment Statement

Contract requirement:

- The human moment should be statable in plain language from the reader's perspective.

T2 state:

- `TableReaderMoment.summary` represented the human moment.

Adjustment:

- Added optional `readerStatement?: string` for a reader-perspective sentence without replacing `summary`.

### Named Lead Decision

Contract requirement:

- The lead book must be a named decision, not merely the highest-ranked member.

T2 state:

- Lead could be represented through a `TableMembership` with role `lead`, but there was no explicit lead reference on the table.

Adjustment:

- Added optional `leadBookId?: string`.
- Added optional `leadMembershipId?: string`.

These remain optional at the type level so draft table artifacts can exist before completion. Future validation should enforce lead presence for active/ready tables.

### Surprise Designation

Contract requirement:

- Every ready table must include at least one designated surprise book.

T2 state:

- Surprise could be represented through membership role `surprise`.

Adjustment:

- Added optional `surpriseBookIds?: string[]` as a table-level summary of designated surprise books.

Future validation should ensure this matches membership entries.

### Named Capacity Entry Points

Contract requirement:

- Capacity guidance should identify low-capacity and high-capacity entry points.

T2 state:

- `entryRules` could represent this, but the named entry points were not explicit.

Adjustment:

- Added `TableCapacityEntryPoint`.
- Added optional `lowCapacityEntry` and `highCapacityEntry` to `TableCapacityGuidance`.

## What Was Adjusted

Files changed:

- `lib/tables/table.ts`
- `lib/tables/table-capacity.ts`
- `lib/tables/index.ts`
- `docs/TABLE_RUNTIME_MODEL_AUDIT.md`

Type-only adjustments:

- Added `version` to table identity.
- Added `displayName`.
- Added `readerStatement`.
- Added `leadBookId` and `leadMembershipId`.
- Added `surpriseBookIds`.
- Added `TableCapacityEntryPoint`.
- Added `lowCapacityEntry` and `highCapacityEntry`.
- Exported the new capacity entry point type.

## What Remains Intentionally Unimplemented

The following are intentionally not implemented in T2B:

- real table content
- the ten Table Set v1 tables as data
- book assignments
- table validation rules
- runtime table loading
- Atlas routing
- table-to-book resolver behavior
- reveal copy under tables
- table authoring workflow
- table curation workflow
- table coverage/gap tooling
- affiliate-aware link handling
- analytics or behavioral signals

## Alignment Result

After the small type-only adjustments, the T2 runtime model aligns with the conceptual contract as a first foundation model.

It now represents the contract's core runtime concepts:

- stable identity and version
- human moment
- purpose
- curator intent
- named lead decision
- role-based membership
- designated surprise support
- authored capacity guidance
- no scores, weights, AI confidence, affiliate availability, or behavior-derived signals

The remaining work belongs in later phases: authoring format, validation, real table data, and Atlas/table resolver boundaries.
