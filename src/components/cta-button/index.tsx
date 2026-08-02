import { button, row } from "./index.css";

interface CtaButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function CtaButton({ children, disabled = false, onClick }: CtaButtonProps) {
  return (
    <button className={button({ disabled })} disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  );
}

interface CtaButtonRowProps {
  backLabel?: React.ReactNode;
  onBack: () => void;
  nextLabel: React.ReactNode;
  onNext: () => void;
  nextDisabled?: boolean;
}

export function CtaButtonRow({
  backLabel = "위로",
  onBack,
  nextLabel,
  onNext,
  nextDisabled = false,
}: CtaButtonRowProps) {
  return (
    <div className={row}>
      <button
        className={button({ variant: "secondary", fixedWidth: true })}
        onClick={onBack}
        type="button"
      >
        {backLabel}
      </button>
      <button
        className={button({ disabled: nextDisabled })}
        disabled={nextDisabled}
        onClick={onNext}
        type="button"
      >
        {nextLabel}
      </button>
    </div>
  );
}
