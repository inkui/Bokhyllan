import type { Book } from "@/data/library/books/bookTypes";

export const books: Book[] = [
  {
    id: "handelser-vid-vatten",
    title: "Händelser vid vatten",
    author: "Kerstin Ekman",
    coverImage: "/covers/handelser-vid-vatten.svg",
    shortDescription: "Mörk, klar och djupt mänsklig.",
    emotionalDescription:
      "Det här är en bok för när man vill att läsningen ska få ta plats på riktigt. Den rör sig långsamt genom landskap, minne och skuld, men bär hela tiden en märklig värme: som om någon tänder en lampa i ett rum man först trodde var tomt.",
    curatorConnection:
      "Händelser vid vatten har tyngd utan att bli sluten. Den tar sig tid med landskapet och det som dröjer kvar, och litar på att läsaren orkar stanna där.",
    voiceNote:
      "Den rör sig långsamt och vill ha din närvaro. Ge den några ostörda kvällar.",
    practicalNotes: [
      "ca 470 sidor",
      "långsam läsning",
      "stark platskänsla",
      "viss mörker",
    ],
    emotionalTone: ["still", "clear", "haunting"],
    readingState: ["needs_perspective", "ready_for_depth", "restless"],
    pacing: ["slow", "deep"],
    emotionalEffects: ["opens_perspective", "deepens_feeling"],
    readingEnergy: "medium",
    lengthCategory: "long",
    atmosphere: "dark",
    affiliateRequest: {
      retailer: "bokus",
      title: "Händelser vid vatten",
      author: "Kerstin Ekman",
    },
  },
  {
    id: "gilead",
    title: "Gilead",
    author: "Marilynne Robinson",
    coverImage: "/covers/gilead.svg",
    shortDescription: "Varsam, ljus och stilla stark.",
    emotionalDescription:
      "Det här är en bok för den som behöver något långsamt och bärande. Den rör sig som ett förtroligt brev genom tro, minne och kärlek, och låter de små sakerna få sin rätta tyngd utan att höja rösten.",
    curatorConnection:
      "Gilead har den sortens stillhet som inte känns tom. Den gör plats för de små sakerna och kräver inte att läsningen ska gå fort.",
    voiceNote:
      "Den skyndar inte. Läs några sidor åt gången, eller låt den ta en hel kväll.",
    practicalNotes: [
      "ca 280 sidor",
      "lågmäld",
      "varm efterklang",
      "passar långsam läsning",
    ],
    emotionalTone: ["still", "warm", "hopeful", "tender"],
    readingState: ["emotionally_tired", "wants_comfort", "searching_for_calm"],
    pacing: ["slow", "steady"],
    emotionalEffects: ["calms", "comforts", "restores_attention"],
    readingEnergy: "low",
    lengthCategory: "medium",
    atmosphere: "hopeful",
    affiliateRequest: {
      retailer: "generic",
      title: "Gilead",
      author: "Marilynne Robinson",
    },
  },
  {
    id: "gentleman-i-moskva",
    title: "En gentleman i Moskva",
    author: "Amor Towles",
    coverImage: "/covers/gentleman-i-moskva.svg",
    shortDescription: "Elegant, varm och ovanligt sällskaplig.",
    emotionalDescription:
      "Det här är en bok för när man vill kliva in i en värld som känns stor men ändå trygg. Den har rörelse, kvickhet och mänsklig värme, men låter aldrig charmen bli tom eller stressad.",
    curatorConnection:
      "En gentleman i Moskva är generös utan att bli påträngande. Den har värme, rörelse och gott om plats att stanna kvar i.",
    voiceNote:
      "Den är lång, men lätt att gå in i. Ge den gärna några sammanhängande kvällar.",
    practicalNotes: [
      "ca 460 sidor",
      "uppslukande",
      "varm ton",
      "tydlig berättarglädje",
    ],
    emotionalTone: ["warm", "immersive", "quietly_funny", "hopeful"],
    readingState: ["wants_immersion", "lonely", "restless"],
    pacing: ["absorbing", "steady"],
    emotionalEffects: ["keeps_company", "awakens_wonder"],
    readingEnergy: "medium",
    lengthCategory: "long",
    atmosphere: "warm",
    affiliateRequest: {
      retailer: "generic",
      title: "En gentleman i Moskva",
      author: "Amor Towles",
    },
  },
  {
    id: "sommarboken",
    title: "Sommarboken",
    author: "Tove Jansson",
    shortDescription: "Ljus, kantig och öm utan sentimentalitet.",
    emotionalDescription:
      "En liten bok som rymmer ovanligt mycket luft. Den passar när man vill ha värme, men inte tröst som förenklar; här finns närhet, egensinne och en stillsam respekt för både barn och vuxna.",
    curatorConnection:
      "Sommarboken är liten nog att inte ställa sig i vägen. Den har värme, luft och en kantighet som gör att den aldrig blir inställsam.",
    voiceNote:
      "Den klarar sig med korta stunder. Man kan lägga ner den och ta upp den igen.",
    practicalNotes: ["kort", "lågmäld", "natur och närhet", "mjuk efterklang"],
    emotionalTone: ["warm", "clear", "tender"],
    readingState: ["wants_comfort", "overstimulated", "searching_for_calm"],
    pacing: ["slow", "lightweight"],
    emotionalEffects: ["calms", "comforts", "restores_attention"],
    readingEnergy: "very_low",
    lengthCategory: "short",
    atmosphere: "warm",
    affiliateRequest: {
      retailer: "generic",
      title: "Sommarboken",
      author: "Tove Jansson",
    },
  },
  {
    id: "brant-barn",
    title: "Bränt barn",
    author: "Stig Dagerman",
    shortDescription: "Klar, sårig och skoningslöst mänsklig.",
    emotionalDescription:
      "Det här är en bok för den som vill möta något rakt, inte bli avledd. Den är mörk och precis, men också märkligt levande i sin blick på skuld, begär och de känslor man helst vill slippa se.",
    curatorConnection:
      "Bränt barn väjer inte för det svåra och försöker inte mildra det. Språket är rakt, nära och utan överflöd.",
    voiceNote:
      "Det är en koncentrerad bok. Läs den när du har lite ostörd uppmärksamhet.",
    practicalNotes: ["kort till medellång", "emotionellt intensiv", "klar prosa"],
    emotionalTone: ["clear", "melancholic", "haunting"],
    readingState: ["ready_for_depth", "grieving", "needs_perspective"],
    pacing: ["deep", "demanding"],
    emotionalEffects: ["clarifies", "deepens_feeling"],
    readingEnergy: "medium",
    lengthCategory: "medium",
    atmosphere: "dark",
    affiliateRequest: {
      retailer: "generic",
      title: "Bränt barn",
      author: "Stig Dagerman",
    },
  },
  {
    id: "outline",
    title: "Outline",
    author: "Rachel Cusk",
    shortDescription: "Skarp, stilla och ovanligt lyhörd.",
    emotionalDescription:
      "En bok för den som vill ha klarhet utan att bli styrd. Den lyssnar mer än den förklarar, och låter människors berättelser lägga sig bredvid varandra tills något större långsamt framträder.",
    curatorConnection:
      "Outline håller sig lite på avstånd och låter samtalen göra arbetet. Den ger tanken utrymme utan att tala om var den ska landa.",
    voiceNote:
      "Den är stilla och samtalande. Läs den gärna när du vill ha rum att tänka.",
    practicalNotes: ["ca 250 sidor", "samtalande", "klartänkt", "lågmäld"],
    emotionalTone: ["clear", "still"],
    readingState: ["wants_intellectual_clarity", "needs_perspective"],
    pacing: ["steady", "deep"],
    emotionalEffects: ["clarifies", "opens_perspective"],
    readingEnergy: "medium",
    lengthCategory: "medium",
    atmosphere: "clear",
    affiliateRequest: {
      retailer: "generic",
      title: "Outline",
      author: "Rachel Cusk",
    },
  },
  {
    id: "aterstoden-av-dagen",
    title: "Återstoden av dagen",
    author: "Kazuo Ishiguro",
    shortDescription: "Återhållen, sorgsen och vackert klar.",
    emotionalDescription:
      "Det här är en bok för någon som uppskattar det outsagda. Den rör sig varsamt genom minne, plikt och förlorade möjligheter, och blir stark just för att den aldrig ber om stora gester.",
    curatorConnection:
      "Återstoden av dagen arbetar med det outsagda. Den är behärskad och exakt, och låter det viktiga bli synligt i sin egen takt.",
    voiceNote:
      "Den vill läsas långsamt. Låt det som inte sägs få ta plats.",
    practicalNotes: ["ca 270 sidor", "stilla sorg", "elegant prosa"],
    emotionalTone: ["melancholic", "clear", "tender"],
    readingState: ["needs_perspective", "grieving", "ready_for_depth"],
    pacing: ["slow", "steady"],
    emotionalEffects: ["deepens_feeling", "opens_perspective"],
    readingEnergy: "low",
    lengthCategory: "medium",
    atmosphere: "melancholic",
    affiliateRequest: {
      retailer: "generic",
      title: "Återstoden av dagen",
      author: "Kazuo Ishiguro",
    },
  },
  {
    id: "stoner",
    title: "Stoner",
    author: "John Williams",
    shortDescription: "Stillsam, rak och överraskande gripande.",
    emotionalDescription:
      "En bok för den som vill läsa om ett vanligt liv utan att det görs mindre. Den är lågmäld och klar, med en tro på att värdighet kan finnas i det som nästan ingen annan ser.",
    curatorConnection:
      "Stoner ser det till synes vanliga utan att göra det mindre. Den är rak, stillsam och märkligt trogen det som annars lätt förbises.",
    voiceNote:
      "Den rör sig lugnt och vinner på att få tid. En bra bok för stilla kvällar.",
    practicalNotes: ["ca 300 sidor", "lågmäld", "djup efterklang"],
    emotionalTone: ["still", "melancholic", "tender"],
    readingState: ["emotionally_tired", "needs_perspective", "lonely"],
    pacing: ["slow", "steady"],
    emotionalEffects: ["keeps_company", "deepens_feeling"],
    readingEnergy: "low",
    lengthCategory: "medium",
    atmosphere: "still",
    affiliateRequest: {
      retailer: "generic",
      title: "Stoner",
      author: "John Williams",
    },
  },
  {
    id: "dora-bruder",
    title: "Dora Bruder",
    author: "Patrick Modiano",
    shortDescription: "Sökande, dunkel och varsamt sorgsen.",
    emotionalDescription:
      "Det här är en bok för när frånvaro känns viktigare än svar. Den söker efter spår utan att äga dem, och låter minnet vara både ömtåligt och nödvändigt.",
    curatorConnection:
      "Dora Bruder söker efter spår utan att fylla i det som saknas. Den lämnar utrymme för frånvaron och gör det med stor försiktighet.",
    voiceNote:
      "Det är en kort och mycket stilla bok. Läs den utan brådska.",
    practicalNotes: ["kort", "sökande", "melankolisk", "historisk tyngd"],
    emotionalTone: ["melancholic", "haunting", "still"],
    readingState: ["grieving", "ready_for_depth", "needs_perspective"],
    pacing: ["slow", "deep"],
    emotionalEffects: ["makes_room_for_grief", "opens_perspective"],
    readingEnergy: "medium",
    lengthCategory: "short",
    atmosphere: "melancholic",
    affiliateRequest: {
      retailer: "generic",
      title: "Dora Bruder",
      author: "Patrick Modiano",
    },
  },
  {
    id: "den-allvarsamma-leken",
    title: "Den allvarsamma leken",
    author: "Hjalmar Söderberg",
    shortDescription: "Klar, vemodig och elegant mänsklig.",
    emotionalDescription:
      "En bok för den som vill läsa något svenskt, tidlöst och emotionellt exakt. Den ser på längtan och självbedrägeri utan att moralisera, och gör det med en prosa som fortfarande känns levande.",
    curatorConnection:
      "Den allvarsamma leken ser klart på längtan utan att moralisera. Den har en lätthet i språket som lämnar gott om plats för eftertanken.",
    voiceNote:
      "Den är lätt att gå in i och svår att hasta förbi. Läs den i lugn takt.",
    practicalNotes: ["kort till medellång", "klassisk", "vemodig klarhet"],
    emotionalTone: ["clear", "melancholic", "tender"],
    readingState: ["needs_perspective", "wants_intellectual_clarity"],
    pacing: ["steady", "deep"],
    emotionalEffects: ["clarifies", "deepens_feeling"],
    readingEnergy: "medium",
    lengthCategory: "medium",
    atmosphere: "clear",
    affiliateRequest: {
      retailer: "generic",
      title: "Den allvarsamma leken",
      author: "Hjalmar Söderberg",
    },
  },
  {
    id: "det-vilda-torget",
    title: "Det vilda torget",
    author: "Tomas Tranströmer",
    shortDescription: "Klar, stilla och vidöppen.",
    emotionalDescription:
      "En tunn bok för när man inte orkar bära en hel roman men ändå vill läsa något som öppnar rummet. Dikterna är precisa utan att stänga, och kan ge en märklig känsla av syre.",
    curatorConnection:
      "Det vilda torget är tunn nog att bära med sig och öppen nog att återvända till. Dikterna ger rymd utan att kräva långa stunder.",
    voiceNote:
      "Läs en dikt i taget. Den behöver inte tas från början till slut.",
    practicalNotes: ["poesi", "kort", "kan läsas långsamt", "mycket rymd"],
    emotionalTone: ["clear", "still", "hopeful"],
    readingState: ["overstimulated", "searching_for_calm", "emotionally_tired"],
    pacing: ["slow", "lightweight"],
    emotionalEffects: ["restores_attention", "awakens_wonder", "calms"],
    readingEnergy: "very_low",
    lengthCategory: "short",
    atmosphere: "clear",
    affiliateRequest: {
      retailer: "generic",
      title: "Det vilda torget",
      author: "Tomas Tranströmer",
    },
  },
  {
    id: "samuel-bok",
    title: "Samuels bok",
    author: "Sven Delblanc",
    shortDescription: "Mustig, mörk och mänskligt rik.",
    emotionalDescription:
      "Det här är en bok för den som vill ha en större berättelse med tyngd, värme och jord under naglarna. Den är inte lätt, men den har en levande kraft som gör att världen känns befolkad på riktigt.",
    curatorConnection:
      "Samuels bok har tyngd och rörelse på samma gång. Den är rik på människor och miljöer, men håller ihop sin egen rytm.",
    voiceNote:
      "Det är en bok att ge sammanhängande tid. Låt den breda ut sig över flera kvällar.",
    practicalNotes: ["lång", "svensk berättarkraft", "mörk värme"],
    emotionalTone: ["immersive", "warm", "haunting"],
    readingState: ["wants_immersion", "ready_for_depth"],
    pacing: ["absorbing", "deep"],
    emotionalEffects: ["awakens_wonder", "deepens_feeling"],
    readingEnergy: "high",
    lengthCategory: "long",
    atmosphere: "immersive",
    affiliateRequest: {
      retailer: "generic",
      title: "Samuels bok",
      author: "Sven Delblanc",
    },
  },
];

export function getBookById(id: string) {
  return books.find((book) => book.id === id) ?? books[0];
}
