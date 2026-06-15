# Sample 50-Book Expansion Strategy

## Purpose

This document defines a documentation-only strategy for expanding Bokhyllan from the current 12-book runtime corpus to a balanced 50-book sample corpus.

It does not name candidate books, add books, change book data, change runtime types, modify UI, change routing, add scripts, call services, or use online lookup.

The goal is to make the first expansion broad enough to test Bokhyllan's recommendation range while still small enough for careful manual review.

## Current Baseline

The current runtime corpus contains 12 books in:

```text
data/library/books/books.ts
```

Current metadata baseline:

| Field | Coverage |
| --- | ---: |
| `title` | 12/12 |
| `author` | 12/12 |
| `genres` | 12/12 |
| `isbn13` | 3/12 |
| `bokusUrl` | 0/12 |
| `firstPublishedYear` | 4/12 |
| `originalTitle` | 1/12 |

Current corpus shape:

- Strongly weighted toward `literary_fiction`.
- One small intentional poetry presence.
- Strong fit with Bokhyllan's calm, reflective, emotionally attentive identity.
- Limited metadata completeness for ISBN13, Bokus URL, first publication year, and original title.
- No approved runtime use of future `themes`, `mood`, or `tags` fields yet.

The 50-book sample should preserve the current identity while adding enough variety to expose gaps.

## Why 50 Books Before 100

Fifty books is the smallest useful expansion checkpoint before a Core 100 dataset.

It should test:

- whether the import template is practical
- whether metadata discipline survives repeated entry
- whether genre taxonomy stays controlled
- whether recommendation coverage broadens without becoming generic
- whether ISBN and affiliate metadata gaps can be tracked without guesswork
- whether manual review can handle small batches
- whether Bokhyllan can recommend beyond the current literary-fiction-heavy shelf

The 50-book sample is not a miniature bookstore catalog. It is a controlled operating shelf for learning how Bokhyllan should scale.

## Target Composition

The target is 50 total books, including the current 12. The numbers below are approximate ranges, not quotas. A book can serve more than one purpose, so these categories should be reviewed for balance rather than counted mechanically.

| Category | Approximate target in 50 | Purpose |
| --- | ---: | --- |
| Literary fiction | 18-24 | Preserve Bokhyllan's core identity while avoiding overconcentration. |
| Translated fiction | 12-18 | Keep the shelf internationally open and useful for Swedish-market readers. |
| Swedish originals | 10-16 | Strengthen local relevance and Swedish-language literary continuity. |
| Accessible classics | 5-8 | Add durable works that remain genuinely usable for modern readers. |
| Modern quiet reads | 8-12 | Support calm, reflective, low-noise recommendations. |
| Books for reluctant readers | 6-10 | Add short, clear, low-pressure entry points. |
| Giftable books | 12-18 | Make the sample useful for thoughtful gift recommendations without becoming commercial. |
| Poetry | 2-4 | Keep poetry as a small, intentional category. |
| Nonfiction / memoir / essays | 3-6 | Add carefully chosen factual or life-writing range where it fits Bokhyllan's tone. |

### Literary Fiction

Literary fiction should remain the center of gravity, but not the only path. The sample should include different lengths, energies, and emotional registers.

Avoid adding literary fiction only because it feels prestigious. Each addition should serve a reader state, gift situation, or corpus gap.

### Translated Fiction

Translated fiction should broaden language, place, and literary texture. Translation context should be handled through verified metadata when possible, especially `originalTitle`.

Do not add translated works if the edition, title, or ISBN confidence is too weak.

### Swedish Originals

Swedish originals should make Bokhyllan feel grounded in its intended market. Include a mix of older and newer works, but keep the selection tied to recommendation usefulness.

Do not treat Swedish origin alone as sufficient reason for inclusion.

### Accessible Classics

Accessible classics should be readable, giftable, or emotionally useful now. They should not be included only because they are canonical.

Classics that require too much contextual handling can wait for a later tier.

### Modern Quiet Reads

Modern quiet reads should support Bokhyllan's strongest current identity: stillness, attention, warmth, clarity, solitude, tenderness, or reflective depth.

This category should not collapse into one mood. Quiet can be warm, melancholic, strange, austere, hopeful, or intimate.

### Books For Reluctant Readers

The 50-book sample should include books for tired readers, returning readers, and readers who want literary quality without a heavy commitment.

Favor short or medium-length works with clear entry points. Avoid assuming that simple means shallow.

### Giftable Books

Giftable books should have clear recipient logic: comfort, perspective, beauty, companionship, recovery, curiosity, or shared conversation.

Do not include books merely because they are popular gifts elsewhere.

### Poetry

Poetry should remain small but deliberate. It can support low-energy reading, gifting, attention, and rereading.

The sample should avoid overexpanding poetry before Bokhyllan has stronger poetry-specific review habits.

### Nonfiction / Memoir / Essays

Nonfiction, memoir, and essays can belong when they serve Bokhyllan's quiet recommendation identity. They should add perspective, clarity, attention, lived experience, or reflective depth.

Avoid practical how-to, trend nonfiction, or category-expanding additions that make the corpus feel unfocused.

## Coverage Goals

### Genre Coverage

The 50-book sample should use the approved genre taxonomy without expanding it casually.

Minimum useful coverage:

- `literary_fiction` remains strong but no longer dominates nearly everything.
- `poetry` remains present.
- At least a few entries should test adjacent genres such as `classics`, `historical_fiction`, `essays`, `memoir`, `narrative_nonfiction`, `short_stories`, or carefully selected `speculative_fiction`.
- Genre values should remain broad, primary-first, and limited.

