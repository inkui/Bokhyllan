# Book Atlas Foundation v1

**What information must Bokhyllan know about a book in order to place it well?**

This document defines the long-term curation foundation for Bokhyllan's book library. It is not a taxonomy reference — those live in `data/library/taxonomy/`. It is an answer to a design question: what does a curator need to know, and how should that knowledge be structured so that 1000 books remain as manageable as 13?

---

## Part 1 — Core Dimensions

The smallest set of dimensions a book needs to be placed well is five.

**1. Emotional register**
The dominant feeling the book carries — not its genre, not its subject, but its emotional texture. A book about loss can be tender or haunting or quietly funny. This is the first signal the recommendation system reads, and the first thing a curator reaches for when they think of placing a book.

Current taxonomy: `EmotionalTone[]` + `BookAtmosphere`. These serve this dimension adequately at current scale.

**2. Reading state fit**
The human condition the book meets. Not "what is the book about" but "who is ready to receive it." A book that rewards a reader who is ready for depth will frustrate someone who is emotionally tired. This is the matching signal — it connects the person's present state to the book's requirements and gifts.

Current taxonomy: `ReadingState[]`. Correct in structure; may grow as the library grows.

**3. Reading energy required**
What attention the book asks for. Separate from emotional register — a tender, slow book may require genuine presence; a warm, absorbing one may carry the reader without effort. This dimension allows the system to protect a depleted reader from a book that would ask too much.

Current taxonomy: `ReadingEnergy` (scalar: very_low / low / medium / high). This is the right shape.

**4. Emotional effect**
What the book does to a reader who finishes it. Not the experience of reading but the result: calmed, companioned, clarified, opened. This is what the recommendation promises — implicitly in the curator copy, explicitly in the placement logic.

Current taxonomy: `EmotionalEffect[]`. These nine values are well-chosen.

**5. Curator voice**
The book as Bokhyllan knows it. This is not recoverable from any API or database. It includes why this book belongs in the library, how a curator would place it, what reading experience it actually produces, and what kind of person it is right for. This dimension lives in the text fields — `emotionalDescription`, `curatorConnection`, `voiceNote` — and is the product.

**Supporting dimensions** (necessary but derivative)
- Pacing (`ReadingPacing[]`) — how the book moves through time, which informs energy estimate and placement language
- Atmosphere (`BookAtmosphere`) — the dominant environmental feeling, used in copy
- Practical: `isbn`, `title`, `author`, `coverImage`, `lengthCategory`

These support placement but do not drive it. A book can be placed from the five core dimensions alone. Practical fields are needed for the affiliate link and UI; they are not curation decisions.

---

## Part 2 — Relationships

**Primary dimensions** are those that directly determine which book is recommended: emotional register, reading state fit, reading energy. The recommendation resolver reads these first. If they do not converge on a single book, the remaining signals narrow further.

**Supporting dimensions** refine the match within a candidate set and inform the curator copy. If two books are equally matched on primary dimensions, pacing and atmosphere differentiate them. If a book is selected, emotional effects inform the placement language the system generates.

**Curator voice** is not a matching dimension. It does not affect which book is chosen. It determines whether the recommendation lands — whether the reader feels understood, whether the book feels earned. A book with weak curator voice will produce a correct recommendation that leaves the reader cold.

The dependency order is:

```
Primary (register, state, energy) → selection
Supporting (pacing, atmosphere, effects) → refinement + copy
Curator voice → landing
Practical (isbn, title, author) → UI + affiliate
```

This means curation effort should be weighted accordingly. Getting the taxonomy right is necessary but not sufficient. Getting the curator voice right is where the product lives.

---

## Part 3 — Ideal Long-Term Book Object

The current `Book` type is close to correct. The following is the target structure for a library of 100–1000 books, with annotations on what changes and why.

