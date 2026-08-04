import type { ReactNode } from "react";

import { bubble } from "./index.css";

interface SpeechBubbleProps {
  children: ReactNode;
  icon?: ReactNode;
}

export function SpeechBubble({ children, icon }: SpeechBubbleProps) {
  return (
    <div className={bubble}>
      {icon}
      {children}
    </div>
  );
}