### Theme Coverage

Themes are not approved runtime fields yet, but candidate review should still observe future theme range.

The sample should be able to support future matching around concerns such as:

- grief and loss
- family and friendship
- memory and time
- solitude and belonging
- faith and doubt
- work and responsibility
- place and nature
- healing and attention

Do not add theme fields to runtime data yet. Use this as an editorial coverage lens only.

### Mood Coverage

Mood is not an approved runtime expansion field yet, but the 50-book sample should not feel emotionally one-note.

The sample should test future mood range across:

- quiet, still, reflective, and meditative
- warm, tender, comforting, and hopeful
- clear, luminous, and intimate
- melancholic, bittersweet, austere, dark, or unsettling where useful
- strange or playful in small doses

Do not turn mood into genre or recommendation copy.

### Reading Difficulty And Accessibility

The sample should include a visible spread:

- very short and short works
- medium-length works
- a few longer immersive books
- low-energy-friendly books
- books that reward deeper attention
- books with clear openings for reluctant readers

Avoid building a sample where every strong recommendation requires high reading energy.

### Gift Situations

The sample should support several gift contexts:

- comfort after a hard season
- a thoughtful literary gift
- a beautiful but not showy gift
- a book for someone returning to reading
- a quiet book for an overstimulated reader
- a book for someone who likes depth but not noise
- a small poetry or essay gift

Giftability should remain a review lens, not a metadata field in this phase.

### Reader Uncertainty

Bokhyllan should work for readers who do not know exactly what they want. The 50-book sample should therefore include books that answer different uncertain states:

- "I want something calm."
- "I want something short."
- "I want something with depth."
- "I want something that keeps me company."
- "I want something beautiful but not sentimental."
- "I want something different, but not exhausting."
- "I want to give a book without making it feel generic."

## Exclusion Rules

Do not include:

- books only because they are famous
- books with weak metadata confidence
- books with uncertain title, author, edition, ISBN, or translation context
- duplicate editions unless edition choice is meaningful and documented
- trend-only books
- books that do not serve recommendation variety
- books that require new taxonomy keys just to fit
- books added primarily to satisfy a quota
- books whose affiliate metadata would require unsafe guessing
- books that push the sample too far toward one reader persona
- books that make Bokhyllan feel like a generic bookstore catalog

Any candidate with blocking import, affiliate, metadata, or approval errors should stay out of the 50-book sample until resolved.

## Metadata Expectations

For the 50-book sample:

- `title` is required and manually checked.
- `author` is required and manually checked.
- `genres` is required and must use approved genre keys.
- `isbn13` is preferred, but only if manually verified for the intended edition.
- `bokusUrl` is optional and must be clean and manually verified if present.
- `firstPublishedYear` is preferred when confidently verified.
- `originalTitle` should be used for translated or localized works when verified.
- Future `themes`, `mood`, and `tags` remain deferred unless Atlas v2 or a later approved phase defines their runtime usage.

Missing ISBN13 or Bokus URL should remain visible as a warning rather than being silenced with guessed data.

## Review Process

Review candidates in small batches of 5-10.

### 1. Candidate Fit Review

Before metadata work, ask:

- What reader state or gift situation does this serve?
- Does it add range beyond the current corpus?
- Is it aligned with Bokhyllan's tone and purpose?
- Is it being considered for a reason other than fame?

Reject or pause candidates that cannot answer these questions clearly.

### 2. Metadata Verification

Use the authoring guide and import template rules:

- verify title
- verify author
- verify original title if relevant
- verify first publication year if available
- verify ISBN13 manually before adding it
- verify Bokus URL manually before adding it
- leave uncertain optional fields blank

Do not use online lookup in phases that prohibit it.

### 3. Taxonomy Review

Check that:

- genres use approved keys
- primary genre comes first
- no marketing labels are used as genres
- no theme or mood ideas are forced into genre
- any future theme/mood observations remain review notes only

### 4. Error Review

Use the import error taxonomy as a review language:

- warnings can continue with documented intent
- errors must be fixed before entry
- blocking issues stop the candidate
- info items can support review but should not clutter runtime data

### 5. Editorial Balance Review

Before accepting a batch, check:

- the batch does not overconcentrate one genre
- the batch adds useful reader states
- the batch improves gift usefulness
- the batch does not introduce metadata shortcuts
- the batch preserves Bokhyllan's calm, non-ecommerce product feel

## Acceptance Criteria

The 50-book sample strategy is successful when:

- The corpus reaches 50 books without filler.
- No specific books were added without review.
- Every new entry has verified `title`, `author`, and approved `genres`.
- ISBN13 values are manually verified or left blank.
- Bokus URLs are clean, manually verified, or left blank.
- No tracking URLs, affiliate IDs, provider details, or secrets are stored.
- No duplicate editions are accepted without a documented reason.
- Genre coverage is broader than the 12-book baseline.
- Poetry remains small but intentional.
- Nonfiction, memoir, or essays are included only where they support Bokhyllan's identity.
- The sample supports more reader uncertainty and gift situations than the current baseline.
- Future themes, moods, and tags are not added to runtime data prematurely.
- Lint and build pass after any future data changes.

## Recommended Next Phase

Recommended next phase: **Phase C33 - Manual ISBN Verification Workflow**.

That phase should define how ISBN13 values are verified, recorded, deferred, and rejected before the 50-book sample starts adding new metadata at scale.
