import ThumbsDownIcon from "../../assets/icon-thumbs-down.svg?react";
import ThumbsUpIcon from "../../assets/icon-thumbs-up.svg?react";

import { preferenceButton } from "./index.css";

export interface PreferenceButtonProps {
  type: "like" | "dislike";
  count: number;
  tone?: "overlay" | "muted";
  selected?: boolean;
  disabled?: boolean;
  onToggle?: (next: boolean) => void;
}

export function PreferenceButton({
  type,
  count,
  tone = "overlay",
  selected = false,
  disabled = false,
  onToggle,
}: PreferenceButtonProps) {
  const Icon = type === "like" ? ThumbsUpIcon : ThumbsDownIcon;

  return (
    <button
      aria-label={`${type === "like" ? "좋아요" : "싫어요"} ${count}`}
      aria-pressed={selected}
      className={preferenceButton({ type, tone, selected })}
      disabled={disabled}
      type="button"
      onClick={() => onToggle?.(!selected)}
    >
      <Icon aria-hidden height={12} width={12} />
      {count}
    </button>
  );
}
