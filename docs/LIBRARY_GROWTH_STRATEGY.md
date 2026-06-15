# Library Growth Strategy v1

**How Bokhyllan grows from 20 books to 1000 without losing itself.**

---

## The Premise

Most digital products treat growth as a proxy for quality. More data, more coverage, more catalogue — more value. This is not Bokhyllan's premise.

Bokhyllan's premise is that a smaller, more carefully understood library is more valuable than a larger, carelessly assembled one. A reader who receives the right book trusts Bokhyllan. A reader who receives a book that doesn't fit — even if it's technically correct by genre or rating — doesn't come back.

This means growth is not a quantity problem. It is a curation discipline problem. The challenge is not adding books. It is keeping the quality of understanding constant as the number of books grows.

This document defines how to do that.

---

## Why 100 Books Is the First Critical Milestone

The library at 13 books is a proof of concept. The recommendation system can work — a small number of carefully chosen books, matched to the right emotional moment, with copy that earns trust. But 13 books cannot serve the full range of human reading situations. Many readers will arrive in a moment the library does not yet cover.

At 100 books, coverage becomes real. The taxonomy of reading states and emotional registers can be populated with multiple candidates in each direction. No single reading profile routes to only one book. The system can begin making meaningful choices rather than simple lookups.

100 books is also the point at which curation discipline becomes testable. At 13 books, a curator can hold the full library in mind. At 100, they cannot. The review workflow, the taxonomy conventions, and the standards for curator voice must be established before reaching this number — not discovered while building it. The habits formed at 100 books are the habits that survive to 1000.

**100 books is the milestone where Bokhyllan stops being a prototype and becomes a library.**

---

## Why 100 Books Is Not the Final Goal

A library of 100 literary novels covers a range of human situations. But the range of human situations is wider than 100 books can hold. Grief alone has many registers: acute and raw, months later and quieter, the grief of ambivalence, the grief of relief. A library that meets all of these needs depth.

Beyond coverage, there is a second reason to grow past 100: variation. A reader who returns to Bokhyllan after six months should not receive the same book they received before, even if their situation is similar. At 100 books, the system is still constrained enough that repetition is likely. At 500, variation within quality becomes possible.

There is also a commercial argument, though it is secondary. A larger library converts more affiliate links. More books means more readers served, more trust built, more commission generated — which funds curation. But this is a consequence of a good library, not a reason to build one carelessly.

**100 books is the beginning of a real library. 1000 is the library.**

---

## What Bokhyllan Owns

There are two layers to every book in the library. Understanding the difference between them is the strategic foundation.

### External metadata

These fields exist in databases that anyone can access:

- Title, author, publication year
- ISBN
- Cover image
- Page count → length estimate
- Publisher, original language
- Synopses and jacket copy

This layer is recoverable. If Bokhyllan lost it tomorrow, it could be rebuilt in hours with a script and a book's ISBN. It is not owned. It is borrowed from the world.

### Bokhyllan curation

These fields exist nowhere else:

- `emotionalDescription` — what it feels like to read this book, described from inside the reading experience
- `curatorConnection` — why this book belongs in this library, from a specific human perspective
- `voiceNote` — an image, a texture, a detail that doesn't fit anywhere else but that makes the recommendation feel alive
- Taxonomy assignments — the considered judgment that this book meets a reader who is grieving differently from one who is recovering; that it requires `medium` energy, not `low`; that it calms rather than comforts
- The decision to include the book at all

This layer cannot be recovered from any API. It cannot be scraped, licensed, or purchased. It is the product of a human reading the book and thinking carefully about who it is for. It takes time and attention and literary judgment to produce.

**This is the moat.** Not the technology. Not the design. Not the recommendation algorithm. The quality of human understanding of each book in the library.

Any catalogue can hold a million books. Bokhyllan's value is that it knows — genuinely knows, from the inside — the books it holds. That knowledge is what produces a recommendation that lands differently from a search result or a bestseller list.

---

## The Curation Flywheel

Growth compounds when the act of curating makes future curation easier. This is the mechanism:

```
Book
  → Enrichment (curator writes about the reading experience)
  → Review (a second reading against the quality standard)
  → Published book (enters the library at full quality)
  → Better examples (other entries can be compared against it)
  → Better future enrichment (the bar is visible; the voice becomes consistent)
```

Each well-curated entry makes the next one easier to get right. Not because the work becomes less — it stays the same — but because the standard becomes clearer.

At 13 books, the standard is implicit. A new curator reads the existing entries and absorbs what good looks like. At 100 books, the pattern is unmistakable. At 500 books, it is institutional: the voice of Bokhyllan is not a style guide that has to be explained — it lives in the library itself, visible in hundreds of examples.

This also applies to the taxonomy. Every correctly tagged book is a precedent. When a future curator asks "should this book be tagged `recovering` or `emotionally_tired`?" they can look at existing books in each category and decide by comparison. The library teaches itself forward.

**The flywheel works only if quality is maintained at every turn.** A poorly enriched entry breaks the chain. Future curators use it as a reference and absorb its mistakes. This is why the review stage is not optional — it is the mechanism that keeps the flywheel running cleanly.

