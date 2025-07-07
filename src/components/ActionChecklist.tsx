import React from "react";

interface Props {
  available: string[];
  selected: string[];
  onToggle: (action: string) => void;
}

export const ActionChecklist = ({ available, selected, onToggle }: Props) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>✅ Actions Taken:</h4>
      <ul>
        {available.map((action) => (
          <li key={action}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(action)}
                onChange={() => onToggle(action)}
              />
              {action}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};