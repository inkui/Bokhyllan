# Frontend Architecture v1

## Bokhyllan — Swedish Literary Recommendation Experience

## 1. Purpose

This frontend architecture defines how Bokhyllan should be implemented as a calm, Swedish, literary recommendation product.

The implementation must preserve:

* Swedish literary warmth
* bookstore atmosphere
* restrained UX
* typography-led hierarchy
* warm paper surfaces
* dark green emotional depth
* recommendation sacredness
* invisible AI feeling
* calm interaction pacing

This is not a SaaS app, dashboard, ecommerce site, chatbot, or social platform.

It is a restrained digital bookstore experience.

The frontend should make the user feel:

> “A thoughtful bookseller has carefully placed the right book in front of me.”

---

## 2. Recommended Stack

### Framework

Use:

```text
Next.js
```

Recommended mode:

```text
Next.js App Router
TypeScript
```

Why:

* Strong routing model
* Good for static and dynamic pages
* Easy deployment
* Works well with component-based UI
* Codex handles it reliably
* Supports progressive expansion without overengineering

---

### Styling

Use:

```text
Tailwind CSS
```

Why:

* Fast iteration
* Design tokens can be centralized
* Excellent for spacing and responsive refinement
* Easy for Codex to maintain
* Avoids premature custom CSS sprawl

Tailwind should be configured with custom tokens for:

* colors
* typography
* spacing
* shadows
* border radius
* motion durations

---

### Motion

Use:

```text
Framer Motion
```

But sparingly.

Motion must be:

* calm
* slow
* restrained
* literary
* purposeful

Do not use animation as decoration.

Motion exists only to support:

* arrival
* reveal
* transition
* emotional pacing
* card selection

---

### Deployment

Use:

```text
Vercel
```

Why:

* Native Next.js support
* Fast previews
* Easy sharing
* Good for MVP iteration

---

## 3. Project Structure

Recommended structure:

```text
app/
  layout.tsx
  page.tsx
  recommend/
    page.tsx
    gift/
      page.tsx
    self/
      page.tsx
    reveal/
      page.tsx
  saved/
    page.tsx
  about/
    page.tsx

components/
  layout/
    SiteShell.tsx
    Header.tsx
    Footer.tsx

  home/
    TwoDoorsHero.tsx
    DoorChoiceCard.tsx

  recommendation/
    RecommendationReveal.tsx
    RecommendationCard.tsx
    BookCover.tsx
    RecommendationExplanation.tsx
    PracticalNotes.tsx
    RecommendationActions.tsx

  ui/
    Button.tsx
    TextLink.tsx
    Surface.tsx
    PageIntro.tsx

data/
  sampleBooks.ts
  sampleRecommendations.ts

lib/
  motion.ts
  tokens.ts
  routes.ts

styles/
  globals.css
```

Keep the structure small.

Do not create enterprise folders like:

```text
services/
repositories/
controllers/
providers/
modules/
```

unless there is a real need later.

---

## 4. Route Architecture

MVP routes:

```text
/
```

Homepage with The Two Doors.

```text
/recommend
```

Entry or redirect route for recommendation start.

```text
/recommend/gift
```

Future gift flow.

```text
/recommend/self
```

Future self recommendation flow.

```text
/recommend/reveal
```

Approved recommendation reveal screen.

```text
/saved
```

Saved recommendations, later.

```text
/about
```

Short philosophy/about page.

---

## 5. Implementation Priority

Build in this order:

### Phase 1 — Visual Foundation

1. Global layout
2. Color tokens
3. Typography setup
4. Homepage: The Two Doors
5. Recommendation Reveal: Bokens ögonblick

No backend.
No real recommendation engine.
No login.
No save system.

The goal is visual and emotional correctness.

---

### Phase 2 — Interaction Foundation

1. Door card hover/tap states
2. Homepage transition into reveal
3. Reveal animation
4. Button/link states
5. Reduced motion support

---

### Phase 3 — Content Structure

1. Sample recommendation data
2. Reusable recommendation object type
3. Book cover component
4. Recommendation explanation component
5. Practical notes component

---

### Phase 4 — MVP Flow