```typescript
type CuratedBook = {
  // Identity
  id: string;                         // stable slug, never changes
  isbn: string;                       // required at scale — drives affiliate + metadata
  title: string;
  author: string;
  originalLanguage?: string;          // add: relevant for placement framing
  translatedFrom?: string;            // add: Swedish readers care about this
  translator?: string;                // add: part of the reading experience

  // Practical
  coverImage?: string;                // auto-populated from ISBN
  lengthCategory: LengthCategory;
  publicationYear?: number;           // add: occasional relevance in copy

  // Primary matching dimensions
  readingState: ReadingState[];       // who this book meets
  readingEnergy: ReadingEnergy;       // what it asks of the reader

  // Register + atmosphere
  emotionalTone: EmotionalTone[];     // what the book feels like
  atmosphere: BookAtmosphere;         // dominant environmental quality

  // Effect
  emotionalEffects: EmotionalEffect[]; // what it does to the reader

  // Pacing
  pacing: ReadingPacing[];

  // Curator voice — the product
  shortDescription: string;           // 1–2 sentences for UI (currently used)
  emotionalDescription: string;       // what reading this book feels like
  curatorConnection: string;          // why it belongs in this library, personally
  voiceNote?: string;                 // an image, a texture, something that doesn't fit elsewhere

  // Operational
  practicalNotes?: string[];          // content warnings, format notes
  affiliateRequest?: AffiliateLinkRequest; // retailer routing (requires isbn)

  // Future — do not implement yet
  // curatorId?: string;              // when multiple curators exist
  // addedAt?: string;                // ISO date, for provenance
  // reviewedAt?: string;             // last editorial review date
};
```

**What changes from the current type:**

- `isbn` becomes required (currently optional in `AffiliateLinkRequest`). Everything downstream of this — affiliate links, metadata auto-population, stock checking — depends on it. Books added without ISBN should be considered incomplete.
- `originalLanguage` and `translator` added. A significant portion of Bokhyllan's library is translated literature. These fields matter for curator copy ("in Daniel Hahn's translation" is meaningful) and for reader trust.
- `publicationYear` added, optional. Occasionally relevant in placement copy; also useful for collection auditing at scale.
- Everything else is the current shape.

---

## Part 4 — Scale Test

**At 100 books:** fully manageable. The recommendation resolver can remain a rule-based mapping. A curator can hold the full library in mind. The risk at this scale is redundancy — books that are too similar in reading state and register, creating routing conflicts. An audit at 100 books should check for gaps (reading states with only one book) and clusters (more than five books routing to the same profile).

**At 500 books:** still manageable with the right tooling. The resolver will need to move from deterministic rules to a weighted scoring function — matching by primary dimensions, then breaking ties by supporting dimensions, then by recency or deliberate variation to avoid always surfacing the same books. The curator cannot hold 500 books in mind, so the review workflow (Part 5) becomes essential. The taxonomy may need expansion in specific areas — reading states or pacing values that the current vocabulary does not cover.

**At 1000 books:** manageable if the dimensions remain stable. The critical risk is taxonomy drift — values that were added to solve one problem accumulate until no curator fully understands what each value means. A stable, documented taxonomy with a small number of well-defined values is more important at 1000 books than any algorithmic sophistication. The matching can be probabilistic; the vocabulary must be precise.

The current five primary dimensions support 1000 books without architectural change. What changes at scale is not the structure but the tooling — ways to query, audit, find gaps, and review.

---

## Part 5 — Human Review Workflow

A curator reviewing a book entry should be able to complete a quality review in under ten minutes. The following is the intended workflow.

**Step 1 — Taxonomy check (2 minutes)**
Read the assigned `readingState[]`, `emotionalTone[]`, `emotionalEffects[]`, and `readingEnergy`. Ask: does this match what I know about how this book reads? Verify that the values are precise — not aspirational, not approximate. A book tagged `ready_for_depth` that actually requires only `low` energy is a routing error waiting to happen.

**Step 2 — Curator voice read (5 minutes)**
Read `emotionalDescription`, `curatorConnection`, and `voiceNote` as a sequence. Ask:
- Does this sound like Bokhyllan? (Warm without being ingratiating. Specific without being clinical.)
- Does `emotionalDescription` describe the reading experience, not the plot?
- Does `curatorConnection` carry a genuine reason this book is here, not a summary of the book?
- Would a reader who received this book feel that the copy told the truth about what they were getting into?

If any field reads like a book jacket or a Goodreads summary, it needs rewriting.

**Step 3 — Placement test (2 minutes)**
Mentally route this book: which profile would receive it? Is that the right person? Is there a reading state this book serves that is not currently tagged? Is there a reading state it is tagged for that it does not actually serve?

A book that routes correctly in the taxonomy but reads wrong in the voice has failed the product test. A book that reads beautifully in the voice but is tagged to the wrong reading state has failed the system test. Both matter.

**Step 4 — Completeness check (1 minute)**
Confirm: ISBN present? Cover image populated? `shortDescription` under two sentences? Any `practicalNotes` that should exist (content warnings for grief, violence, difficult themes)?

---

