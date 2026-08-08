import type { ReactNode } from "react";

import CaretLeftIcon from "../../assets/icon-caret-left.svg?react";

import { iconButton, root, slot, title as titleStyle } from "./index.css";

export type TopAppBarBackground = "surface" | "white";

export interface TopAppBarProps {
  title: string;
  onBack?: () => void;
  action?: ReactNode;
  background?: TopAppBarBackground;
}

export function TopAppBar({ title, onBack, action, background = "surface" }: TopAppBarProps) {
  return (
    <header className={root({ background })}>
      <div className={slot}>
        {onBack ? (
          <button aria-label="뒤로 가기" className={iconButton} onClick={onBack} type="button">
            <CaretLeftIcon aria-hidden height={24} width={24} />
          </button>
        ) : null}
      </div>
      <span className={titleStyle}>{title}</span>
      <div className={slot}>{action}</div>
    </header>
  );
}
