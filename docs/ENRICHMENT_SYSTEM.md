# Enrichment System v1

**How does a book receive its Bokhyllan identity?**

This document explains how a book moves from three facts — a title, an author, an ISBN — to a fully curated Bokhyllan book that the recommendation engine can place with care. It is a description of a workflow and a set of editorial principles. It is not an implementation specification. It does not design code, and it does not redesign the Book Atlas — it assumes the Atlas as defined in `BOOK_ATLAS_FOUNDATION.md` and the pipeline scaffolding in `LIBRARY_IMPORT_PIPELINE.md`.

> Note on sources: this document references a curator-voice system and a question-design system that are not yet written as standalone docs. The principles attributed to them here are drawn from the curator voice section of `BOOK_ATLAS_FOUNDATION.md` (Part 5) and the interpretation model in `RECOMMENDATION_INTELLIGENCE.md`. When those documents exist, this one should be reconciled with them.

---

## The Core Question

A book enters the world as bibliographic data. Title, author, ISBN. From those three facts a great deal can be recovered automatically — cover image, page count, publication year, original language, a publisher blurb. None of that is curation.

A Bokhyllan book is something else. It is a book the system understands well enough to hand to the right person at the right moment, in language that makes the reader feel met rather than marketed to. The Atlas calls this *curator voice*, and it is the product. Enrichment is the work of producing it.

So the core question is not "what is this book about?" It is: **what does this book do to a reader, who is it for, and why does it belong in this library?** Bibliographic data cannot answer that. The enrichment system is how Bokhyllan answers it — deliberately, with a human at the center and machines in support.

---

## The Enrichment Workflow

A book travels through six stages. The pipeline in `LIBRARY_IMPORT_PIPELINE.md` already names the model objects for these stages; this document explains what *happens* in each.

```text
Candidate → Metadata → Context Gathering → Enrichment Draft → Human Review → Approved CuratedBook
```

**Candidate.** A book is nominated. The source might be a curator's instinct, a reader's request, or a deliberate attempt to fill a thematic gap in the library. At this point the system holds almost nothing: a title, an author, perhaps a note on why it was nominated. There is no commitment to include it. (`BookCandidate`.)

**Metadata.** The ISBN is located, and the recoverable bibliographic layer is fetched — title canonicalisation, author, publication year, cover image, page count (which maps to length category), original language, and any publisher description. This is the layer that exists in a database somewhere. It is necessary, it is automatable, and it is *not* curation. (`BookMetadata`.)

**Context Gathering.** Before anyone proposes an emotional reading of the book, the relevant context is assembled — descriptions, criticism, reviews, and comparison to books already in the library. This stage feeds the draft but commits to nothing. Its quality determines whether the draft that follows is grounded or guessed.

**Enrichment Draft.** A first pass at the curator-voice and taxonomy fields is proposed — possibly by a curator working from memory of the book, possibly by an LLM working from the gathered context, usually by both. Critically, a draft is a *proposal*, never a verdict. (`BookEnrichmentDraft`.)

**Human Review.** A curator reads the draft against the book they know, corrects it, rewrites the voice, and either sends it back or marks it ready. This is the stage that cannot be skipped or automated. It is where the book becomes a Bokhyllan book.

**Approved CuratedBook.** The reviewed entry is mapped to the live `Book` shape, the affiliate link is confirmed to resolve from the ISBN, and the book becomes eligible for recommendation. (`createCuratedBookFromEnrichmentDraft`, then publish.)

The dividing line runs between *Enrichment Draft* and *Human Review*. Everything before it can be assisted by machines. Everything that makes the book trustworthy happens at the line or after it.

---

## Context Gathering

The draft is only as honest as the material it is built from. Each available source has a characteristic strength and a characteristic failure. The point of naming them is so that the draft — and the reviewer — can weight them correctly.

**Google Books metadata.**
*Strength:* reliable for the recoverable layer — title, author, ISBN linkage, page count, publication year, cover. Broad coverage, including translations and editions.
*Weakness:* descriptions are publisher-supplied marketing copy. They describe plot and sell the book; they say nothing trustworthy about reading experience. Useful for identity, near-useless for voice. Editions and translations can be conflated.

**Open Library metadata.**
*Strength:* open, good for cross-checking ISBNs, editions, and original-language/translation facts that matter to a Swedish readership. A useful second opinion against Google Books.
*Weakness:* coverage and completeness are uneven, especially for recent or non-English titles; records are community-edited and can be wrong or sparse. Best treated as corroboration, not primary truth.

