import type { ReactNode } from "react";

import XIcon from "../../assets/icon-x.svg?react";

import { chipContainer, chipGroup, chipIcon, chipLabel, chipRemoveButton } from "./index.css";

type ChipSize = "sm" | "md";
type ChipTone = "default" | "strong";
type ChipVariant = "filled" | "overlay";

interface ChipProps {
  children: ReactNode;
  icon?: ReactNode;
  size?: ChipSize;
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
  tone = "default",
  variant = "filled",
  selected = false,
  onClick,
  onRemove,
}: ChipProps) {
  const removable = selected && Boolean(onRemove);

  return (
    <span className={chipContainer({ size, tone, variant, selected })}>
      <button
        type="button"
        className={chipLabel({ removable })}
        aria-pressed={variant === "overlay" ? undefined : selected}
        onClick={onClick}
      >
        {icon ? (
          <span aria-hidden className={chipIcon}>
            {icon}
          </span>
        ) : null}
        {children}
      </button>
      {removable ? (
        <button type="button" className={chipRemoveButton} aria-label="삭제" onClick={onRemove}>
          <XIcon width={12} height={12} />
        </button>
      ) : null}
    </span>
  );
}

interface ChipGroupProps {
  children: ReactNode;
}

export function ChipGroup({ children }: ChipGroupProps) {
  return <div className={chipGroup}>{children}</div>;
}
