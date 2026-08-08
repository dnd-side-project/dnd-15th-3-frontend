import { Children, type ReactNode } from "react";

import ArrowRightIcon from "../../assets/icon-arrow-right.svg?react";
import XIcon from "../../assets/icon-x.svg?react";

import {
  chipConnector,
  chipConnectorArrow,
  chipContainer,
  chipGroup,
  chipIconHost,
  chipLabel,
  chipRemoveButton,
} from "./index.css";

export type ChipVariant = "filled" | "overlay";

export interface ChipProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: ChipVariant;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export function Chip({
  children,
  icon,
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
        className={`${chipContainer({ standalone: true, variant, selected })} ${chipIconHost}`}
        aria-pressed={pressed}
        onClick={onClick}
      >
        {icon}
        {children}
      </button>
    );
  }

  return (
    <span className={chipContainer({ variant, selected })}>
      <button
        type="button"
        className={`${chipLabel} ${chipIconHost}`}
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
        <XIcon aria-hidden height={15} width={15} />
      </button>
    </span>
  );
}

export interface ChipGroupProps {
  children: ReactNode;
  scroll?: boolean;
  connected?: boolean;
}

export function ChipGroup({ children, scroll = false, connected = false }: ChipGroupProps) {
  if (!connected) {
    return <div className={chipGroup({ scroll })}>{children}</div>;
  }

  const chips = Children.toArray(children);

  return (
    <div className={chipGroup({ scroll, connected })}>
      {chips.map((chip, index) => (
        <span key={index} className={chipConnector}>
          {chip}
          {index < chips.length - 1 ? (
            <ArrowRightIcon aria-hidden className={chipConnectorArrow} height={7.64} width={10.5} />
          ) : null}
        </span>
      ))}
    </div>
  );
}
