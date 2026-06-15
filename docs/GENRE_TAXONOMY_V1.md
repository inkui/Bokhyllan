# Genre Taxonomy v1

## Purpose

This document defines Bokhyllan's controlled genre vocabulary before the corpus grows beyond the current seed set.

Genres are operational metadata. They help with validation, corpus balance, candidate review, and future recommendation coverage. They are not marketing labels, mood tags, themes, or curator voice.

## Design Principles

The genre system should:

- stay small
- stay stable
- support recommendations
- support validation
- avoid bookstore-category explosion
- use lowercase English snake-case keys
- remain understandable to humans during manual review

Genres should answer: what broad kind of book is this?

They should not answer: how does this book feel, who is it for, why is it good, or what does it help with?

## Approved Genres

Approved v1 genre keys:

1. `literary_fiction`
2. `contemporary_fiction`
3. `historical_fiction`
4. `classics`
5. `mystery`
6. `crime`
7. `fantasy`
8. `science_fiction`
9. `speculative_fiction`
10. `short_stories`
11. `poetry`
12. `essays`
13. `memoir`
14. `biography`
15. `narrative_nonfiction`
16. `children_young_adult`

This list should not be expanded casually. Additions should happen through a taxonomy review phase, not while entering individual books.

## Genre Definitions

### `literary_fiction`

Definition:

Fiction where language, character, form, atmosphere, moral attention, or interior life is central.

When to use:

Use for novels and novellas that fit Bokhyllan's literary recommendation identity.

When not to use:

Do not use as a default for every novel. If a book is primarily genre-led and should be discovered through another approved genre, use the more specific genre.

### `contemporary_fiction`

Definition:

Fiction set broadly in the modern or near-modern world, usually focused on contemporary relationships, society, work, identity, or everyday life.

When to use:

Use when the contemporary setting and social/emotional situation are more useful than a literary/general label.

When not to use:

Do not use just because a book was recently published.

### `historical_fiction`

Definition:

Fiction where a historical period is central to the book's premise, texture, or reader expectation.

When to use:

Use for books where historical setting is a meaningful part of selection and recommendation.

When not to use:

Do not use for every older book. A book written in the past is not automatically historical fiction.

### `classics`

Definition:

Older works with durable literary, cultural, or reader significance.

When to use:

Use for books where classic status is operationally useful for corpus balance or reader expectation.

When not to use:

Do not use as a prestige label. A famous book still needs a clear Bokhyllan reason.

### `mystery`

Definition:

Fiction structured around uncertainty, investigation, secrets, or gradual revelation.

When to use:

Use when the mystery structure matters more than criminal procedure or violence.

When not to use:

Do not use for any book that merely has ambiguity or unanswered questions.

### `crime`

Definition:

Fiction where crime, investigation, justice, or criminal consequence is central.

When to use:

Use for crime novels, literary crime, and detective-led works that Bokhyllan intentionally includes.

When not to use:

Do not use for books with incidental wrongdoing or moral conflict.

### `fantasy`

Definition:

Fiction using magic, mythic structures, invented worlds, or supernatural systems.

When to use:

Use when fantasy elements shape the reader's expectations and the book's world.

When not to use:

Do not use for lightly dreamlike or symbolic books without a fantasy frame.

### `science_fiction`

Definition:

Fiction shaped by science, technology, future societies, space, speculative systems, or altered realities grounded in scientific possibility.

When to use:

Use when science-fiction premises drive the book's world or central questions.

When not to use:

Do not use for all speculative or strange fiction. Use `speculative_fiction` when the book crosses boundaries without a clear science-fiction frame.

### `speculative_fiction`

Definition:

Fiction that asks "what if?" through altered realities, uncanny premises, dystopian frames, fabulism, or genre-crossing invention.

When to use:

Use for books that are clearly not realism but do not fit cleanly as fantasy or science fiction.

When not to use:

Do not use as a vague label for any imaginative novel.

### `short_stories`

Definition:

Collections or cycles of short fiction.

When to use:

Use when the book's form is short stories and that form affects reader fit.

