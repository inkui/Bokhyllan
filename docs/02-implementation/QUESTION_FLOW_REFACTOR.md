/**
 * Bokhyllan — Refactored Question Flow
 * Question Design System v1 implementation
 *
 * This file defines both the Self path and Gift path question flows.
 * It is structured to drop into the existing recommendation architecture
 * without changing answerInterpretation.ts or recommendationResolver.ts.
 *
 * Each question produces signals consumed by the interpretation layer.
 * The interpretation layer maps those signals to emotionProfiles and lifeMoments.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type AnswerKey = string;

export interface QuestionOption {
  label: string;
  value: AnswerKey;
}

export type QuestionType =
  | "choice"   // 2–3 options, mutually exclusive
  | "open"     // free text, short
  | "image";   // metaphor-based choice

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  subtext?: string;           // optional quiet second line, smaller type
  options?: QuestionOption[]; // required for "choice" and "image" types
  placeholder?: string;       // for "open" type
  /**
   * Signals this question is designed to reveal.
   * Used for documentation and future tooling — not runtime logic.
   */
  signals: string[];
  /**
   * Design rationale — why this question, in this form.
   * Not shown to user. Referenced during future edits.
   */
  rationale: string;
}

export interface QuestionFlow {
  path: "self" | "gift";
  phases: QuestionPhase[];
}

export interface QuestionPhase {
  id: string;
  label: string; // internal label, not shown to user
  questions: Question[];
}

// ─── Self Path ────────────────────────────────────────────────────────────────
//
// Progression: Arrival → Orientation → Reading Readiness → Desired Experience
//
// Total questions: 4 (previously aligned to ~4–5 questions)
// The flow is designed to feel like a short conversation that narrows
// naturally, from the wide present moment toward the specific reading need.

