import type { ReactNode } from "react";

import CaretLeftIcon from "../../assets/icon-caret-left.svg?react";

import * as styles from "./index.css";

export interface TopAppBarProps {
  title: string;
  onBack?: () => void;
  action?: ReactNode;
}

export function TopAppBar({ title, onBack, action }: TopAppBarProps) {
  return (
    <header className={styles.root}>
      <div className={styles.slot}>
        {onBack ? (
          <button
            aria-label="뒤로 가기"
            className={styles.iconButton}
            onClick={onBack}
            type="button"
          >
            <CaretLeftIcon width={24} height={24} />
          </button>
        ) : null}
      </div>
      <span className={styles.title}>{title}</span>
      <div className={styles.slot}>{action}</div>
    </header>
  );
}
