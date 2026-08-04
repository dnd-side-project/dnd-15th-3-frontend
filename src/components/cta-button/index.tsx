import type { ReactNode } from "react";

import { button, row } from "./index.css";

interface CtaButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function CtaButton({ children, disabled = false, onClick }: CtaButtonProps) {
  return (
    <button className={button()} disabled={disabled} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

interface CtaButtonRowProps {
  backLabel?: ReactNode;
  onBack: () => void;
  nextLabel: ReactNode;
  onNext: () => void;
  nextDisabled?: boolean;
}

export function CtaButtonRow({
  backLabel = "뒤로",
  onBack,
  nextLabel,
  onNext,
  nextDisabled = false,
}: CtaButtonRowProps) {
  return (
    <div className={row}>
      <button
        className={button({ variant: "secondary", fixedWidth: true })}
        type="button"
        onClick={onBack}
      >
        {backLabel}
      </button>
      <button className={button()} disabled={nextDisabled} type="button" onClick={onNext}>
        {nextLabel}
      </button>
    </div>
  );
}
