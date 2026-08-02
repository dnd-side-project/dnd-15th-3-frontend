import type { ReactNode } from "react";

import { frame, letterbox } from "./index.css";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={letterbox}>
      <div className={frame}>{children}</div>
    </div>
  );
}
