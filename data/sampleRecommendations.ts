import type {
  AffiliateLinkRequest,
  AffiliateLinkResult,
} from "@/lib/affiliate/affiliateTypes";

export type Recommendation = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  emotionalDescriptor: string;
  explanation: string;
  voiceNote?: string;
  practicalNotes?: string[];
  affiliateRequest?: AffiliateLinkRequest;
  affiliateLink?: AffiliateLinkResult;
};

export const sampleRecommendation: Recommendation = {
  id: "handelser-vid-vatten",
  title: "Händelser vid vatten",
  author: "Kerstin Ekman",
  coverImage: "/covers/handelser-vid-vatten.svg",
  emotionalDescriptor: "Mörk, klar och djupt mänsklig.",
  explanation:
    "Det här är en bok för när man vill att läsningen ska få ta plats på riktigt. Den rör sig långsamt genom landskap, minne och skuld, men bär hela tiden en märklig värme: som om någon tänder en lampa i ett rum man först trodde var tomt.",
  voiceNote:
    "Rösten är tät och stillsam, med ett förtroende för läsaren. Den förklarar inte för mycket, men lämnar aldrig känslan utan sällskap.",
  practicalNotes: [
    "ca 470 sidor",
    "långsam läsning",
    "stark platskänsla",
    "viss mörker",
  ],
  affiliateRequest: {
    retailer: "bokus",
    title: "Händelser vid vatten",
    author: "Kerstin Ekman",
  },
};

export const sampleRecommendations: Record<string, Recommendation> = {
  "handelser-vid-vatten": sampleRecommendation,
  gilead: {
    id: "gilead",
    title: "Gilead",
    author: "Marilynne Robinson",
    coverImage: "/covers/gilead.svg",
    emotionalDescriptor: "Varsam, ljus och stilla stark.",
    explanation:
      "Det här är en bok för den som behöver något långsamt och bärande. Den rör sig som ett förtroligt brev genom tro, minne och kärlek, och låter de små sakerna få sin rätta tyngd utan att höja rösten.",
    voiceNote:
      "Rösten är mild men aldrig tunn. Den har en sällsynt förmåga att göra vardagen större utan att göra den högtidlig.",
    practicalNotes: [
      "ca 280 sidor",
      "lågmäld",
      "varm efterklang",
      "passar långsam läsning",
    ],
    affiliateRequest: {
      retailer: "generic",
      title: "Gilead",
      author: "Marilynne Robinson",
    },
  },
  "gentleman-i-moskva": {
    id: "gentleman-i-moskva",
    title: "En gentleman i Moskva",
    author: "Amor Towles",
    coverImage: "/covers/gentleman-i-moskva.svg",
    emotionalDescriptor: "Elegant, varm och ovanligt sällskaplig.",
    explanation:
      "Det här är en bok för när man vill kliva in i en värld som känns stor men ändå trygg. Den har rörelse, kvickhet och mänsklig värme, men låter aldrig charmen bli tom eller stressad.",
    voiceNote:
      "Rösten är generös och behärskad, med ett lugnt förtroende för att goda samtal, måltider och små ritualer kan bära ett helt liv.",
    practicalNotes: [
      "ca 460 sidor",
      "uppslukande",
      "varm ton",
      "tydlig berättarglädje",
    ],
    affiliateRequest: {
      retailer: "generic",
      title: "En gentleman i Moskva",
      author: "Amor Towles",
    },
  },
};

export function getRecommendationById(id: string) {
  return sampleRecommendations[id] ?? sampleRecommendation;
}
