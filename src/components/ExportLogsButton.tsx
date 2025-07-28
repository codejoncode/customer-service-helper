import React from "react";
import { useLogger } from "../hooks/useLogger";

const ExportLogsButton = () => {
  const { getLog } = useLogger();

  const handleExport = () => {
    const logs = getLog();
    const blob = new Blob([JSON.stringify(logs, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    link.download = `call-session-log-${timestamp}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      style={{
        marginTop: "2rem",
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        backgroundColor: "#0078D4",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      📤 Export Session Logs
    </button>
  );
};

export default ExportLogsButton;