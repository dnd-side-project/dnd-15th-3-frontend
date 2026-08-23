import type { ReactNode } from "react";

import { cx } from "@/utils/cx";

import { description as descriptionStyle, root, title as titleStyle } from "./index.css";

export interface SectionIntroProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function SectionIntro({ title, description, action, className }: SectionIntroProps) {
  return (
    <div className={cx(root, className)}>
      <h2 className={titleStyle}>{title}</h2>
      {description === undefined ? null : <p className={descriptionStyle}>{description}</p>}
      {action}
    </div>
  );
}
