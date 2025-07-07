export interface ClosingChecklistItem {
  id: string;
  label: string;
  required: boolean;
}

export const sampleEndCallFlow: ClosingChecklistItem[] = [
  { id: "issue-resolved", label: "Was the issue resolved?", required: true },
  { id: "additional-questions", label: "Did you ask if they have other questions?", required: true },
  { id: "closing-thanks", label: "Did you thank the caller for contacting HealthSecure?", required: true },
];