**Publisher descriptions.**
*Strength:* occasionally surface genuine information about register or theme, and signal how the book is positioned.
*Weakness:* they are advertising. They overstate, they use review-blurb language, and they describe the book the publisher wants to sell, not the experience the reader will have. They are the single most dangerous input to feed an LLM directly, because they are fluent and confident and wrong in exactly the way the Atlas warns against — they describe the book, not the reading.

**Literary criticism.**
*Strength:* the richest source for emotional register, what the book *does*, and why it might belong in a thoughtful library. Critics write about effect and texture, which is precisely what the Atlas needs.
*Weakness:* coverage is biased toward canonical, prize-winning, and literary-fiction titles. Quieter or more recent books may have none. Criticism also carries its own agenda and can be more interested in the critic's argument than the reader's experience.

**Reviews (reader reviews, aggregators).**
*Strength:* a wide, unfiltered signal about how real readers actually felt — sometimes the only source that speaks to reading *energy* ("I had to put it down," "I read it in one sitting").
*Weakness:* dominated by popularity and recency, skewed by the kind of reader who posts, and noisy. Aggregate scores are exactly the commercial signal Bokhyllan refuses to import. Reviews are useful as texture and as a check on energy/pacing claims, never as a verdict.

**Existing Bokhyllan books.**
*Strength:* the most valuable source for *voice and calibration*. They show what an approved entry sounds like, how the taxonomy has actually been applied, and whether a candidate is redundant with or distinct from what is already shelved. This is the in-house standard.
*Weakness:* a closed loop. Leaning on existing books too hard reproduces the library's current blind spots and pushes every new book toward the register of the books already there. They calibrate voice; they should not constrain which books are allowed to exist.

A practical hierarchy follows from this: trust the bibliographic sources for *identity*, trust criticism and existing Bokhyllan books for *register and voice*, treat reviews as *texture and energy evidence*, and treat publisher copy as a *hostile witness* — read it, never repeat it.

---

## The Enrichment Draft

An LLM (or a curator drafting quickly) may propose values for every Atlas field. The essential discipline is that the draft proposes *without claiming certainty*. Each proposed field should arrive with a confidence and, ideally, the evidence it rests on — so the reviewer is correcting a transparent argument, not auditing a black box.

The fields that can be drafted, and how they should be proposed:

- **emotionalTone** — the book's emotional texture (still, tender, haunting…). Drafted from criticism and register language, not from plot summary. Proposed as a short candidate set with reasoning, not a single confident label.
- **readingState** — who is ready to receive this book. The hardest field to infer from text, because it is about the *reader's* condition, not the book's content. A draft should propose at most two or three and flag this field as low-confidence by default.
- **readingEnergy** — what attention the book asks for. This is where reader reviews are genuinely useful ("dense," "couldn't stop," "had to take breaks"). Proposed as a single scalar with the evidence that supports it.
- **emotionalEffects** — what the book does to someone who finishes it (calms, companions, opens perspective). Drafted from criticism and reader accounts of aftermath, never from the blurb's promises.
- **atmosphere** — the dominant environmental feeling. Often inferable from setting and register; proposed with low stakes since it refines rather than drives placement.
- **pacing** — how the book moves through time. Reviews and criticism both speak to this; proposed as a candidate set.
- **emotionalDescription** — *what reading this book feels like.* The draft must describe the reading experience, not the plot. An LLM will drift toward plot summary; the prompt and the reviewer must hold it to experience. Proposed as a rough draft explicitly marked for rewriting.
- **curatorConnection** — *why this book belongs in this library.* This is the field a machine is least able to produce honestly, because it is a personal editorial judgment. A draft can suggest a *direction* ("this might sit alongside the quiet-grief books"), but it should never fabricate a personal connection. Better to leave it pending than to invent it.
- **voiceNote** — an image or texture that doesn't fit elsewhere. Optional, low-confidence, easily left empty for the curator to supply.

The governing rule: **the draft is a structured hypothesis.** Taxonomy fields are proposed with evidence and confidence. Voice fields — especially `curatorConnection` — are proposed as scaffolding to be rewritten or replaced, never as finished copy. A draft that reads like finished copy is more dangerous than an empty one, because it invites the reviewer to approve rather than to read.