1. “Någon jag bryr mig om”
2. “För mig själv”
3. Minimal question flow
4. Recommendation reveal
5. External book link

---

## 6. Typography Architecture

Typography is one of the most important implementation areas.

Use a serif for:

* hero headline
* recommendation title
* emotional descriptors
* literary explanation blocks

Use a sans-serif for:

* navigation
* buttons
* helper text
* practical notes
* small labels

Recommended font strategy:

```text
Serif: EB Garamond, Cormorant Garamond, or Libre Baskerville
Sans: Inter, Source Sans 3, or system sans
```

The typography should feel:

* Swedish
* literary
* calm
* human
* readable

Avoid:

* fashion magazine typography
* excessive contrast
* luxury branding feeling
* overly dramatic serif styling

Suggested hierarchy:

```text
Hero title:
  serif
  48–72px desktop
  36–44px mobile
  line-height: 0.95–1.1

Screen question:
  serif
  32–48px desktop
  28–36px mobile
  line-height: 1.15

Recommendation title:
  serif
  34–52px desktop
  30–40px mobile

Body explanation:
  serif or soft sans
  18–21px
  line-height: 1.6–1.8

Practical notes:
  sans
  13–15px
  line-height: 1.5
```

---

## 7. Color Architecture

Core palette:

```text
--color-green-deep: #0e221f
--color-green-literary: #16362f
--color-paper: #efe3c7
--color-paper-soft: #f6eddb
--color-walnut: #5c3d2e
--color-brass: #b8956d
--color-brass-muted: #8a6f48
--color-ink: #1f1a14
--color-ink-soft: #5d5248
--color-muted: #8f8172
```

### Usage

Homepage:

* primary background: warm paper
* door panels: deep green and walnut/brown
* accents: brass/gold
* text: warm ink

Recommendation reveal:

* primary background: deep green
* book/recommendation surface: warm paper
* accents: brass/gold
* text on dark: warm cream
* text on light: warm ink

Do not invert the homepage into full dark mode.

The homepage is the entrance.

The reveal screen is the emotional inner room.

---

## 8. Surface & Material System

The product should feel physical.

Surfaces should suggest:

* paper
* clothbound books
* dark wood
* warm reading light
* quiet bookstore interiors

Use:

* subtle shadows
* soft borders
* gentle contrast
* restrained texture if implemented carefully

Avoid:

* glassmorphism
* hard outlines
* neon gradients
* glossy panels
* tech-dark-mode surfaces

Recommended surface types:

```text
PaperSurface
DarkGreenSurface
WalnutSurface
BookCardSurface
RevealSurface
```

---

## 9. Component Architecture

### SiteShell

Responsible for:

* page background
* global padding
* max-width
* header/footer placement

Should remain quiet.

---

### Header

Minimal.

Contains:

* logo/name
* “om”
* “vanliga frågor”

Avoid:

* large nav
* feature links
* account complexity
* CTA-heavy header

---

### TwoDoorsHero

Homepage centerpiece.

Contains:

* title/question
* two DoorChoiceCards
* quiet helper link

Must preserve:

* symmetry
* calmness
* low-friction clarity
* Swedish warmth

---

### DoorChoiceCard

Props:

```ts
type DoorChoiceCardProps = {
  title: string
  subtitle?: string
  tone: "green" | "walnut"
  href: string
}
```

Behavior:

* subtle hover lift
* soft shadow
* no flashy motion
* clear touch target

---

### RecommendationReveal

The emotional heart of the product.

Contains:

* book cover
* emotional descriptor
* title
* author
* explanation
* voice/tone notes
* practical notes
* actions

Should feel singular.

Not a grid.
Not a feed.
Not comparison UI.

---

### BookCover

Should preserve book as physical object.

Use:

* strong placement
* soft shadow
* no aggressive cropping
* no overlays unless subtle

---

### RecommendationExplanation

Should support:

* short paragraphs
* generous line-height
* literary pacing
* Swedish natural tone

---

### PracticalNotes

Small, calm metadata.

Examples:

```text
ca 260 sidor
lågmäld
varm
passar för långsam läsning
```

