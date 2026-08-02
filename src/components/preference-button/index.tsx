import ThumbsDownIcon from "../../assets/icon-thumbs-down.svg?react";
import ThumbsUpIcon from "../../assets/icon-thumbs-up.svg?react";

import { preferenceButton } from "./index.css";

interface PreferenceButtonProps {
  type: "like" | "dislike";
  count: number;
  selected?: boolean;
  disabled?: boolean;
  onToggle?: (next: boolean) => void;
}

const ICON_SIZE = 16;

export function PreferenceButton({
  type,
  count,
  selected = false,
  disabled = false,
  onToggle,
}: PreferenceButtonProps) {
  const Icon = type === "like" ? ThumbsUpIcon : ThumbsDownIcon;

  return (
    <button
      aria-pressed={selected}
      className={preferenceButton({ type, selected })}
      disabled={disabled}
      type="button"
      onClick={() => onToggle?.(!selected)}
    >
      <Icon height={ICON_SIZE} width={ICON_SIZE} />
      <span>{count}</span>
    </button>
  );
}