---

## Human Review

Review is the load-bearing stage. The Atlas already defines a four-step, roughly ten-minute review workflow (taxonomy check, curator-voice read, placement test, completeness check); this section maps that workflow onto what enrichment specifically requires.

**What must be reviewed — always.**

- **Every voice field.** `emotionalDescription`, `curatorConnection`, and `voiceNote` are the product. They must sound like Bokhyllan, describe the reading and not the plot, and tell the truth about what the reader is getting into. `curatorConnection` in particular must carry a genuine reason the book is here — if a machine drafted it, it is almost certainly wrong or hollow and must be rewritten by the curator.
- **readingState assignments.** The field most likely to be wrong, because it cannot be reliably inferred from text. The reviewer mentally routes the book: who receives it, and is that the right person?
- **The honesty of every taxonomy tag.** Per the Atlas anti-patterns: tags must describe what the book *does*, not what we wish it did or what a reader needs. Aspirational tagging is a routing error in waiting.

**What can be trusted — with a glance.**

- Bibliographic metadata fetched from a reliable source: title, author, publication year, cover, page count → length category. These are recoverable facts; a quick correctness check suffices.
- Low-stakes refining fields like `atmosphere`, once the register is confirmed, since they shape copy rather than drive placement.

**What must never be blindly accepted.**

- **Publisher-derived language anywhere in the voice fields.** If a sentence reads like a book jacket, it fails, regardless of how fluent it is.
- **Confident emotional claims with no evidence behind them.** A machine asserting that a book "calms" or "is for the grieving" with no supporting source is exactly the failure mode this system exists to catch.
- **`readingState` and `emotionalEffects` taken on the draft's word.** These determine who the book reaches and what the recommendation implicitly promises. They are checked against the book the curator actually knows, every time.
- **A complete-looking draft as a signal of quality.** Completeness is not correctness. A fully populated draft that has not been read against the book is a catalogued book, not a curated one.

The reviewer's authority is absolute: they may overwrite any proposed value, send a book back for re-gathering, or reject the candidate entirely. Approval is an explicit human act, never a default that happens when no one objects.

---

## Learning From Bokhyllan

Every approved book makes the next enrichment better — but it is worth being precise about *how*, because it is easy to mistake this for something it is not.

Approved Bokhyllan books become **examples**. When context is gathered and a draft is proposed for a new candidate, the existing library is the reference for what good looks like: this is how a `curatorConnection` reads when it's right, this is how the taxonomy is applied honestly, this is the register the voice fields hit, this is a book that occupies an adjacent shelf. A draft can be prompted with the closest existing entries so that its proposals are calibrated to Bokhyllan's actual standard rather than to the internet's average.

**Why this is not model training.** No weights change. Nothing is fine-tuned. The model is exactly the same model before and after a book is approved. The approved books are not absorbed into a model — they sit in the library as text and are *shown* to the drafting step as reference material, the same way a junior editor is handed a stack of well-edited entries and told "match this." Pull the examples away and the system reverts instantly; there is no residue, no learned distribution, no opaque generalisation. That is the opposite of training.

**Why this is closer to editorial guidance.** What accumulates is not a model but a *house style* expressed as concrete examples. An approved corpus functions the way a style guide and a morgue of past issues function in a newsroom: it tells the next draft what register to hit, which moves are house and which are off-brand, and where the bar is. It is inspectable — a curator can read exactly which examples are steering a draft and disagree with them. It is reversible and correctable — remove or fix a bad example and its influence is gone. And it keeps the human as editor-in-chief: the examples *advise* the draft, they do not *decide* the book. Decisions still happen at Human Review, by a person.

This distinction matters for the system's integrity. Editorial guidance can be audited, argued with, and rolled back. A trained model cannot, easily. Bokhyllan deliberately keeps its accumulated judgment in a form that stays legible and under human control.

---

## Failure Modes

Enrichment that leans on machines and aggregated sources inherits predictable pathologies. Each is named here with the specific protection Bokhyllan relies on.

**Hallucinated enrichment.** The draft asserts a reading experience or connection that has no basis in any source — a plausible-sounding `curatorConnection` for a book no one has read.
*Protection:* drafts carry evidence and confidence; voice fields are proposed as scaffolding, not copy; and Human Review checks every voice field against the book the curator actually knows. A claim with no evidence is rewritten or removed.

