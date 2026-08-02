import { button, row, rowBackButton, rowNextButton } from "./index.css";

interface CtaButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

/** 단독으로 쓰이는 full-width 주 CTA 버튼. */
export function CtaButton({ children, disabled = false, onClick }: CtaButtonProps) {
  return (
    <button
      className={button({ variant: "primary", disabled })}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
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

/** "위로"(보조) + "다음"(주 버튼) 2분할 레이아웃. */
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
        className={`${button({ variant: "secondary" })} ${rowBackButton}`}
        onClick={onBack}
        type="button"
      >
        {backLabel}
      </button>
      <button
        className={`${button({ variant: "primary", disabled: nextDisabled })} ${rowNextButton}`}
        disabled={nextDisabled}
        onClick={onNext}
        type="button"
      >
        {nextLabel}
      </button>
    </div>
  );
}
