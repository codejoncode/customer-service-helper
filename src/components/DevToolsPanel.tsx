import React from "react";
import { LoggerPanel } from "./LoggerPanel";
import ExportLogsButton from "./ExportLogsButton";

export const DevToolsPanel = () => {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 10000,
        background: "#fff",
        border: "1px solid #ccc",
        padding: "1rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        borderRadius: "8px 0 0 0",
      }}
    >
      <h4 style={{ marginBottom: "0.5rem" }}>🛠️ Dev Tools</h4>
      <LoggerPanel />
      <ExportLogsButton />
    </div>
  );
};