---

## Why Enrichment Is the True Product

The recommendation algorithm is a routing mechanism. It matches a reader's moment to a candidate book. The algorithm can be sophisticated or simple; at current scale, simple works well. At larger scale, it will need to weight and rank. But in either case, the algorithm is only as good as the data it routes through.

The data it routes through is the enrichment.

When a reader receives a recommendation and reads the curator copy, they are not experiencing the algorithm. They are experiencing the enrichment — the `emotionalDescription` that describes the reading experience, the `whyThisBook` and `placement` copy generated from `curatorConnection` and `voiceNote`. The recommendation is written by the curator, not the system. The system only decides which curator's words to show.

This means: investing in enrichment quality compounds. A well-written `curatorConnection` will be read by every reader who receives that book. It will be read hundreds or thousands of times. The effort of writing it well once is amortized across every recommendation.

A thin enrichment — an accurate taxonomy but a generic or lifeless curator voice — produces recommendations that feel correct but don't land. The reader is routed to the right book but doesn't feel understood. That difference is what Bokhyllan is for.

---

## Why Bokhyllan's Value Is Not Metadata

Metadata is table stakes. Title, author, cover, length — every catalogue has these. A reader who wants metadata can find it on Bokus, Adlibris, Goodreads, or a library catalog in thirty seconds.

What a reader cannot find anywhere in thirty seconds is a trusted human voice telling them: this book is for you, right now, in this moment, and here is exactly why.

That is what Bokhyllan is trying to be. The metadata supports it — without a cover image and a correct title, the recommendation cannot function — but the metadata is not the reason a reader trusts the recommendation. The reason a reader trusts the recommendation is the feeling that someone understood their situation and chose carefully.

This has a practical consequence: the enrichment fields must never be allowed to drift toward jacket copy. The moment `emotionalDescription` reads like a publisher synopsis, the distinction collapses. The reader is no longer receiving Bokhyllan's voice — they are receiving the publisher's voice, laundered through a recommendation interface. That is not a different product. That is no product at all.

---

## How Human Review Remains Part of the Process

Human review is not a bottleneck. It is the quality gate.

The import pipeline (documented in LIBRARY_IMPORT_PIPELINE.md) is designed to make metadata retrieval fast and to structure the enrichment so that a curator's time is spent on the parts that cannot be automated. The goal is not to eliminate human judgment — it is to eliminate the friction that surrounds it, so that human judgment is concentrated where it matters.

At current scale, a single curator can review an entry in approximately ten minutes following the four-step workflow in BOOK_ATLAS_FOUNDATION.md. At 100 books added per year — a sustainable pace for a small editorial operation — this is approximately seventeen hours of review time annually. This is not a significant resource burden.

At larger scale, if the curation team grows, the review workflow can be divided: one person reviews taxonomy, another reviews voice, a third reviews completeness. The pipeline accommodates this because each step is explicit and documented.

What must not change, at any scale: the decision to publish a book is a human decision. The system can scaffold metadata, flag missing fields, and suggest taxonomy values — but it cannot decide that a book belongs in Bokhyllan's library. That judgment requires a human who has read the book, understands the library's voice, and can say with confidence: this book belongs here, and here is why.

---

## Why Bokhyllan Should Not Train Its Own Model

At some point, as the curated dataset grows, the question will arise: could Bokhyllan train a model on its own enrichment data and generate curator voice automatically?

The answer is no, and the reason is the nature of what the data contains.

The enrichment layer — `emotionalDescription`, `curatorConnection`, `voiceNote` — contains human literary judgment expressed in carefully considered language. It is the output of a reading practice, not a data collection exercise. Its value comes from the fact that it is specific, intentional, and personally grounded. A model trained to generate text that sounds like this will produce text that sounds like this. It will not produce text that is this.

The distinction matters because readers can feel it. Copy generated by a model that has learned the patterns of curator voice will be fluent and tonally correct. It will also be subtly empty — present in form but not in content. It will say the right kinds of things without having anything to say. The trust Bokhyllan depends on is built on the reader's sense that someone was actually paying attention to them. Generated copy produces the appearance of attention, not the thing itself.

There is also a practical risk: a model trained on Bokhyllan's enrichment data and used to generate new enrichment data would progressively dilute the quality of the training set. The output of the model becomes the input to the next generation of the model. The result is not scale — it is entropy.

**The curator voice must be written by humans who have read the books. This is not a temporary limitation. It is the principle.**

---

## How Future LLMs Can Learn From Bokhyllan's Approved Library

This is a different question from the previous one, and the answer is different.

General-purpose language models can be useful in the import pipeline at stages that do not touch curator voice:

- **Candidate identification:** A model can be given the library's taxonomy and asked to suggest books that might fill gaps in coverage — reading states or emotional registers that the current library underserves. This is a suggestion, not a decision. A human curator decides whether to pursue each suggestion.

