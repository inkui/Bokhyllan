# Table System Definition

The conceptual foundation for Bokhyllan's table model, as decided in `TABLE_MODEL_AND_ATLAS_DIRECTION_REVIEW.md` (direction: `Atlas → Table → Book`, table-led, curator-authoritative).

This document defines *what a table is*. It does not create any tables, name any tables, design a data contract, schema, API, UI, or runtime model. It is product philosophy and curatorial doctrine only. Nothing here is implemented until the documents listed in the direction review are approved.

---

## 1. What Is a Table?

**A table is a curator's standing answer to a recognizable human reading-moment, expressed as a small, ordered, hand-composed set of books.**

The name is literal. It is the table near the front of a good bookshop — the one with a handwritten card — where a bookseller has set out a few books they would press into your hands if you walked in feeling a particular way. Not the whole shop reorganized by an algorithm; a small, deliberate arrangement that says *if this is your moment, start here.*

Three things are true of a table at once:

- It is **anchored to a reader-moment**, not to a property of books. It exists because a kind of person, in a kind of state, walks in — tired, grieving-but-not-wanting-to-be-cheered, returning to reading after years away, buying for someone they barely know.
- It is **composed by judgment**, not assembled by query. A curator chose these books, in this company, in this order, including the ones that don't obviously belong. The composition *is* the curation.
- It is **a hand-off, not a list.** Its purpose is to put *one* book in a reader's hands with confidence, with the rest standing behind it as "or, if not that, this."

A table is therefore an **act of curation made durable** — the bookseller's judgment, captured once, so it can reach readers at scale without being averaged into a score. It is the unit in which Bokhyllan's taste lives.

---

## 2. What Is NOT a Table

A table is frequently confused with concepts it resembles. Each distinction matters, because the whole architecture depends on tables being a *different kind of object* from book metadata.

**A table is not a genre.**
A genre (`literary_fiction`, `poetry`) describes *what kind of book this is* — an intrinsic, operational property used for balance and validation (`GENRE_TAXONOMY_V1.md`). A genre is book-defined and exhaustive (every book has one). A table is reader-defined and selective (a curator chose to build it). A book has one genre; it may sit on many tables, and a single table may cross many genres on purpose.

**A table is not a theme.**
A theme (`grief`, `solitude`, `memory`) describes *what a book explores* — an attribute discovered inside the book (`THEME_TAXONOMY_V1.md`). A theme is an *ingredient*. A table is the *dish*: a judgment about which books, in which company, serve a moment. A curator may use the theme `grief` to find candidates for a grief-related table, but the table is not "all grief books" — it is the few they would actually hand over, possibly including a book with no grief theme at all because it sits with the grieving better than any book about grief.

**A table is not a mood.**
A mood (`still`, `melancholic`, `luminous`) is *one felt register* of a book's reading experience (`MOOD_TAXONOMY_V1.md`). A table may deliberately span moods, because a curator knows that for a given moment either a still book *or* an absorbing one could be right. Mood is a property of a book; a table is a decision about people.

**A table is not a tag.**
Tags are future operational descriptors (form, accessibility, length-use-case) — flexible book attributes meant to stay governed and auditable. A tag describes a book; a table describes a *response* to a reader. Tags may help a curator filter candidates; they never compose a table.

**A table is not a recommendation path.**
A recommendation path is the *route* a reader travels (answers → interpretation → result). A table is the *destination's content* — and more than content, because it carries ordering, a lead book, and an intentional outlier. The path delivers a reader to a table; the table is not the path.

**A table is not a category.**
A category is defined top-down by a shared property of its members ("all crime novels," "all books under 200 pages"). Its membership is *derivable*. A table's membership is *not derivable* — it is authored, and two curators could compose different valid tables for the same moment. A category is a filter result; a table is a composition.

**A table is not a collection.**
A collection is a themed grouping for browsing ("Nordic noir," "Booker winners") — a set a reader scans. A table is not for scanning; it is for *receiving one book*. A collection invites the reader to choose among many; a table does the choosing and offers one, with alternatives held quietly in reserve. A collection can be large and flat; a table is small and ordered.

The one-line discipline, carried from the direction review: **genre, theme, mood, and tag are attributes of books; a table is an act of curation about readers.** Everything in this document follows from that line.

---

## 3. Why Tables Exist

Tables solve a specific, demonstrable product problem.

