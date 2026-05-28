export type FlowKind = "gift" | "self";

export type AnswerOption = {
  id: string;
  label: string;
};

export type Question = {
  id: string;
  prompt: string;
  answers: AnswerOption[];
};

export type FlowAnswers = Record<string, string>;

export const giftQuestions: Question[] = [
  {
    id: "person",
    prompt: "Hur skulle du beskriva personen just nu?",
    answers: [
      { id: "eftertanksam", label: "eftertänksam" },
      { id: "rastlos", label: "rastlös" },
      { id: "behover-vila", label: "behöver vila" },
      { id: "svar-att-na", label: "svår att nå" },
      { id: "varm", label: "varm" },
      { id: "soker-nytt", label: "söker något nytt" },
    ],
  },
  {
    id: "gift",
    prompt: "Vad hoppas du att boken ska ge?",
    answers: [
      { id: "lugn", label: "lugn" },
      { id: "sallskap", label: "sällskap" },
      { id: "perspektiv", label: "perspektiv" },
      { id: "energi", label: "energi" },
      { id: "trost", label: "tröst" },
      { id: "narvaro", label: "närvaro" },
    ],
  },
  {
    id: "tone",
    prompt: "Vilken sorts närvaro passar bäst?",
    answers: [
      { id: "lagmald", label: "lågmäld" },
      { id: "varm", label: "varm" },
      { id: "klar", label: "klar" },
      { id: "djup", label: "djup" },
    ],
  },
];

export const selfQuestions: Question[] = [
  {
    id: "longing",
    prompt: "Vad längtar du efter att läsa just nu?",
    answers: [
      { id: "stillsamt", label: "något stillsamt" },
      { id: "varmt", label: "något varmt" },
      { id: "uppslukande", label: "något uppslukande" },
      { id: "klartankt", label: "något klartänkt" },
      { id: "stannar-kvar", label: "något som stannar kvar" },
    ],
  },
  {
    id: "energy",
    prompt: "Hur mycket läsork har du?",
    answers: [
      { id: "valdigt-lite", label: "väldigt lite" },
      { id: "lite-nyfiken", label: "lite men nyfiken" },
      { id: "ganska-mycket", label: "ganska mycket" },
      { id: "nagot-stort", label: "ge mig något stort" },
    ],
  },
  {
    id: "pace",
    prompt: "Vilken takt vill du få följa?",
    answers: [
      { id: "langsam", label: "långsam" },
      { id: "mjuk", label: "mjuk" },
      { id: "drivande", label: "drivande" },
      { id: "efterklang", label: "med efterklang" },
    ],
  },
];

export function getQuestionsForFlow(flow: FlowKind) {
  return flow === "gift" ? giftQuestions : selfQuestions;
}
