export type FlowKind = "gift" | "self";

export type AnswerOption = {
  id: string;
  label: string;
};

export type Question = {
  id: string;
  prompt: string;
  subtext?: string;
  answers: AnswerOption[];
};

export type FlowAnswers = Record<string, string>;

export const selfQuestions: Question[] = [
  {
    id: "self_present_moment",
    prompt: "Hur har den senaste tiden känts?",
    subtext: "Välj det som känns närmast.",
    answers: [
      { id: "heavy", label: "Tung och krävande" },
      { id: "quiet_empty", label: "Stillsam, lite tom" },
      { id: "restless", label: "Rörig, svår att landa i" },
      { id: "okay_needs_space", label: "Ganska okej, men jag behöver andrum" },
      { id: "transitioning", label: "Ny eller förändrad, på gott och ont" },
    ],
  },
  {
    id: "self_emotional_need",
    prompt: "Vad behöver du mest av en bok just nu?",
    answers: [
      { id: "presence_no_demands", label: "Något att vara i, utan krav" },
      { id: "companionship", label: "Sällskap, att inte vara ensam med tankarna" },
      { id: "distance_from_self", label: "Lite avstånd från mig själv" },
      { id: "perspective", label: "Perspektiv, ett annat sätt att se" },
      { id: "beauty", label: "Något vackert. Det räcker." },
    ],
  },
  {
    id: "self_reading_energy",
    prompt: "Hur ser din läsning ut just nu?",
    answers: [
      { id: "short_sessions", label: "Korta stunder, det är vad jag har" },
      { id: "time_not_energy", label: "Jag har tid, men orken varierar" },
      { id: "full_attention", label: "Jag kan ge en bok min fulla uppmärksamhet" },
      { id: "returning", label: "Jag är på väg tillbaka. Det har gått ett tag." },
    ],
  },
  {
    id: "self_desired_experience",
    prompt: "Om den här boken vore ett rum, vilket skulle du vilja kliva in i?",
    answers: [
      { id: "small_warm_room", label: "Ett litet, varmt rum. Stilla och tryggt." },
      {
        id: "wide_unfamiliar_landscape",
        label: "Ett stort fönster mot ett landskap du inte känner igen.",
      },
      { id: "reading_room_clarity", label: "En bibliotekslässal. Koncentration och lugn." },
      { id: "another_persons_home", label: "Någon annans hem. Nyfiken närvaro." },
      { id: "open_air_movement", label: "Utsidan, rörelse och frisk luft." },
    ],
  },
];

export const giftQuestions: Question[] = [
  {
    id: "gift_person_nature",
    prompt: "Hur skulle du beskriva den du köper till?",
    subtext: "Välj det som känns närmast. Det behöver inte vara exakt.",
    answers: [
      { id: "warm_carries_others", label: "Varm och nära, bryr sig mycket om andra" },
      { id: "thoughtful_depth", label: "Tycker om att stanna upp och fundera" },
      { id: "curious_outward", label: "Nyfiken på världen och människor" },
      { id: "private_needs_space", label: "Trivs bäst med sitt eget sällskap ibland" },
      { id: "uncertain_not_close", label: "Jag vet inte riktigt. Vi är inte så nära." },
    ],
  },
  {
    id: "gift_life_moment",
    prompt: "Är det något som händer i personens liv just nu?",
    subtext: "Om du inte vet, eller om inget särskilt pågår, är det också ett svar.",
    answers: [
      { id: "going_through_difficulty", label: "Något tungt pågår" },
      { id: "new_beginning", label: "Något nytt är på väg, förändring eller möjlighet" },
      { id: "quiet_lonely_period", label: "En lugnare period just nu" },
      { id: "needs_respite", label: "Behöver andrum, livet kräver mycket" },
      { id: "ordinary_moment", label: "Inget särskilt. Ett vanligt läge." },
      { id: "uncertain_life_moment", label: "Jag vet inte riktigt" },
    ],
  },
  {
    id: "gift_hope",
    prompt: "Vad hoppas du att boken ska göra?",
    subtext: "Det här är ofta det bästa sättet att hitta rätt bok.",
    answers: [
      { id: "hope_companionship", label: "Ge sällskap, att känna sig mindre ensam" },
      { id: "hope_relief", label: "Ge lite lättnad, en paus från vardagen" },
      { id: "hope_perspective", label: "Öppna upp något, ge nya tankar eller perspektiv" },
      { id: "hope_joy_of_reading", label: "Påminna om att läsning kan vara en glädje" },
      { id: "hope_beauty", label: "Ge något vackert. Ingenting mer." },
    ],
  },
  {
    id: "gift_reading_relationship",
    prompt: "Hur är personens relation till böcker och läsning?",
    answers: [
      { id: "regular_reader", label: "Läser regelbundet och mycket" },
      { id: "occasional_reader", label: "Läser när livet lämnar plats" },
      { id: "aspiring_reader", label: "Vill läsa mer. Det har blivit en önskan." },
      { id: "uncertain_reading_life", label: "Jag vet inte riktigt vad personen brukar läsa." },
    ],
  },
];

export function getQuestionsForFlow(flow: FlowKind) {
  return flow === "gift" ? giftQuestions : selfQuestions;
}