export const selfFlow: QuestionFlow = {
  path: "self",
  phases: [

    // ── Phase 1: Arrival ─────────────────────────────────────────────────────
    // One question. Wide open. Orients the conversation to now.
    // The person does not need to know what they want — just where they are.
    {
      id: "arrival",
      label: "Arrival",
      questions: [
        {
          id: "self_present_moment",
          type: "image",
          text: "Hur har den senaste tiden känt sig?",
          subtext: "Välj det som känns närmast.",
          options: [
            {
              label: "Tung och krävande",
              value: "heavy",
            },
            {
              label: "Stillsam, lite tom",
              value: "quiet_empty",
            },
            {
              label: "Rörig, svår att landa i",
              value: "restless",
            },
            {
              label: "Ganska okej, men jag behöver andrum",
              value: "okay_needs_space",
            },
            {
              label: "Ny eller förändrad — på gott och ont",
              value: "transitioning",
            },
          ],
          signals: [
            "energy_level",
            "emotional_direction",
            "life_moment_quality",
            "tolerance_for_difficulty",
          ],
          rationale: `
            Previously: abstract or genre-based opening.
            Now: an image question grounded in the present moment.

            "Hur har den senaste tiden känt sig?" opens wider than a mood
            question — it invites the person's whole recent situation without
            naming it. The options are emotional directions, not categories.
            They avoid clinical language ("burnout," "stress") and avoid
            positivity pressure ("I'm great"). Each option maps cleanly
            to the interpretation layer's emotional profiles.

            "Tung och krävande" → comfort / recovery modes
            "Stillsam, lite tom" → companionship / comfort modes
            "Rörig, svår att landa i" → stillness / perspective modes
            "Ganska okej, men behöver andrum" → stillness / wonder modes
            "Ny eller förändrad" → new beginning / quiet courage modes
          `,
        },
      ],
    },

    // ── Phase 2: Orientation ─────────────────────────────────────────────────
    // One question. Emotional need direction.
    // A choice question — confirms direction established in Phase 1.
    // Does not repeat Phase 1 in different words; builds on it.
    {
      id: "orientation",
      label: "Orientation",
      questions: [
        {
          id: "self_emotional_need",
          type: "choice",
          text: "Vad behöver du mest av en bok just nu?",
          options: [
            {
              label: "Något att vara i — utan krav",
              value: "presence_no_demands",
            },
            {
              label: "Sällskap, att inte vara ensam med tankarna",
              value: "companionship",
            },
            {
              label: "Lite avstånd från mig själv och det jag går igenom",
              value: "distance_from_self",
            },
            {
              label: "Perspektiv — ett annat sätt att se",
              value: "perspective",
            },
            {
              label: "Något vackert. Det räcker.",
              value: "beauty",
            },
          ],
          signals: [
            "desire_for_self_or_world",
            "need_for_company_or_solitude",
            "emotional_direction",
            "desired_experience",
          ],
          rationale: `
            Previously: reading preference or genre-adjacent question.
            Now: a direct but open emotional need question.

            "Vad behöver du mest?" is more honest than "What do you want?"
            It gives the person permission to name something they might not
            have admitted needing. The options cover the major emotional
            orientations the recommendation engine supports:

            "Något att vara i" → low-demand presence; comfort / stillness
            "Sällskap" → companionship mode
            "Avstånd från mig själv" → desire for world over self; escape
            "Perspektiv" → perspective mode; openness to surprise
            "Något vackert" → wonder mode; literary / aesthetic reading

            The final option ("Något vackert. Det räcker.") is important.
            It does not require the person to explain why they want beauty.
            It trusts the answer.
          `,
        },
      ],
    },

    // ── Phase 3: Reading Readiness ────────────────────────────────────────────
    // One question. Practical but warm.
    // Reveals what kind of attention the person can bring.
    {
      id: "reading_readiness",
      label: "Reading Readiness",
      questions: [
        {
          id: "self_reading_energy",
          type: "choice",
          text: "Hur ser din läsning ut just nu?",
          options: [
            {
              label: "Korta stunder — det är vad jag har",
              value: "short_sessions",
            },
            {
              label: "Jag har tid, men orken varierar",
              value: "time_not_energy",
            },
            {
              label: "Jag kan ge en bok min fulla uppmärksamhet",
              value: "full_attention",
            },
            {
              label: "Jag är på väg tillbaka — det har gått ett tag",
              value: "returning",
            },
          ],
          signals: [
            "reading_relationship",
            "energy_level",
            "tolerance_for_difficulty",
            "reading_energy",
          ],
          rationale: `
            Previously: question about reading habits or frequency (survey-like).
            Now: a question about the quality of available attention.

            "Hur ser din läsning ut just nu?" is practical without being
            clinical. It does not ask how many books per year. It asks what
            kind of reading is actually possible right now.

            The options map to pacing and accessibility needs:
            "Korta stunder" → lightweight pacing, can be read in fragments
            "Tid men inte ork" → steady pacing, emotionally accessible entry
            "Full uppmärksamhet" → absorbing or demanding pacing acceptable
            "På väg tillbaka" → returning mode; gentle re-entry point needed

            The "returning" option is especially important — it unlocks a
            specific recommendation mode (Returning to Reading) that the
            interpretation layer can act on directly.
          `,
        },
      ],
    },

    // ── Phase 4: Desired Experience ───────────────────────────────────────────
    // One question. Image-based. Closes the conversation toward the book.
    // Translates everything shared into the reading experience dimension.
    {
      id: "desired_experience",
      label: "Desired Experience",
      questions: [
        {
          id: "self_desired_experience",
          type: "image",
          text: "Om den här boken vore ett rum — vilket skulle du vilja kliva in i?",
          options: [
            {
              label: "Ett litet, varmt rum. Stilla och tryggt.",
              value: "small_warm_room",
            },
            {
              label: "Ett stort fönster mot ett landskap du inte känner igen.",
              value: "wide_unfamiliar_landscape",
            },
            {
              label: "En bibliotekslässal. Koncentration och lugn.",
              value: "reading_room_clarity",
            },
            {
              label: "Någon annans hem. Nyfiken närvaro.",
              value: "another_persons_home",
            },
            {
              label: "Utsidan — rörelse och frisk luft.",
              value: "open_air_movement",
            },
          ],
          signals: [
            "desire_for_self_or_world",
            "need_for_company_or_solitude",
            "openness_to_surprise",
            "desired_experience",
            "emotional_direction",
          ],
          rationale: `
            Previously: direct preference question (potentially limiting).
            Now: an image question that translates need into reading experience.

            "Om den här boken vore ett rum" bypasses self-analysis entirely.
            The person responds intuitively — they do not need to know what
            kind of book they want in order to answer. The metaphor does the
            work of translation.

            The options map to book atmosphere and companionship qualities:
            "Litet, varmt rum" → still, comforting books; close company
            "Stort fönster mot okänt landskap" → perspective, wonder, world-books
            "Bibliotekslässal" → clarity, intellectual engagement, literary depth
            "Någon annans hem" → companionship, character-close narration
            "Utsidan" → forward movement, restless energy, new beginning

            This is the final question before the reveal. It should feel
            like the natural closing of a short conversation — not a pivot
            into new territory. The room metaphor is literary, which is
            appropriate as the last step before a book is placed.
          `,
        },
      ],
    },
  ],
};

