# Table Set Runtime Stubs Audit

## Purpose

This audit documents the Phase T3 runtime stubs for the 10 launch tables defined in `docs/TABLE_SET_V1.md`.

It is documentation only. The implementation adds table definitions but does not assign real books, change recommendation logic, change Atlas, change UI, change routing, change reveal copy, or add affiliate or analytics behavior.

## Files Created Or Changed

- `lib/tables/table-set-v1.ts`
- `lib/tables/index.ts`
- `docs/TABLE_SET_RUNTIME_STUBS_AUDIT.md`

## Tables Represented

The runtime stubs represent all 10 launch tables from `TABLE_SET_V1.md`, ordered by build priority:

1. `when-something-heavy-has-happened`
2. `when-youre-running-on-empty`
3. `a-gift-when-youre-not-sure`
4. `finding-your-way-back-to-books`
5. `something-to-keep-you-company`
6. `a-gift-for-someone-you-know`
7. `seeking-stillness`
8. `when-you-need-perspective`
9. `ready-to-go-deep`
10. `restless-and-curious`

This preserves the build priority order listed in the final recommendation section of `TABLE_SET_V1.md`, rather than the numerical table-description order.

## Fields Mapped

Each stub includes:

- stable `id`
- `version`
- `name`
- `displayName`
- `status`
- `audience`
- `purpose`
- `readerMoment.summary`
- `readerMoment.readerStatement`
- `readerMoment.intent`
- `readerMoment.capacityProfile`
- `curatorIntent`
- conceptual `capacityGuidance`
- empty `membership`
- empty `surpriseBookIds`

Audience mapping:

- Self tables use `audience: "self"`.
- Gift tables use `audience: "gift"`.

Status mapping:

- All tables use `status: "draft"` because none are stocked with real book memberships yet.

## Fields Intentionally Empty

These fields remain intentionally empty or unset:

- `membership`
- `leadBookId`
- `leadMembershipId`
- `surpriseBookIds`
- `capacityGuidance.lowCapacityEntry`
- `capacityGuidance.highCapacityEntry`

Reason:

The table contract requires named lead books, surprise books, and capacity entry points for ready tables. Phase T3 creates runtime stubs only. Book assignment, lead selection, surprise selection, and capacity-entry assignment belong in a later curation phase.

## Helper Added

`getTableSetV1(): Table[]` returns cloned table stubs so callers cannot mutate the exported module-level stubs by accident.

The helper is exported from:

```text
lib/tables/index.ts
```

## No Real Books Assigned

No real book IDs were assigned in this phase.

Every table has:

```ts
membership: []
```

Every table has:

```ts
leadBookId: undefined
leadMembershipId: undefined
surpriseBookIds: []
```

This keeps the runtime table set structurally present but not active as a recommendation source.

## Intentionally Not Implemented

Phase T3 does not implement:

- real table content beyond conceptual stubs
- book assignment
- lead book decisions
- supporting book decisions
- alternative book decisions
- surprise book decisions
- table validation
- table loading in runtime flows
- Atlas routing
- table-to-book resolution
- reveal copy under tables
- UI changes
- recommendation changes
- affiliate behavior
- analytics behavior

## Alignment Result

The runtime stubs now give Bokhyllan a safe first representation of the 10 launch tables while preserving the Table Data Contract's authority boundary:

```text
Atlas -> Table -> Book
```

The stubs are not yet usable for recommendations because they contain no memberships. That is intentional.
