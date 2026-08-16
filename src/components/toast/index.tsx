import type { ToastState } from "../../hooks/use-toast";

import { toast as toastStyle } from "./index.css";

interface ToastProps {
  toast: ToastState | null;
}

export function Toast({ toast }: ToastProps) {
  if (toast === null) {
    return null;
  }

  return (
    <div className={toastStyle} data-visible={toast.visible} role="status">
      {toast.message}
    </div>
  );
}