**The problem in the current system.** Bokhyllan's live resolver (`recommendationResolver.ts`) hard-codes a single book ID per life-moment (`preferredBookForContext` returns `"gilead"`, `"stoner"`, `"dora-bruder"`…). This is a degenerate table model: one book per moment, with no way for a curator to add a second, and no way for corpus growth to change what surfaces. Grow the library from 12 books to 1000 and a grief answer still returns the same single title. This is the **recommendation collapse** named throughout the Atlas documents.

**The two failed escapes.** There are two obvious ways to fix collapse, and Bokhyllan's identity rules out one of them:
- *Scale the engine* (the Product Spec's scoring model): let an algorithm select from the whole corpus. This fixes collapse but relocates selection authority from a human to a weight vector, which `ATLAS_V2_PHILOSOPHY_REVIEW.md` and the direction review reject — Bokhyllan is a bookseller, and a bookseller's authority is judgment, not a fit score. Scoring trends toward competent, mood-congruent, schema-legible, soulless results.
- *Scale the curation* (this model): give the curator a place to put their judgment about *kinds of moments* that any number of books can fill, where the same book serves several moments. This fixes collapse the way a real bookshop does — a few front tables over a growing inventory.

**What tables specifically buy:**
- **They decouple corpus growth from recommendation logic.** Books grow freely; the number of moments Bokhyllan serves stays human-sized; overlap connects them.
- **They keep selection authority human** while still letting Bokhyllan answer instantly and gently — the reader never has to know what they want; Atlas reads the moment and opens the right table.
- **They make serendipity possible.** A scoring engine can only surprise you with another high-scoring book; a table can hold the deliberately-wrong-on-paper book a bookseller knows is right. Surprise becomes a *designed* act.
- **They make the product auditable in human terms.** "Is the lead book on this table still right?" is answerable by a person. "Are the weights tuned?" is not.

Tables exist so that Bokhyllan can scale its inventory without scaling away the thing that makes it Bokhyllan: a person's taste standing behind every hand-off.

---

## 4. Anatomy of a Table

A table is composed of the following parts. These are *conceptual roles*, not fields — the point is what each part does for the reader, not how it is stored.

**Purpose.** A single, articulable reason the table exists, stated as a hand-off: *"For someone who [moment], offer [the kind of book that meets it]."* If a curator cannot state the purpose in one sentence without listing books, the table is not yet a table.

**Reader moment.** The human state the table answers — a *present condition*, not a persona or a taste. This is the thing Atlas reads toward (intent + capacity). The moment should be recognizable ("returning to reading after a long absence") and distinct from neighboring tables' moments (so routing can tell them apart). Moments may be self-moments or, for gifting, the giver's moment *on behalf of* a recipient — including the legitimate moment "I don't know this person well."

**Curator intent.** *Why these books, for this moment* — the judgment that justifies the composition. This is where the curator's taste is recorded: the reasoning a bookseller would murmur while reaching for the shelf. It is internal doctrine, not reader-facing copy, and it is what a reviewer checks the table against later.

**Lead book.** The one book the table hands over first — the curator's confident first choice for this moment. This is the default recommendation. Everything else on the table exists to support or replace it.

**Supporting books.** The "or, if not that, this" — the books standing behind the lead, each a defensible alternative for the same moment. They give the table depth and let it answer the moment more than once (a returning reader, a refinement, a re-route).

**Alternative books.** A narrower notion than supporting: books held specifically for *capacity variation* and *taste variation* within the same moment — e.g. a lighter/shorter alternative to lead with when the reader is depleted, or a different register for the same need. Alternatives are how a table flexes without changing its purpose.

**Surprise / serendipity slot.** At least one book included *because it does not obviously fit* — the wrong-on-paper, right-in-the-room choice that a bookseller is trusted for. Its presence is deliberate and curator-justified. This slot is what structurally distinguishes a table from any algorithmic candidate set: it is the part a score could never produce.

**Capacity considerations.** How the table behaves across reading energy and difficulty tolerance. A table should know which of its books is the gentle lead for a tired reader and which rewards full attention. Capacity is a *within-table safeguard and reorder*, never a reason to route to a different table — the moment chooses the table; capacity chooses where to enter it.

A complete table, then, is: *a stated purpose, anchored to a distinct reader moment, justified by curator intent, headed by a lead book, deepened by supporting and alternative books, sharpened by a deliberate surprise, and made safe across capacity.*

---

## 5. Table Design Principles

**What makes a good table:**
- **One clear moment.** It answers a single, recognizable human state, statable in a sentence.
- **A confident lead.** There is an obvious first book to hand over, and the curator would defend it.
- **Honest composition.** Every book earns its place by serving the moment, not by being famous, available, or easy to tag.
- **Deliberate range.** It spans enough register and capacity to answer the moment for different readers without losing focus — it can serve the tired and the attentive version of the same moment.
- **A justified surprise.** It contains at least one book the curator chose against the obvious, and can say why.
- **Distinctness.** Its moment is clearly different from neighboring tables', so a reader is rarely on the wrong one.
- **Truthful hand-offs.** A reader who receives the lead book feels the table told the truth about what they were getting — the curator-voice standard from `BOOK_ATLAS_FOUNDATION.md`, applied to composition.

**What makes a bad table:**
- **Property-disguised-as-moment.** "Literary fiction" or "melancholic books" is a category or mood wearing a table's clothes. If the membership is derivable from metadata, it is not a table.
- **No lead, or a contested lead.** If the curator cannot say which book goes first, the moment is too vague or the table is two tables.
- **Stuffing.** Adding books for coverage, popularity, or discoverability. A table that holds everything plausible means nothing to anyone — the over-tagging anti-pattern from the Atlas foundation, applied to tables.
- **Mood-congruence on autopilot.** Every book literally about the moment (all grief books for the grieving), with no judgment about indirection. Often the best book for a moment never names it.
- **Blurred edges.** A moment indistinguishable from a neighbor's, causing routing ambiguity and reader whiplash.
- **No surprise.** A table that only contains the obvious is a category with extra steps; it has surrendered the one thing a bookseller adds.
- **Quota-built.** Composed to fill a slot in some grid rather than because a curator would actually hand these books over.

---

## 6. Table Lifecycle

Tables are living artifacts. They are authored, stocked, refined, occasionally split or merged, and sometimes retired. The lifecycle tracks the corpus growth stages in `CORPUS_GROWTH_ROADMAP.md` and `CORE_LIBRARY_DATASET_SPEC.md`.

- **Authoring.** A table begins when a curator recognizes a distinct reader-moment worth a standing answer and can name a confident lead book. A moment with no good lead is not yet ready to be a table.
- **Stocking.** As the corpus grows (Core 100 → 500 → 1000), tables gain supporting, alternative, and surprise books. **This is how the library's growth reaches the reader** — new books mostly enter the product by being placed on existing tables, not by spawning new tables. A book authored once may join several tables.
- **Refinement.** The lead book may change as better candidates arrive; the surprise slot may rotate; capacity coverage may deepen. Refinement is the routine work of keeping a table honest against the live corpus.
- **Splitting.** When a single moment proves to contain two genuinely distinct moments (a frequent, healthy sign of maturity — e.g. a grief moment that splits into grief-wanting-company and grief-wanting-solitude), the table splits. Splitting is preferable to letting a table sprawl.
- **Merging.** When two tables' moments prove indistinguishable in practice (readers route between them arbitrarily), they merge. Merging fights fragmentation.
- **Retiring.** A table whose moment no longer reflects how readers actually arrive, or which has gone stale, is retired rather than left to rot. A stale table ages worse than a stale weight, so retirement is a real and necessary act.

The governing rule of the lifecycle: **the corpus scales by stocking tables; the table set scales by splitting and merging, slowly and deliberately.** Book count grows freely; table count grows reluctantly.

---

## 7. Table Overlap

**Yes — books appear on multiple tables, and this is essential, not incidental.**

Overlap is the mechanism that lets a bounded number of tables cover a large, growing corpus. Without it, every new moment would need its own private inventory and the model would not scale. With it, a few dozen tables can richly answer hundreds of moments using a thousand books.

Overlap is also *true to reality*: one book is genuinely the right hand-off for several different moments. A quiet, consoling novel may lead the "grief that wants company" table, support the "returning to reading" table, and sit as the surprise on a "buying for someone I barely know" table. The same book plays a *different role* on each — lead here, support there, surprise elsewhere — and that role is part of the curation.

What overlap is *not*: it is not duplication to pad tables, and it is not a book belonging to a table because its tags match. A book overlaps onto a table only because a curator judged it serves that moment too. The same honesty test applies on every table it appears on.

A healthy sign: most strong books appear on two or three tables; a few versatile books appear on more; no book is on *every* table (a book that fits every moment fits none, the same flattening the taxonomy docs warn against).

---

## 8. Table Quality Standards

How a curator knows a table is working — stated as questions a curator can actually answer, not metrics to optimize (optimization is the failure mode in §11).

- **The vouching test.** Would the curator personally hand the lead book to a real person in this moment and stand behind it? If not, the lead is wrong.
- **The truth test.** Would a reader who received the lead book feel the hand-off told the truth about what they were getting? (The curator-voice standard.)
- **The distinctness test.** Can the curator state how this table's moment differs from each neighbor's in one sentence? If moments blur, routing will too.
- **The surprise test.** Can the curator point to the book on this table that a score would never have chosen, and say why it belongs? If there is no such book, the table has surrendered its reason to exist.
- **The depth test.** Can the table answer its moment more than once — for the tired reader and the attentive reader, for a first visit and a re-route — without losing focus?
- **The honesty-of-membership test.** Does every book serve the moment, or are some present for fame, availability, or tag-match? Remove the passengers.
- **The staleness test.** When was this table last read against the current corpus? Has a better lead or surprise arrived since?

Deliberately **not** a quality standard: click-through, conversion, save rate, or any behavioral signal. Those would convert the curator into an optimizer and the bookseller into a funnel — see §11. A table works when a curator would vouch for it, not when a metric rises.

---

## 9. Relationship to Atlas

This section is doctrine, carried from the direction review and made canonical.

**What Atlas should do:**
- **Read the reader's present moment** — interpret a few quiet answers into *intent* (what the reader is seeking) and *capacity* (what they can take on). This is the genuinely valuable intelligence preserved from the Product Spec.
- **Route to the right table.** Atlas's primary job is to map a read moment to the one table best suited to it — a bounded classification (a small set of tables), which is a task it can do reliably and auditably.
- **Apply capacity as a within-table safeguard.** Once a table is chosen, capacity may choose *where to enter it* (lead with the gentler alternative for a depleted reader). This is a reorder, never a re-route.
- **Handle uncertainty gracefully.** When the moment is ambiguous — especially gift-recipient uncertainty — Atlas routes to the table built for that uncertainty (or a default/overflow table), rather than guessing a persona.

**What Atlas must never do:**
- **Never select a book directly.** The lead book is the curator's decision, embodied in the table. Atlas opens the table; it does not pick the title.
- **Never score or rank books.** Ranking is the engine behavior the product refuses. Atlas has no fit score.
- **Never score *within* a table.** The standing temptation is to let Atlas re-order a table's books by tag-match. This smuggles the engine back in through the side door and must be refused. Capacity reorder is the *only* permitted within-table movement, and it is a hard safety rule, not a ranking.
- **Never override curator composition.** If a table's lead is wrong, the fix is the curator editing the table, not Atlas out-voting it.

The boundary in one line: **Atlas understands the human; the table embodies the judgment; the curator owns the books.** There is one boss (the table) and one usher (Atlas).

---

## 10. Relationship to Metadata

Genres, themes, moods, and future tags are real and useful — but in this model they are **the curator's instruments, not the recommendation mechanism.** They support tables without replacing judgment.

- **Genres** — corpus-balance and coverage tooling. A curator uses genre to check that the table set, in aggregate, isn't over-concentrated, and to audit the library for gaps (`GENRE_TAXONOMY_V1.md`). Genres never compose a table; they help a curator see the shape of the inventory behind the tables.
- **Themes** — the primary *candidate-finding* instrument. When stocking a table about a moment, a curator queries themes (`grief`, `solitude`, `responsibility`) to surface books worth *considering*. Themes propose; the curator disposes. The table is never "all books with theme X."
- **Moods** — refinement and texture tooling. A curator uses mood to ensure a table has the right range of felt registers for its moment, and to find a book of a specific atmosphere when one is missing. Mood informs composition; it does not dictate it.
- **Future tags** — operational filters for capacity and form (short, low-energy-friendly), useful for finding the *alternative* and capacity-lead books on a table. Deferred and governed; never a reason a book is on a table.

The governing principle: **metadata helps a curator find candidates and audit coverage; only a curator places a book on a table.** Metadata is how the curator *sees* the corpus; the table is what the curator *does* about it. If a table could be generated from metadata alone, it would not be a table — it would be a category (§2), and the curation would have been skipped.

This also resolves the Product Spec's blocking concern (the unreconciled legacy-vs-new taxonomy fork): under the table model, the taxonomies do not need to be perfectly reconciled into a scoring substrate before launch, because they are tooling, not the selector. Reconciliation becomes a quality improvement, not a launch gate.

---

## 11. Failure Modes

How the table system could betray its purpose, and the discipline that prevents each.

**Too algorithmic.**
- *Symptom:* Atlas begins scoring within tables; quality standards drift toward click-through; tables get "optimized." Selection authority quietly migrates from curator back to mechanism.
- *Cause:* the standing temptation to make tables "smarter" by ranking inside them, and the gravitational pull of any available metric toward becoming an objective function.
- *Defense:* the §9 hard rule (Atlas never scores, never selects, never ranks within a table); the §8 refusal of behavioral metrics; treat any proposal to "rank within a table" as reintroducing the engine and reject it.

**Too complex.**
- *Symptom:* tables accumulate so much internal structure (sub-slots, conditional leads, fine-grained capacity logic) that no curator can hold one in mind or maintain it.
- *Cause:* solving edge cases by adding structure to the table object rather than by curatorial judgment.
- *Defense:* keep the anatomy in §4 as the ceiling; handle the unusual case with a curator's choice, not a new structural feature; a table must stay legible to one person.

**Too broad.**
- *Symptom:* a table's moment widens until it answers everyone (a "good books" table), the lead becomes contested, and the surprise disappears.
- *Cause:* reluctance to split, or building tables around properties instead of moments.
- *Defense:* the distinctness and surprise quality tests (§8); split broad tables (§6); reject any table whose membership is derivable from metadata (§2).

**Too fragmented.**
- *Symptom:* dozens of nearly-identical tables; readers route between them arbitrarily; curator bandwidth collapses; the table set sprawls like an abandoned taxonomy.
- *Cause:* creating a new table for every nuance instead of using overlap and supporting books within existing tables.
- *Defense:* table count grows reluctantly (§6); merge indistinguishable tables; use overlap (§7) and depth (§4) to absorb nuance; treat 50+ tables as a warning line requiring either multiple curators or proof of genuinely distinct moments.

**Loss of curator voice / literary flattening** (cross-cutting).
- *Symptom:* tables built by tag-match, full of on-the-nose books, with untaggable great books sinking because no one placed them.
- *Defense:* the honesty-of-membership and surprise tests; the §10 rule that metadata only proposes candidates; the deliberate surprise slot that rewards exactly the books an algorithm would miss.

The unifying tell across all failure modes, from the philosophy review: **the system getting better at matching and worse at surprising.** That is the signal that the table model is decaying back into the engine it was built to replace.

---

## 12. Final Principles

The principles all future Atlas and table work must follow:

1. **A table is an act of curation about readers, not an attribute of books.** If it can be generated from metadata, it is not a table.
2. **Selection authority is human.** The curator chooses the books and the lead; Atlas only chooses the table.
3. **Atlas understands the human; the table embodies the judgment; the curator owns the books.** One boss, one usher.
4. **Atlas never selects, scores, or ranks books — including within a table.** Capacity reorder is the only permitted within-table movement, and it is a safety rule, not a ranking.
5. **Every table answers one recognizable moment, leads with one confident book, and holds at least one deliberate surprise.**
6. **The corpus scales by stocking tables; the table set scales reluctantly, by splitting and merging.**
7. **Books overlap onto many tables, playing different roles — but only by curator judgment, never by tag-match.**
8. **Metadata (genre, theme, mood, tags) is the curator's instrument for finding candidates and auditing coverage — never the selector.**
9. **Quality is measured by the vouching test, not by behavioral metrics.** A table works when a curator would stand behind the hand-off.
10. **The success metric is "would the curator vouch for this hand-off?" — never "did the score converge."**
11. **Watch the tell:** if the system grows better at matching and worse at surprising, it is decaying into the engine the table model exists to replace — stop and correct.

---

*End of definition. This establishes what a table is. The launch set of tables, the routing philosophy, the curation workflow, the coverage model, and the reveal-voice doctrine are separate documents to be authored before any data contract or implementation, per `TABLE_MODEL_AND_ATLAS_DIRECTION_REVIEW.md`.*