// ─── Gift Path ────────────────────────────────────────────────────────────────
//
// Progression: Person → Life Situation → Giver's Hope → Reading Nature
//
// Total questions: 4 (matching self path for parity)
// The gift path must help someone describe another person
// without requiring precision they may not have.
// The giver's hope is the strongest signal and is explicitly sought.

export const giftFlow: QuestionFlow = {
  path: "gift",
  phases: [

    // ── Phase 1: The Person ───────────────────────────────────────────────────
    // Understanding who this person is — through feeling, not fact.
    {
      id: "person",
      label: "The Person",
      questions: [
        {
          id: "gift_person_nature",
          type: "choice",
          text: "Hur skulle du beskriva den du köper till?",
          subtext: "Välj det som känns närmast — det behöver inte vara exakt.",
          options: [
            {
              label: "Varm och nära — hon bär mycket för andra",
              value: "warm_carries_others",
            },
            {
              label: "Eftertänksam, föredrar djup framför bredd",
              value: "thoughtful_depth",
            },
            {
              label: "Nyfiken på världen — öppen och utåtriktad",
              value: "curious_outward",
            },
            {
              label: "Privat. Behöver tid för sig själv.",
              value: "private_needs_space",
            },
            {
              label: "Jag vet inte riktigt — vi är inte så nära",
              value: "uncertain_not_close",
            },
          ],
          signals: [
            "recipient_temperament",
            "recipient_social_orientation",
            "desire_for_self_or_world",
            "need_for_company_or_solitude",
          ],
          rationale: `
            Previously: relationship category (friend / family / colleague)
            or demographic framing.
            Now: a temperament question asked through emotional description.

            "Hur skulle du beskriva den du köper till?" is wider and more
            honest than "What is your relationship to this person?" The
            relationship category (friend, parent, colleague) adds almost
            no recommendation signal. The person's temperament adds
            considerable signal.

            The options are drawn from the feeling-language of the
            Voice System — they sound like how a friend would describe
            someone, not how a form would categorise them.

            The final option ("Jag vet inte riktigt") is essential.
            It must exist and must be non-stigmatised. Someone who selects
            it is still useful to the system — they will provide strong
            signal through Phase 3 (the giver's hope), which relies less
            on knowledge of the recipient.

            The Swedish "hon" in option 1 is illustrative; implementation
            should use gender-neutral construction or allow the giver to
            specify.
          `,
        },
      ],
    },

    // ── Phase 2: Life Situation ───────────────────────────────────────────────
    // Is something happening? Wide, optional, warm.
    {
      id: "life_situation",
      label: "Life Situation",
      questions: [
        {
          id: "gift_life_moment",
          type: "choice",
          text: "Är det något som händer i hennes liv just nu?",
          subtext: "Om du inte vet, eller om inget särskilt pågår — det är också ett svar.",
          options: [
            {
              label: "Hon går igenom något tungt",
              value: "going_through_difficulty",
            },
            {
              label: "Något nytt är på väg — förändring, möjlighet",
              value: "new_beginning",
            },
            {
              label: "Det är en stillsam period — kanske lite ensamhet",
              value: "quiet_lonely_period",
            },
            {
              label: "Hon behöver andrum — livet kräver mycket",
              value: "needs_respite",
            },
            {
              label: "Inget särskilt — det är ett vanligt läge",
              value: "ordinary_moment",
            },
          ],
          signals: [
            "recipient_life_moment_quality",
            "recipient_emotional_direction",
            "recipient_tolerance_for_difficulty",
            "recipient_energy_level",
          ],
          rationale: `
            Previously: reading taste question or genre preference for recipient.
            Now: an open life-situation question that invites context
            without requiring it.

            The subtext is critical: "Om du inte vet — det är också ett svar."
            This disarms the pressure to be precise. A giver who does not
            know the recipient well can still answer. "Inget särskilt" is
            a fully valid answer that the system can act on.

            The options cover the primary life-moment categories defined
            in the Recommendation Intelligence system:
            "Tungt" → grief / recovery / comfort modes
            "Något nytt" → new beginning mode
            "Stillsam / ensamhet" → companionship mode
            "Behöver andrum" → stillness / comfort modes
            "Vanligt läge" → wonder / perspective modes (no constraint)

            The question uses "hon" as placeholder; implementation note above applies.
          `,
        },
      ],
    },

    // ── Phase 3: Giver's Hope ─────────────────────────────────────────────────
    // The most important gift path question.
    // The giver's emotional intention is the strongest signal available.
    {
      id: "givers_hope",
      label: "Giver's Hope",
      questions: [
        {
          id: "gift_hope",
          type: "choice",
          text: "Vad hoppas du att boken ska göra för henne?",
          subtext: "Det här är ofta det bästa sättet att hitta rätt bok.",
          options: [
            {
              label: "Ge henne sällskap — att känna sig mindre ensam",
              value: "hope_companionship",
            },
            {
              label: "Ge lite lättnad — en paus från det som är tungt",
              value: "hope_relief",
            },
            {
              label: "Öppna upp något — ge perspektiv eller tankar",
              value: "hope_perspective",
            },
            {
              label: "Påminna henne om att läsning kan vara en glädje",
              value: "hope_joy_of_reading",
            },
            {
              label: "Ge henne något vackert. Ingenting mer.",
              value: "hope_beauty",
            },
          ],
          signals: [
            "desired_experience",
            "emotional_direction",
            "recipient_need_for_company_or_solitude",
            "giver_emotional_intention",
          ],
          rationale: `
            Previously: not explicitly asked — hope was inferred from other answers.
            Now: directly asked, with a warm framing that explains why.

            The subtext ("Det här är ofta det bästa sättet att hitta rätt bok")
            serves two functions: it explains the question's importance,
            and it reassures givers who don't know the recipient well that
            this question will carry the recommendation.

            The giver's hope is the strongest signal in the gift path.
            It reveals the emotional intention behind the gift — which is
            often more reliable than the giver's knowledge of the recipient.
            A giver who hopes the book will provide companionship is orienting
            toward a real emotional need, even if they can't articulate why.

            The options mirror the recommendation modes closely:
            "Sällskap" → companionship mode
            "Lättnad / paus" → comfort / recovery modes
            "Perspektiv / tankar" → perspective mode
            "Glädje av läsning" → returning-to-reading mode
            "Något vackert" → wonder / literary mode
          `,
        },
      ],
    },

    // ── Phase 4: Reading Nature ───────────────────────────────────────────────
    // Practical: what kind of reader is this person?
    // Determines pacing and accessibility of recommendation.
    {
      id: "reading_nature",
      label: "Reading Nature",
      questions: [
        {
          id: "gift_reading_relationship",
          type: "choice",
          text: "Hur är hennes relation till böcker och läsning?",
          options: [
            {
              label: "Hon läser regelbundet och mycket",
              value: "regular_reader",
            },
            {
              label: "Hon läser när livet lämnar plats",
              value: "occasional_reader",
            },
            {
              label: "Hon vill läsa mer — det har blivit en önskan",
              value: "aspiring_reader",
            },
            {
              label: "Jag är inte säker — vi pratar inte om böcker",
              value: "uncertain_reading_life",
            },
          ],
          signals: [
            "recipient_reading_relationship",
            "recipient_energy_level",
            "recipient_tolerance_for_difficulty",
            "reading_energy",
          ],
          rationale: `
            Previously: reading preference or genre questions.
            Now: a question about the recipient's relationship to reading,
            not their taste within it.

            "Hur är hennes relation till böcker?" does not ask what she reads.
            It asks whether reading is a regular part of her life or an
            aspiration. This is the information the recommendation engine
            needs: not genre preference (which the curator's judgment should
            override anyway) but reading energy and accessibility.

            "Hon läser regelbundet" → absorbing or demanding pacing acceptable
            "Läser när livet lämnar plats" → steady pacing, clear entry point
            "Vill läsa mer" → returning-to-reading mode; accessible, inviting
            "Inte säker" → conservative default; accessible, brief, inviting

            The "aspiring reader" option is important — it opens the
            returning-to-reading recommendation mode even for gift paths.
          `,
        },
      ],
    },
  ],
};

