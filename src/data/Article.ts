export interface Article {
  id: string;
  title: string;
  url: string;
  mustSay: string[]; // Checklist of disclosures
  callReasons: string[]; // Tags for keyword search
}

export const sampleArticles = [
  {
    id: "article-001",
    title: "Understanding PCP Changes",
    url: "https://healthsecure.org/articles/change-pcp",
    mustSay: [
      "The new PCP becomes effective within 24 hours",
      "Only one PCP change is allowed per month",
      "Emergency services do not require a PCP",
    ],
    callReasons: ["change PCP", "doctor switch", "primary care update"],
  },
];
