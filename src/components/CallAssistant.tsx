import React from "react";
import { useCallSession } from "../hooks/CallSessionState";
import { mockOrganization } from "../data/mockOrganization";
import { ReasonSelector } from "./ReasonSelector";
import { ArticleChecklist } from "./ArticleChecklist";
import { ActionChecklist } from "./ActionChecklist";
import { ClosingChecklist } from "./ClosingChecklist";
import { CallSummary } from "./CallSummary";

export const CallAssistant = () => {
  const {
    reason,
    setReason,
    articleId,
    setArticle,
    mustSayChecked,
    toggleMustSay,
    actions,
    toggleAction,
    closingChecks,
    toggleClosingCheck,
    setMustSayChecked,
    setActions,
    setClosingChecks
  } = useCallSession();

  const selectedReason = mockOrganization.reasonsForCall.find(
    (r) => r.id === reason
  );
  const article = mockOrganization.articles.find((a) => a.id === articleId);

  const clearCallFlowState = () => {
    setMustSayChecked([]);
    setActions([]);
    setClosingChecks({});
  };

  const handleReasonSelect = (reasonId: string) => {
  setReason(reasonId);
  clearCallFlowState();

  const firstArticle = mockOrganization.reasonsForCall
    .find((r) => r.id === reasonId)
    ?.relatedArticles[0];

  if (firstArticle) setArticle(firstArticle);
};

  const allMustSaid = article?.mustSay.every((line) =>
    mustSayChecked.includes(line)
  );
  const allClosingComplete = mockOrganization.endCallFlow.every(
    (item) => closingChecks[item.id]
  );

  const canGenerateSummary =
    reason && article && allMustSaid && allClosingComplete;

  const formattedSummary = `
Agent handled a call regarding "${selectedReason?.label}" using the article "${article?.title}".

Disclosures provided:
${article?.mustSay.map((line) => `- ${line}`).join("\n")}

Actions taken:
${actions.map((a) => `- ${a}`).join("\n")}

Call closed according to HealthSecure's standards.
`;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📞 Call Assistant</h2>
      <ReasonSelector
        reasons={mockOrganization.reasonsForCall}
        selectedId={reason}
        onSelect={handleReasonSelect}
      />

      {/* Article Checklist */}
      {article && (
        <ArticleChecklist
          article={article}
          checked={mustSayChecked}
          onToggle={toggleMustSay}
        />
      )}

      {/* Action Tracker */}
      <ActionChecklist
        available={mockOrganization.actions}
        selected={actions}
        onToggle={toggleAction}
      />

      {/* Closing Checklist */}
      <ClosingChecklist
        items={mockOrganization.endCallFlow}
        checked={closingChecks}
        onToggle={toggleClosingCheck}
      />

      {/* Call Summary */}
      {canGenerateSummary && (
        <CallSummary
          reason={selectedReason}
          article={article}
          mustSay={mustSayChecked}
          actions={actions}
          show={canGenerateSummary}
        />
      )}
    </div>
  );
};