// ─── Answer Map ───────────────────────────────────────────────────────────────
//
// The following maps each answer value to the signals it produces.
// This replaces or extends the signal extraction in answerInterpretation.ts.
// The interpretation layer reads these signals and maps them to
// emotionProfiles and lifeMoments.

export type Signal =
  | "energy:low"
  | "energy:medium"
  | "energy:high"
  | "direction:toward"
  | "direction:sitting_with"
  | "direction:transitioning"
  | "self_or_world:self"
  | "self_or_world:world"
  | "company:needs_company"
  | "company:needs_space"
  | "difficulty:low"
  | "difficulty:medium"
  | "difficulty:high"
  | "surprise:open"
  | "surprise:constrained"
  | "returning:yes"
  | "life_moment:grief"
  | "life_moment:transition"
  | "life_moment:loneliness"
  | "life_moment:burnout"
  | "life_moment:ordinary";

export const answerSignalMap: Record<AnswerKey, Signal[]> = {

  // self_present_moment
  heavy:              ["energy:low",    "direction:sitting_with", "difficulty:low"],
  quiet_empty:        ["energy:low",    "direction:sitting_with", "company:needs_company", "difficulty:low"],
  restless:           ["energy:medium", "direction:sitting_with", "company:needs_space",   "difficulty:low"],
  okay_needs_space:   ["energy:medium", "direction:toward",       "company:needs_space",   "difficulty:medium"],
  transitioning:      ["energy:medium", "direction:transitioning","difficulty:medium",     "surprise:open"],

  // self_emotional_need
  presence_no_demands:  ["self_or_world:self",  "company:needs_company", "difficulty:low",    "energy:low"],
  companionship:        ["self_or_world:self",  "company:needs_company", "difficulty:medium"],
  distance_from_self:   ["self_or_world:world", "company:needs_space",   "surprise:open"],
  perspective:          ["self_or_world:world", "difficulty:medium",     "surprise:open"],
  beauty:               ["self_or_world:world", "difficulty:medium",     "surprise:open"],

  // self_reading_energy
  short_sessions:   ["energy:low",    "difficulty:low"],
  time_not_energy:  ["energy:medium", "difficulty:low"],
  full_attention:   ["energy:high",   "difficulty:high"],
  returning:        ["returning:yes", "energy:low", "difficulty:low"],

  // self_desired_experience
  small_warm_room:           ["self_or_world:self",  "company:needs_company", "difficulty:low",    "surprise:constrained"],
  wide_unfamiliar_landscape: ["self_or_world:world", "company:needs_space",   "difficulty:medium", "surprise:open"],
  reading_room_clarity:      ["self_or_world:self",  "company:needs_space",   "difficulty:high"],
  another_persons_home:      ["self_or_world:world", "company:needs_company", "difficulty:medium"],
  open_air_movement:         ["self_or_world:world", "direction:toward",      "surprise:open",     "energy:medium"],

  // gift_person_nature
  warm_carries_others:  ["company:needs_company", "difficulty:low"],
  thoughtful_depth:     ["difficulty:high",       "company:needs_space"],
  curious_outward:      ["self_or_world:world",   "surprise:open"],
  private_needs_space:  ["company:needs_space",   "difficulty:medium"],
  uncertain_not_close:  [], // resolution deferred to giver's hope

  // gift_life_moment
  going_through_difficulty: ["direction:sitting_with", "difficulty:low",    "life_moment:grief"],
  new_beginning:            ["direction:transitioning","difficulty:medium", "life_moment:transition"],
  quiet_lonely_period:      ["direction:sitting_with", "company:needs_company","life_moment:loneliness"],
  needs_respite:            ["energy:low",             "difficulty:low",    "life_moment:burnout"],
  ordinary_moment:          ["life_moment:ordinary",   "surprise:open"],

  // gift_hope
  hope_companionship:   ["company:needs_company", "self_or_world:self",  "difficulty:low"],
  hope_relief:          ["difficulty:low",         "energy:low",          "direction:sitting_with"],
  hope_perspective:     ["self_or_world:world",    "surprise:open",       "difficulty:medium"],
  hope_joy_of_reading:  ["returning:yes",           "difficulty:low",     "energy:low"],
  hope_beauty:          ["self_or_world:world",     "difficulty:medium",  "surprise:open"],

  // gift_reading_relationship
  regular_reader:          ["energy:high",   "difficulty:high"],
  occasional_reader:       ["energy:medium", "difficulty:medium"],
  aspiring_reader:         ["returning:yes", "energy:low", "difficulty:low"],
  uncertain_reading_life:  ["energy:low",    "difficulty:low"],
};

