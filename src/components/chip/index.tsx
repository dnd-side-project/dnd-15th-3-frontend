import type { ReactNode } from "react";

import XIcon from "../../assets/icon-x.svg?react";

import { chipContainer, chipGroup, chipIconHost, chipLabel, chipRemoveButton } from "./index.css";

type ChipSize = "sm" | "md";
type ChipLabelSize = "sm" | "md";
type ChipTone = "default" | "strong";
type ChipVariant = "filled" | "overlay";

interface ChipProps {
  children: ReactNode;
  icon?: ReactNode;
  size?: ChipSize;
  labelSize?: ChipLabelSize;
  tone?: ChipTone;
  variant?: ChipVariant;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export function Chip({
  children,
  icon,
  size = "md",
  labelSize = "sm",
  tone = "default",
  variant = "filled",
  selected = false,
  onClick,
  onRemove,
}: ChipProps) {
  const removable = selected && Boolean(onRemove);
  const pressed = variant === "overlay" ? undefined : selected;

  if (!removable) {
    return (
      <button
        type="button"
        className={`${chipContainer({ standalone: true, labelSize, size, tone, variant, selected })} ${chipIconHost}`}
        aria-pressed={pressed}
        onClick={onClick}
      >
        {icon}
        {children}
      </button>
    );
  }

  return (
    <span className={chipContainer({ labelSize, size, tone, variant, selected })}>
      <button
        type="button"
        className={`${chipLabel({ removable: true })} ${chipIconHost}`}
        aria-pressed={pressed}
        onClick={onClick}
      >
        {icon}
        {children}
      </button>
      <button
        type="button"
        className={chipRemoveButton}
        aria-label={typeof children === "string" ? `${children} 삭제` : "삭제"}
        onClick={onRemove}
      >
        <XIcon width={12} height={12} />
      </button>
    </span>
  );
}

interface ChipGroupProps {
  children: ReactNode;
}

export function ChipGroup({ children }: ChipGroupProps) {
  return <div className={chipGroup}>{children}</div>;
}
