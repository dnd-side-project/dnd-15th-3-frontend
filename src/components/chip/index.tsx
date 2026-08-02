import type { ReactNode } from "react";

import XIcon from "../../assets/icon-x.svg?react";

import { chipContainer, chipGroup, chipLabel, chipRemoveButton } from "./index.css";

interface ChipProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export function Chip({ children, selected = false, onClick, onRemove }: ChipProps) {
  const removable = selected && Boolean(onRemove);

  return (
    <span className={chipContainer({ selected })}>
      <button
        type="button"
        className={chipLabel({ selected, removable })}
        aria-pressed={selected}
        onClick={onClick}
      >
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
