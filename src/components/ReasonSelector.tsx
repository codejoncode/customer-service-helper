import React from "react";
import { CallReason } from "../data/types";

interface Props {
  reasons: CallReason[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export const ReasonSelector = ({ reasons, selectedId, onSelect }: Props) => {
  return (
    <div>
      <label>
        1️⃣ Reason for Call:
        <select value={selectedId ?? ""} onChange={(e) => onSelect(e.target.value)}>
          <option value="">-- Select Reason --</option>
          {reasons.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};