No ratings.
No review counts.
No “match score”.

---

### RecommendationActions

Actions should be secondary to the recommendation.

Possible labels:

```text
Hitta boken
Spara till senare
Visa något annat
```

Avoid:

```text
Köp nu
Beställ direkt
Lägg i varukorg
```

The purchase action should not feel aggressive.

---

## 10. Motion Architecture

Motion should feel like:

* turning a page
* entering a quiet room
* a bookseller placing a book down

Recommended timings:

```text
hover: 160–220ms
page transition: 350–500ms
card reveal: 500–700ms
recommendation reveal: 800–1200ms staggered
```

Easing:

```text
ease-out for appearance
ease-in-out for transitions
```

Framer Motion variants should live in:

```text
lib/motion.ts
```

Example motion concepts:

```text
softFadeIn
gentleRise
slowReveal
doorHover
bookReveal
```

Reduced motion:

* disable movement
* keep opacity fades minimal
* preserve usability

---

## 11. State Management

Do not use Redux, Zustand, or complex global state for MVP.

Use:

* local component state
* URL routes
* small typed data objects

Later, if needed:

* simple server actions
* lightweight persistence
* database only when saving recommendations/accounts

MVP can use static data first.

---

## 12. Data Model

Initial recommendation type:

```ts
export type Recommendation = {
  id: string
  title: string
  author: string
  coverImage: string
  emotionalDescriptor: string
  explanation: string
  voiceNote?: string
  practicalNotes?: string[]
  purchaseLabel?: string
  purchaseUrl?: string
}
```

Avoid adding:

```text
rating
score
matchPercentage
popularity
reviewCount
algorithmReason
```

Those concepts violate the product.

---

## 13. Responsive Strategy

Mobile first.

Mobile:

* single column
* full-width cards
* large readable type
* generous vertical rhythm
* no horizontal comparison

Desktop:

* more whitespace
* wider breathing room
* restrained two-column only where appropriate
* never fill space with extra content

Recommendation reveal on desktop may use:

* book cover left
* explanation right

On mobile:

* book cover first
* title/explanation below
* actions last

---

## 14. Accessibility

Accessibility supports trust.

Requirements:

* semantic HTML
* keyboard navigation
* visible focus states
* good color contrast
* readable font sizes
* reduced motion support
* touch targets at least 44px
* no text embedded in images
* no interaction hidden only behind hover

Focus states should use brass or warm outline, subtly.

---

## 15. Performance Principles

The product should feel quiet and fast.

Prioritize:

* optimized fonts
* optimized book cover images
* minimal JavaScript
* no heavy animation loops
* static rendering where possible
* no unnecessary client components

Use client components only when interactivity or animation requires it.

Default to server components in Next.js.

---

## 16. Anti-Patterns

Do not implement:

* dashboard layouts
* AI chat UI
* social feeds
* reviews
* ratings
* score badges
* recommendation grids
* trending sections
* “users also liked”
* gamification
* notification systems
* excessive filters
* ecommerce cart metaphors
* aggressive purchase CTAs

If it feels like Amazon, Goodreads, SaaS, or an AI tool, it is wrong.

---

## 17. Codex Implementation Guidance

Codex should build in this order:

1. Create Next.js + TypeScript + Tailwind project
2. Add global color and typography tokens
3. Build `SiteShell`
4. Build `Header`
5. Build `TwoDoorsHero`
6. Build `DoorChoiceCard`
7. Build static homepage matching approved design direction
8. Build `RecommendationReveal`
9. Add sample recommendation data
10. Add calm motion with Framer Motion
11. Add responsive behavior
12. Add accessibility refinements

Codex must preserve:

* restraint
* Swedish tone
* calmness
* typography hierarchy
* dark green reveal atmosphere
* warm paper homepage
* recommendation sacredness
* invisible AI feeling

Codex must not add:

* extra sections
* dashboards
* analytics UI
* reviews
* ratings
* social mechanics
* visible AI language
* unnecessary components

---

## 18. Implementation Principle

The frontend is not a container for features.

It is the emotional room where the recommendation happens.

Build less.

Make it calmer.

Let the book carry the moment.