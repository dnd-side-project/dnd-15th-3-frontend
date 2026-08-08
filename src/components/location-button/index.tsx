import LocationIcon from "../../assets/icon-location.svg?react";

import { button } from "./index.css";

export interface LocationButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function LocationButton({ onClick, disabled }: LocationButtonProps) {
  return (
    <button
      aria-label="현재 위치"
      className={button}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <LocationIcon aria-hidden height={30} width={30} />
    </button>
  );
}
