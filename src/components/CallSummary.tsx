import React, { useState } from "react";
import { CallReason, Article } from "../data/types";

interface Props {
  reason?: CallReason;
  article?: Article;
  mustSay: string[];
  actions: string[];
  show: boolean;
}

export const CallSummary = ({
  reason,
  article,
  mustSay,
  actions,
  show,
}: Props) => {
  if (!show || !reason || !article) return null;

  const formatted = `
Agent handled a call regarding "${reason.label}" using the article "${article.title}".

Disclosures provided:
${article.mustSay.map((line) => `- ${line}`).join("\n")}

Actions taken:
${actions.map((a) => `- ${a}`).join("\n")}

Call closed according to HealthSecure's standards.
  `.trim();
  const [customNotes, setCustomNotes] = useState("");
  const copyToClipboard = async () => {
    const fullSummary = `
Agent handled a call regarding "${reason?.label}" using the article "${article?.title}".

Disclosures provided:
${mustSay.map((line) => `- ${line}`).join("\n")}

Actions taken:
${actions.map((a) => `- ${a}`).join("\n")}

Call closed according to HealthSecure's standards.

Additional Notes:
${customNotes.trim() || "(None provided)"}
  `.trim();

    try {
      await navigator.clipboard.writeText(fullSummary);
      alert("✅ Summary copied to clipboard");
    } catch {
      alert("❌ Failed to copy. Try again.");
    }
  };
  const disabled = !reason || !article;

  return (
    <div
      style={{
        marginTop: "2rem",
        borderTop: "1px solid #ccc",
        paddingTop: "1rem",
      }}
    >
      <h4>📎 Call Summary</h4>
      {reason && (
        <section>
          <strong>Topic:</strong> {reason.label}
        </section>
      )}
      {article && (
        <section>
          <strong>Article Used:</strong> {article.title}
        </section>
      )}
      {mustSay.length > 0 && (
        <section>
          <strong>Disclosures Provided:</strong>
          <ul>
            {mustSay.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>
      )}
      {actions.length > 0 && (
        <section>
          <strong>Actions Taken:</strong>
          <ul>
            {actions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}
      <section>
        <strong>Additional Notes:</strong>
        <textarea
          value={customNotes}
          onChange={(e) => setCustomNotes(e.target.value)}
          placeholder="Add call-specific notes here..."
          rows={4}
          style={{
            width: "100%",
            marginTop: "0.5rem",
            padding: "0.5rem",
            fontSize: "0.9rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            resize: "vertical",
          }}
        />
      </section>
      <button
        disabled={disabled}
        onClick={copyToClipboard}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "0.9rem",
          backgroundColor: "#0078D4",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        📋 Copy Summary & Notes
      </button>
    </div>
  );
};
