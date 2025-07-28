import React, { useState } from "react";
import { useLogger } from "../hooks/useLogger";

export const LoggerPanel = () => {
  const { getLog, clearLog } = useLogger();
  const [expanded, setExpanded] = useState(false);
  const logs = getLog();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        background: "#1e1e1e",
        color: "#fff",
        maxWidth: expanded ? 400 : 200,
        height: expanded ? 300 : 40,
        overflow: "auto",
        zIndex: 9999,
        fontSize: "0.8rem",
        padding: "0.5rem",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer" }}>
          {expanded ? "Logger 🔽" : "Logger 🔼"}
        </strong>
        {expanded && (
          <button onClick={clearLog} style={{ fontSize: "0.7rem", marginLeft: "0.5rem" }}>
            Clear
          </button>
        )}
      </div>
      {expanded &&
        logs.map((log) => (
          <div key={log.id} style={{ margin: "0.25rem 0", borderBottom: "1px solid #333" }}>
            <div style={{ fontWeight: "bold" }}>{log.type}</div>
            <div style={{ color: "#aaa" }}>{new Date(log.timestamp).toLocaleTimeString()}</div>
            {log.payload && (
              <pre style={{ whiteSpace: "pre-wrap", color: "#ccc" }}>
                {JSON.stringify(log.payload, null, 2)}
              </pre>
            )}
          </div>
        ))}
    </div>
  );
};