**Over-tagging.** The draft assigns many reading states and effects to maximise routing exposure, producing a book that routes to everyone and means something to no one.
*Protection:* the Atlas rule — two or three genuinely served reading states per book — is enforced at review. A draft proposing more is treated as a signal the book was not read carefully, not as generosity.

**Genre bias.** Sources over-describe what is typical of a genre, so the draft tags a literary novel "literary," a quiet book "slow," collapsing the book into its category instead of its experience.
*Protection:* Bokhyllan's taxonomy is built on reading moments, not market categories, and the voice fields forbid plot and category language. The reviewer asks what *this* book does, not what its genre usually does.

**Review bias.** Reader reviews skew toward the loud, the polarising, and the kind of reader who posts — so drafting from reviews imports a distorted emotional picture.
*Protection:* reviews are admitted only as *texture and energy evidence*, never as verdict, and aggregate scores are refused outright. Criticism and the in-house corpus carry register; reviews merely corroborate pacing and energy.

**Popularity bias.** Well-known books have abundant context and quiet books have little, so the system enriches popular books confidently and neglects the rest — and the "learn from Bokhyllan" loop can amplify whatever register already dominates the shelf.
*Protection:* candidates are nominated to fill deliberate gaps, not by popularity; existing-book examples calibrate voice but are explicitly not allowed to constrain which books may exist; and sparse context lowers a draft's confidence rather than its priority. A quiet book with little context simply demands more of the human, which is acceptable.

**False confidence.** The most corrosive mode: a fluent, complete, confident draft that is wrong, which invites approval-by-default.
*Protection:* drafts are required to express uncertainty (confidence per field), completeness is explicitly *not* treated as quality, and approval is an explicit human act. A polished draft gets *more* scrutiny on its voice and `readingState`, not less, precisely because polish is where false confidence hides.

The common thread: machines may *propose*, sources may *inform*, but only a human *approves* — and the human is structurally encouraged to distrust fluency.

---

## Why This System Can Support 1000 Curated Books

The claim is not that automation scales the curation. It is that this division of labour keeps the *human* part bounded while letting everything else grow.

Here is the grounded version of the argument.

**The expensive part is bounded and stays bounded.** The only step that does not scale automatically is Human Review, and the Atlas already establishes that a competent reviewer can complete one in about ten minutes. Enrichment's job is to make sure those ten minutes are spent *correcting and rewriting voice*, not hunting for facts or starting from a blank page. A reviewer who opens a draft with metadata filled, context gathered, taxonomy proposed-with-evidence, and voice scaffolding in place spends their scarce attention where it actually matters. Ten minutes a book is a real budget: 1000 books is on the order of 160 reviewer-hours of the irreducible work — large, but unmistakably finite, and spreadable across curators and across time.

**The cheap parts genuinely scale.** Metadata fetch and context gathering are mechanical and parallelisable. The marginal cost of drafting the 900th book is the same as the 90th. Nothing about the volume of bibliographic data or gathered context threatens the system.

**Quality is protected by structure, not by heroics.** The Atlas already names the two real risks at scale — taxonomy drift and voice degradation — and this system's review discipline is the answer to both. Tags are checked for honesty every time; voice is read against the book every time; completeness is never mistaken for quality. These are habits, not feats, and habits scale.

**Accumulated judgment compounds in the right direction.** Because approved books become inspectable editorial examples (not a trained model), every book added makes the next draft slightly closer to house standard, which slightly shortens the review. The loop tightens over time instead of degrading — provided the gap-filling and anti-popularity discipline keep the example set diverse. And because the mechanism is reversible, a drift in style can be corrected by fixing examples, not retraining anything.

**The honest caveats.** This holds *only if* three disciplines hold. The taxonomy vocabulary must stay small and precise (sprawl is the failure that makes 1000 books unmanageable). Review must remain a real human act and not decay into rubber-stamping fluent drafts. And nomination must keep filling gaps rather than chasing well-documented popular titles. None of these is guaranteed by the architecture — they are editorial commitments. The system makes 1000 books *achievable*; the discipline to maintain precision and voice quality at that scale is what makes them *worth having*.

In short: the architecture removes the parts of curation that don't scale (fact-finding, blank-page drafting) and concentrates the human on the part that must never be automated (judgment and voice), bounded at roughly ten minutes a book. That is why 1000 is a question of sustained discipline, not of technical possibility.
