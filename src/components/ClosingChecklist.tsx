import React from "react";
import { ClosingChecklistItem } from "../data/types";

interface Props {
  items: ClosingChecklistItem[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export const ClosingChecklist = ({ items, checked, onToggle }: Props) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>📋 Call Closing Checklist:</h4>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={checked[item.id] ?? false}
                onChange={() => onToggle(item.id)}
              />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};