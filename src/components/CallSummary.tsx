import React from "react";
import { CallReason, Article } from "../data/types";

interface Props {
  reason?: CallReason;
  article?: Article;
  mustSay: string[];
  actions: string[];
  show: boolean;
}

export const CallSummary = ({ reason, article, mustSay, actions, show }: Props) => {
  if (!show || !reason || !article) return null;

  const formatted = `
Agent handled a call regarding "${reason.label}" using the article "${article.title}".

Disclosures provided:
${article.mustSay.map((line) => `- ${line}`).join("\n")}

Actions taken:
${actions.map((a) => `- ${a}`).join("\n")}

Call closed according to HealthSecure's standards.
  `.trim();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      alert("✅ Summary copied to clipboard");
    } catch {
      alert("❌ Failed to copy. Try again.");
    }
  };

  return (
    <div style={{ marginTop: "2rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
      <h4>📎 Call Summary</h4>
      <pre style={{ background: "#f8f8f8", padding: "1rem", whiteSpace: "pre-wrap" }}>
        {formatted}
      </pre>
      <button onClick={copyToClipboard}>Copy Summary</button>
    </div>
  );
};