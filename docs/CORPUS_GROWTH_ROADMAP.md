# Corpus Growth Roadmap

## Purpose

This roadmap describes how Bokhyllan can grow its book corpus from 12 books to 50, 100, 500, and 1000 books in controlled stages.

It is operational guidance only. It does not add books, candidate data, scripts, services, or runtime behavior.

## Current Baseline: 12 Books

The current runtime corpus lives in:

```text
data/library/books/books.ts
```

Current state:

- 12 curated runtime books.
- 12/12 have `title`, `author`, and `genres`.
- 3/12 have `isbn13`.
- 0/12 have `bokusUrl`.
- 4/12 have `firstPublishedYear`.
- 1/12 has `originalTitle`.

The corpus works for the current recommendation experience, but it is not yet metadata-complete for large-scale import, validation, or future affiliate activation.

## Stage 1: 50 Books

### Goal

Create a small but meaningfully broader operating shelf that can test corpus expansion without overwhelming the current manual process.

### What Kind Of Books To Add

- More books that clearly fit existing Bokhyllan reader states.
- Short and medium-length books for reluctant or low-energy readers.
- A few additional poetry or essay-like works.
- Swedish originals and translated works with clear metadata paths.
- Books that strengthen current recommendation coverage rather than simply increasing count.

### Metadata Expectations

- Every new candidate uses the import template structure.
- `title`, `author`, `language`, and `genres` are filled before review.
- `isbn13` is manually verified when possible.
- `firstPublishedYear` is added only when verified.
- `bokusUrl` remains blank unless clean and manually verified.

### Validation Expectations

- Existing lint and build must pass.
- No duplicate IDs.
- No duplicate title/author pairs.
- No malformed ISBN13 values.
- Missing affiliate metadata warnings are acceptable if intentionally tracked.

### Review Expectations

- Review every candidate manually.
- Reject unclear genre choices.
- Leave uncertain ISBNs blank.
- Keep notes about edition ambiguity outside runtime data until a review convention exists.

### What Not To Do

- Do not add books just to reach 50.
- Do not paste retailer metadata directly into runtime data.
- Do not add unapproved semantic fields.
- Do not introduce new recommendation logic.

## Stage 2: 100 Books

### Goal

Reach the first reliable Core 100 shelf: broad enough for meaningful recommendation variety, still small enough for high editorial confidence.

### What Kind Of Books To Add

- Strong gift-suitable books with clear emotional use cases.
- Swedish originals and high-quality translated works.
- Accessible classics that remain useful to modern readers.
- Modern quiet reads.
- Books that cover calm, comfort, clarity, depth, low-energy reading, and immersion.

### Metadata Expectations

- `title`, `author`, and `genres` complete for all entries.
- `isbn13` expected before publish unless explicitly exception-reviewed.
- `firstPublishedYear` expected when confidently verified.
- `originalTitle` used for translated/localized titles where useful.
- `bokusUrl` optional until the affiliate URL strategy is decided.

### Validation Expectations

- No validation errors.
- Warning counts should be reviewed, not ignored.
- ISBN gaps should be known and deliberate.
- Genre vocabulary should remain small and consistent.

### Review Expectations

- Review candidate fit against Bokhyllan identity.
- Review metadata separately from curation copy.
- Check whether each book adds a new useful recommendation reason.
- Keep the UI and recommendation flow unchanged unless separately scoped.

### What Not To Do

- Do not add famous books without a clear Bokhyllan use case.
- Do not overfit toward one reader persona.
- Do not turn genres into mood tags.
- Do not activate real affiliate links during corpus growth.

## Stage 3: 500 Books

### Goal

Build a durable recommendation library with enough range for repeated use, broader gifts, seasonal needs, and different reading energies.

### What Kind Of Books To Add

- A balanced mix of Swedish originals, translated literature, accessible classics, quiet contemporary books, poetry, and adjacent literary genres.
- More books for readers returning to reading.
- More short books and low-pressure entry points.
- More books that serve gift contexts without feeling generic.
- Carefully chosen breadth in historical fiction, speculative fiction, memoir-like literary works, and essays.

### Metadata Expectations

