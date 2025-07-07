import React from "react";
import { Article } from "../data/types";

interface Props {
  article: Article | null;
  checked: string[];
  onToggle: (phrase: string) => void;
}

export const ArticleChecklist = ({ article, checked, onToggle }: Props) => {
  if (!article) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>📝 Article: {article.title}</h4>
      <a href={article.url} target="_blank" rel="noreferrer">
        View Full Article
      </a>
      <ul style={{ marginTop: "0.5rem" }}>
        {article.mustSay.map((item) => (
          <li key={item}>
            <label>
              <input
                type="checkbox"
                checked={checked.includes(item)}
                onChange={() => onToggle(item)}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};