// ─── Flow Summary ─────────────────────────────────────────────────────────────
//
// SELF PATH — 4 questions
//
//   Q1  self_present_moment     image choice    Arrival
//       "Hur har den senaste tiden känt sig?"
//       Signals: energy, emotional direction, life moment quality
//
//   Q2  self_emotional_need     choice          Orientation
//       "Vad behöver du mest av en bok just nu?"
//       Signals: self/world, company/solitude, desired experience
//
//   Q3  self_reading_energy     choice          Reading Readiness
//       "Hur ser din läsning ut just nu?"
//       Signals: reading relationship, energy, returning status
//
//   Q4  self_desired_experience image choice    Desired Experience
//       "Om den här boken vore ett rum — vilket vill du kliva in i?"
//       Signals: self/world, company/solitude, openness to surprise
//
//
// GIFT PATH — 4 questions
//
//   Q1  gift_person_nature         choice          Person
//       "Hur skulle du beskriva den du köper till?"
//       Signals: recipient temperament, social orientation
//
//   Q2  gift_life_moment           choice          Life Situation
//       "Är det något som händer i hennes liv just nu?"
//       Signals: life moment quality, emotional direction
//
//   Q3  gift_hope                  choice          Giver's Hope
//       "Vad hoppas du att boken ska göra för henne?"
//       Signals: desired experience, emotional intention (strongest signal)
//
//   Q4  gift_reading_relationship  choice          Reading Nature
//       "Hur är hennes relation till böcker och läsning?"
//       Signals: reading relationship, pacing accessibility
//
//
// INTERACTION LENGTH VERIFICATION
//
//   Previous self flow:   ~4–5 questions
//   Refactored self flow: 4 questions          ✓ unchanged
//
//   Previous gift flow:   ~4–5 questions
//   Refactored gift flow: 4 questions          ✓ unchanged
//
//   All questions use option-based answers (no free text required).
//   Estimated completion time per path: 2–3 minutes.    ✓ unchanged
//
//
// SIGNAL COVERAGE VERIFICATION
//
//   energy_level              ✓  Q1 (self), Q3 (self), Q4 (gift)
//   emotional_direction       ✓  Q1 (self), Q2 (gift)
//   desire_for_self_or_world  ✓  Q2 (self), Q4 (self), Q3 (gift)
//   need_for_company          ✓  Q2 (self), Q4 (self), Q3 (gift)
//   tolerance_for_difficulty  ✓  Q1 (self), Q3 (self), Q4 (gift)
//   life_moment_quality       ✓  Q1 (self), Q2 (gift)
//   openness_to_surprise      ✓  Q4 (self), Q3 (gift)
//   returning_to_reading      ✓  Q3 (self), Q3/Q4 (gift)
//   reading_energy            ✓  Q3 (self), Q4 (gift)
//   giver_emotional_intention ✓  Q3 (gift)              [new, was inferred]
//
// All signals previously available are preserved.
// One new signal added: giver_emotional_intention (from gift_hope).
// This was previously inferred; now it is directly captured.
