import type { ReactNode } from "react";

import { button, buttonRoot, row } from "./index.css";

export interface CtaButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function CtaButton({ children, icon, disabled = false, onClick }: CtaButtonProps) {
  return (
    <button
      className={`${buttonRoot} ${button()}`}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {children}
      {icon}
    </button>
  );
}

export interface CtaButtonRowProps {
  secondaryLabel?: ReactNode;
  secondaryAriaLabel?: string;
  onSecondary: () => void;
  primaryLabel: ReactNode;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  fixedWidth?: boolean;
}

export function CtaButtonRow({
  secondaryLabel = "뒤로",
  secondaryAriaLabel,
  onSecondary,
  primaryLabel,
  onPrimary,
  primaryDisabled = false,
  fixedWidth = true,
}: CtaButtonRowProps) {
  return (
    <div className={row}>
      <button
        aria-label={secondaryAriaLabel}
        className={`${buttonRoot} ${button({ variant: "secondary", fixedWidth })}`}
        type="button"
        onClick={onSecondary}
      >
        {secondaryLabel}
      </button>
      <button
        className={`${buttonRoot} ${button()}`}
        disabled={primaryDisabled}
        type="button"
        onClick={onPrimary}
      >
        {primaryLabel}
      </button>
    </div>
  );
}