## Part 6 — Future Import Pipeline

The following is the intended flow for adding a book to the library. This is not an implementation spec — it describes the stages and what happens in each.

```
Candidate → Metadata → Enrichment → Review → Publish
```

**Candidate**
A book is identified as a potential addition. Source: curator recommendation, user feedback, thematic gap in the library, editorial instinct. The candidate is added to a holding list with title and author only. No commitment to include.

**Metadata**
ISBN is located (manually or via title search). Automated fetch via Google Books API or Open Library populates: title, author, publication year, cover image, page count (→ length category), original language. This is the recoverable layer — everything that exists in a database somewhere. An `npm run add-book -- --isbn=...` script scaffolds the entry with these fields pre-filled and all curator fields empty.

**Enrichment**
A curator reads the book (or recalls it from a recent reading) and fills the curator voice fields: `emotionalDescription`, `curatorConnection`, `voiceNote`. They assign taxonomy values. This cannot be automated. It is the work.

**Review**
A second curator (or the same curator, after a gap) reads the entry against the review workflow in Part 5. Corrections are made. The entry is marked ready.

**Publish**
The entry is added to `books.ts`. The affiliate link is confirmed to resolve (ISBN-based Bokus deeplink verified). The book appears in the library and is immediately eligible for recommendation.

At small scale (under 100 books), Candidate → Publish can be done in a single session by one curator. At larger scale, the stages need to be separated — especially Enrichment and Review.

---

## Part 7 — Anti-Patterns

**Tagging aspiration, not truth**
A book tagged `hopeful` because the curator wants it to feel hopeful, not because it is. A book tagged `calms` because calm sounds like what the reader needs, not because the book produces calm. Taxonomy values must describe what the book actually does, not what we wish it would do or what the reader needs. The match is only correct if the tags are honest.

**Writing copy about the book instead of the reading experience**
"A novel set in rural Sweden in the 1950s, following a woman who..." is a book jacket. "Reading this feels like slowing down to a pace you forgot was available to you" is curator voice. The fields `emotionalDescription` and `curatorConnection` must never contain plot. They describe what happens to the reader, not to the characters.

**Over-tagging**
Assigning every plausible reading state to give the book maximum routing exposure. A book tagged for eight reading states routes to almost everyone and means something to no one. Each book should have two or three reading states it genuinely serves. If it seems to serve all of them, the book has not been read carefully enough.

**Taxonomy sprawl**
Adding new values when an existing value doesn't quite fit, rather than deciding whether the existing vocabulary is sufficient or the book is the wrong fit. At 1000 books, a taxonomy with 40 reading state values is not expressive — it is abandoned. New values should require a deliberate decision: is this a genuinely distinct condition that the current vocabulary cannot describe, and will it apply to more than a handful of books?

**Treating curator voice as low-priority**
Completing the taxonomy and leaving the curator fields for later. The taxonomy without the voice is an algorithm without a product. A book without `curatorConnection` has not been curated — it has been catalogued. These fields are not metadata. They are the recommendation.

**ISBN-optional thinking**
Adding books without ISBNs and treating it as a temporary state. An ISBN-less book cannot have a working affiliate link, cannot have auto-populated metadata, and cannot be verified for stock. It is incomplete. The pipeline should not allow a book to reach Publish without an ISBN.

**Designing for the edge case**
Adding a field to the book object to handle one unusual book in the library. One book with a difficult reading order, one book that is a short story collection rather than a novel, one book written by an author who is also a real person the curator knows. Fields added to handle one book create complexity for all subsequent books. Handle edge cases in `practicalNotes` as free text. Add a field only when five or more books need it.

---

## Summary

| Question | Answer |
|---|---|
| Core dimensions | 5: emotional register, reading state, reading energy, emotional effects, curator voice |
| Primary for matching | Emotional register + reading state + reading energy |
| Cannot be automated | Curator voice (emotionalDescription, curatorConnection, voiceNote) |
| Can be automated | ISBN metadata, cover image, length, publication year |
| Review time per book | ~10 minutes per the 4-step workflow |
| Scale limit | No architectural limit; taxonomy discipline and review workflow are the constraint |
| Required at entry | ISBN — everything downstream depends on it |
| Anti-pattern to avoid most | Over-tagging and writing copy about the book rather than the reading experience |

1000 curated books is not a cataloguing problem. It is a curation discipline problem. The structure here makes 1000 books achievable. The discipline to maintain taxonomy precision and curator voice quality at scale is what makes them valuable.
