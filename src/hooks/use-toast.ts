import { useEffect, useRef, useState } from "react";

const FADE_MS = 300;
const STAY_MS = 300;
const PAINT_MS = 30;

export interface ToastState {
  message: string;
  visible: boolean;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clear, []);

  const show = (message: string) => {
    clear();
    setToast({ message, visible: false });
    const hideAt = PAINT_MS + FADE_MS + STAY_MS;
    timers.current = [
      window.setTimeout(() => setToast({ message, visible: true }), PAINT_MS),
      window.setTimeout(() => setToast({ message, visible: false }), hideAt),
      window.setTimeout(() => setToast(null), hideAt + FADE_MS),
    ];
  };

  return { toast, show };
}
