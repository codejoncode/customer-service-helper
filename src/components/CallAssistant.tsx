import React, { useEffect, useState } from "react";
import { useCallSession } from "../hooks/CallSessionState";
import { mockOrganization } from "../data/mockOrganization";
import { ReasonSelector } from "./ReasonSelector";
import { ArticleChecklist } from "./ArticleChecklist";
import { ActionChecklist } from "./ActionChecklist";
import { ClosingChecklist } from "./ClosingChecklist";
import { CallSummary } from "./CallSummary";
import { useLogger } from "../hooks/useLogger";
import ExportLogsButton from "./ExportLogsButton";
import { DevToolsPanel } from "./DevToolsPanel";

const { logEvent } = useLogger();

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
    setClosingChecks,
  } = useCallSession();

  const selectedReason = mockOrganization.reasonsForCall.find(
    (r) => r.id === reason
  );
  const handleSetArticle = (articleId: string) => {
    setArticle(articleId);
    logEvent("set-article", { articleId });
  };

  const handleToggleMustSay = (phrase: string) => {
    handleToggleMustSay(phrase);
    logEvent("toggle-must-say", { phrase });
  };

  const handleToggleAction = (action: string) => {
    logEvent("toggled-action", { action });
    toggleAction(action);
  };

  const handleToggleClosingCheck = (id: string) => {
    toggleClosingCheck(id);
    logEvent("toggled-closing-check", { checklistItemId: id });
  };

  const article = mockOrganization.articles.find((a) => a.id === articleId);

  const clearCallFlowState = () => {
    setMustSayChecked([]);
    setActions([]);
    setClosingChecks({});
  };

  const handleReasonSelect = (reasonId: string) => {
    logEvent("selected-reason", { reasonId });
    setReason(reasonId);
    clearCallFlowState();

    const firstArticle = mockOrganization.reasonsForCall.find(
      (r) => r.id === reasonId
    )?.relatedArticles[0];

    if (firstArticle) {
      logEvent("loaded-article", { articleId: firstArticle });
      handleSetArticle(firstArticle);
    }
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
const [hasLoggedSummary, setHasLoggedSummary] = useState(false);
// Whenever summar is finalized: 
useEffect(() => {
  if (canGenerateSummary && formattedSummary && !hasLoggedSummary) {
    logEvent("summary-generated", {summary: formattedSummary });
    setHasLoggedSummary(true);
  }
}, [canGenerateSummary, formattedSummary]);

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
          onToggle={handleToggleMustSay}
        />
      )}

      {/* Action Tracker */}
      <ActionChecklist
        available={mockOrganization.actions}
        selected={actions}
        onToggle={handleToggleAction}
      />

      {/* Closing Checklist */}
      <ClosingChecklist
        items={mockOrganization.endCallFlow}
        checked={closingChecks}
        onToggle={handleToggleClosingCheck}
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

      {/*Should only be seen by certain individauls not all*/}

      {process.env.NODE_ENV === "development" && canGenerateSummary && <DevToolsPanel />}
    </div>
  );
};