When not to use:

Do not use for short novels or novellas.

### `poetry`

Definition:

Poetry collections, selected poems, or book-length poetic works.

When to use:

Use for poetry as a small but intentional Bokhyllan category.

When not to use:

Do not use for lyrical prose unless the work is actually poetry.

### `essays`

Definition:

Essay collections or essayistic works where argument, observation, reflection, or cultural attention is central.

When to use:

Use for nonfiction or hybrid works that readers approach as essays.

When not to use:

Do not use for all nonfiction.

### `memoir`

Definition:

First-person life writing centered on memory, experience, identity, or a particular life period.

When to use:

Use when the book is shaped by personal recollection or lived experience.

When not to use:

Do not use for biographies written primarily by someone else.

### `biography`

Definition:

Life writing about another person, usually researched and narrated by someone other than the subject.

When to use:

Use for biographies, literary lives, and biographical studies.

When not to use:

Do not use for memoirs or autobiographical essays.

### `narrative_nonfiction`

Definition:

Nonfiction that uses narrative structure, scenes, reporting, history, or investigation to tell a true story.

When to use:

Use for nonfiction that reads with narrative momentum and supports Bokhyllan's reader-fit logic.

When not to use:

Do not use for reference, how-to, technical, or purely informational works.

### `children_young_adult`

Definition:

Books primarily written for children or young adults that Bokhyllan intentionally includes for cross-age, gift, comfort, or literary reasons.

When to use:

Use when intended audience is operationally relevant.

When not to use:

Do not use for adult books that are simply accessible or short.

## Multi-Genre Rules

Recommended genre count:

- Prefer 1 genre.
- Use 2 genres when both materially improve review or recommendation.
- Use 3 only for rare edge cases.

Primary vs secondary genres:

- The first genre should be the primary operational genre.
- Additional genres should clarify form, audience, or strong genre crossing.

Avoiding genre stuffing:

- Do not add genres to increase discoverability.
- Do not encode mood, theme, audience, prestige, length, or sales context as genres.
- Do not add both a broad and narrow genre unless both are useful. For example, `literary_fiction` plus `historical_fiction` may be useful; `literary_fiction` plus `contemporary_fiction` often needs a clear reason.

## Deprecated Patterns

Do not use these as genre keys:

- `literary`
- `novel`
- `fiction`
- `bestseller`
- `feelgood`
- `award_winner`
- `modern_classic`
- `quiet`
- `warm`
- `sad`
- `gift`
- `book_club`
- `swedish`
- `translated`

Why these are not genres:

- Some are too broad: `novel`, `fiction`.
- Some are marketing labels: `bestseller`, `award_winner`, `book_club`.
- Some are moods: `quiet`, `warm`, `sad`.
- Some are recommendation contexts: `gift`, `feelgood`.
- Some are metadata dimensions that should live elsewhere: `swedish`, `translated`.

## Validation Guidance

During review:

- Every book should have at least one approved genre.
- Unknown genre keys should be treated as taxonomy drift.
- Empty `genres` arrays should remain validation warnings.
- Genre changes should be reviewed as metadata changes, not casual copy edits.
- New genre proposals should be collected and reviewed in batches.

Current runtime validation checks only whether `genres` exists and is non-empty after mapping. This document defines the human-controlled vocabulary until stricter automated validation exists.

## Future Compatibility

### Themes

Themes should describe what the book explores or helps a reader meet: grief, solitude, memory, renewal, moral conflict, companionship. They should not be encoded as genres.

### Mood

Mood should describe the felt reading experience: still, warm, melancholic, immersive, dark, hopeful. Mood is separate from genre because many genres can carry the same mood.

### Tags

Tags can eventually capture durable recommendation qualities such as form, texture, accessibility, or use case. Tags should be more flexible than genres but still governed.

Keeping these separate prevents the genre field from becoming a dumping ground for every useful recommendation signal.

## Recommended Next Phase

Recommended next phase: **Phase C27 - Theme Taxonomy v1**.

That phase should define a controlled theme vocabulary separately from genre, mood, and tags.