- `title`, `author`, and `genres` complete.
- `isbn13` near-complete before operational activation.
- `firstPublishedYear` high coverage.
- `originalTitle` applied consistently for translated/localized works.
- `bokusUrl` still optional unless clean URL storage becomes the chosen affiliate strategy.
- Future tags/themes/mood should wait for Atlas v2 decisions.

### Validation Expectations

- Validation should become part of regular review cadence.
- Duplicate detection should be treated as a hard stop.
- Missing ISBNs should be tracked by queue, not left invisible.
- Genre drift should be reviewed before each batch is accepted.

### Review Expectations

- Review in batches.
- Keep selection notes separate from runtime data.
- Use templates for candidate intake.
- Maintain a clear distinction between metadata, curation, and recommendation behavior.

### What Not To Do

- Do not bulk import without editorial review.
- Do not let retailer categories define the corpus.
- Do not loosen metadata standards to increase speed.
- Do not use online/API enrichment without a separate integration phase.

## Stage 4: 1000 Books

### Goal

Reach the first scale-ready Bokhyllan library: broad enough for long-term recommendation depth while preserving a curated identity.

### What Kind Of Books To Add

- Books that extend recommendation nuance, not just coverage.
- Deepened representation across eras, languages, translation contexts, Swedish originals, and reader energy levels.
- Carefully governed genre breadth.
- More specialized recommendations only when the reader value is clear.

### Metadata Expectations

- Required runtime metadata complete.
- ISBN13 complete or explicitly exception-reviewed.
- Bokus/link strategy decided before real affiliate activation.
- Semantic fields governed by Atlas v2 or later, not ad hoc entry.
- Exceptions documented outside runtime book entries until an approved structure exists.

### Validation Expectations

- Validation should be a required gate.
- Import templates should be standard.
- Metadata gaps should be reportable.
- Affiliate metadata should be clean before real-link activation.

### Review Expectations

- Process discipline matters more than speed.
- Use staged candidate intake.
- Separate candidate, metadata, enrichment, review, and publish decisions.
- Keep curation quality visible even at scale.

### What Not To Do

- Do not pursue raw catalog size as a product goal.
- Do not introduce real tracking data into books.
- Do not merge candidate data directly into runtime without review.
- Do not make the UI ecommerce-like to justify corpus scale.

## Operational Cadence

Recommended cadence:

1. Collect candidates in small batches.
2. Review candidate fit before metadata work.
3. Verify metadata manually.
4. Enter data using the import template.
5. Run lint and build.
6. Review warnings and gaps.
7. Accept only the clean batch.

Suggested batch sizes:

- 12 to 50: 5-10 candidates per batch.
- 50 to 100: 10-15 candidates per batch.
- 100 to 500: 25-50 candidates per batch after validation workflow matures.
- 500 to 1000: batch size depends on import/review tooling quality.

## Manual Verification Workflow

For every candidate:

- Check title.
- Check author.
- Check original title if translated or localized.
- Check first publication year if available.
- Verify ISBN13 for the intended edition.
- Decide whether Bokus URL should remain blank or be cleanly verified.
- Assign broad stable genres.
- Leave uncertain values blank.
- Keep tracking links, affiliate parameters, secrets, and provider details out of data.

## Risks

- Metadata drift from adding books too quickly.
- Genre sprawl from uncontrolled labels.
- ISBN errors caused by edition or translation confusion.
- Affiliate boundary leakage through stored tracking URLs.
- Recommendation dilution from adding famous but poor-fit books.
- Overfitting to one reader persona.
- Runtime model pressure before Atlas v2 decisions are ready.
- Treating validation warnings as noise instead of workflow signals.

## Acceptance Criteria

A growth stage is complete when:

- Target count is reached without filler.
- All entries use approved runtime/template fields.
- Required metadata is complete for the stage.
- ISBN gaps are manually reviewed.
- No tracking URLs or provider secrets are stored.
- Genres remain broad and stable.
- No UI, routing, or recommendation behavior changed accidentally.
- `npm.cmd run lint` passes.
- `npm.cmd run build` passes.

## Recommended Next Phase

Recommended next phase: **Phase C26 - Genre Taxonomy v1**.

That phase should define the controlled genre vocabulary before larger candidate batches are authored.