- **Metadata scaffolding:** A model can help locate ISBNs, suggest length categories from page counts, or propose a starting taxonomy based on a book's known characteristics. These proposals are reviewed and corrected by a human before enrichment begins.

- **Voice consistency checking:** A model trained on Bokhyllan's approved enrichment can flag new entries that drift from the established voice — entries that read like jacket copy, use prohibited language, or break structural conventions. This is a quality check, not a generation task.

What a model must never do: write enrichment copy, assign final taxonomy values, or make publication decisions.

As the approved library grows — past 100 books, toward 500 — the quality of the enrichment layer becomes an increasingly powerful training signal. A library of 1000 carefully enriched books represents a dataset of human literary judgment at a depth that does not exist elsewhere. That dataset has value. The value is not extractable by training a model to replicate it. The value is in the original: the library itself, as a curated artifact.

---

## What Success Looks Like

### At 100 books

The full range of reading states in the taxonomy has multiple candidate books. No single profile routes to only one option. A reader returning after six months has a plausible chance of receiving a different recommendation.

The review workflow is established and consistently applied. New books are reviewed by a second curator before publication. The voice is recognisable across all entries — a reader who has received recommendations from several books would know, reading the copy, that they came from the same place.

The affiliate link is live for at least the primary retailer (Bokus). Every book has an ISBN, a cover image, and a working deeplink.

The taxonomy has not expanded arbitrarily. Reading states, emotional tones, and effects are the same values as at launch, with possible additions where genuine gaps were found — additions that were documented and deliberate.

**At 100 books, Bokhyllan is a real product.**

### At 500 books

The recommendation system has moved from deterministic rules to a weighted matching function. Multiple books are candidates for any given profile; the system chooses with intention.

The library covers Swedish literature and translated literature with depth. A reader who returns regularly can explore within a reading state — receiving books that share an emotional register but approach it from different directions.

The curation team has grown or the pace has slowed to match the available review capacity. No book has been published without full review. The backlog of approved candidates is not zero — there are always books that have been enriched and reviewed but are being held until the right moment or until a gap opens.

The taxonomy has been reviewed once — at some point between 100 and 500 books — to ensure values remain precise and well-defined. Any values that had drifted in meaning have been corrected.

**At 500 books, Bokhyllan is a substantial literary resource.**

### At 1000 books

The library is a curated atlas of literary human experience. A reader in almost any reading situation can be met with a book that was placed for exactly that moment. Returning readers encounter genuine variety.

The enrichment layer — 1000 sets of curator voice fields, each written by a human who read the book — is a unique cultural artifact. There is no equivalent dataset of this scale and this depth of literary judgment.

The affiliate relationship is established and generating revenue that supports curation. The product is self-sustaining.

The taxonomy is stable. No new values have been added in the last two years without deliberate editorial decision.

**At 1000 books, Bokhyllan has built something that cannot be replicated quickly.** Not the technology. Not the design. The library.

---

## What Risks Threaten Library Quality

**Speed pressure.** The most dangerous risk. If the pace of addition is set by a publishing schedule or a target number rather than by the available review capacity, entries will be rushed. Rushed entries have weak curator voice. Weak curator voice erodes trust. The target number is a vanity metric; the quality of each entry is the actual metric.

**Curator drift.** As the library grows, the voice must remain consistent. If different curators write in significantly different registers, the library becomes incoherent. The review workflow is the primary defense. The existing library is the reference.

**Taxonomy inflation.** Each time a book is added that doesn't quite fit the existing taxonomy, the temptation is to add a new value. At small scale, this is harmless. At scale, a taxonomy with fifty reading state values is not precise — it is abandoned. New values must require justification and deliberate decision.

**The completeness trap.** The urge to have a book for every situation, for every reader, for every genre expectation. Bokhyllan is not a complete bookshop. It is a curated selection. A gap in the library is not a failure — it is honesty about what has been curated carefully enough to include.

**Treating published as finished.** A book in the library at 13 was curated in the context of 13 books. At 1000 books, that entry may no longer be correctly positioned — its taxonomy may have shifted in meaning, its curator voice may have drifted from the established standard, its routing may be crowded by better-matched alternatives. The library needs occasional retrospective review, not only forward addition.

---

## Summary

| Question | Answer |
|---|---|
| First milestone | 100 books — real coverage, established discipline |
| Path to 1000 | Sustained enrichment at constant quality, never speed |
| What Bokhyllan owns | The enrichment layer — cannot be bought, scraped, or replicated |
| What can be automated | Metadata, scaffolding, consistency checks |
| What cannot be automated | Curator voice, taxonomy judgment, publication decision |
| Should Bokhyllan train its own model | No — generated copy erodes the trust the product depends on |
| How LLMs can help | Candidate suggestion, metadata scaffolding, voice consistency checking |
| Primary risk | Speed pressure — adding books faster than they can be reviewed well |
| Success condition at 1000 books | A curated artifact that cannot be replicated quickly |

The path to 1000 books is the same path as the path to 13. Read the book. Write honestly about what it does to a reader. Assign taxonomy with precision. Review it. Publish it when it is ready.

Do this 1000 times. That is the library.
