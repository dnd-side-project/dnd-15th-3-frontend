import { useEffect, useRef, useState } from "react";

/** components/toast 의 transition 과 맞춘다. */
const FADE_MS = 300;
/** 다 나타난 뒤 머무는 시간 */
const STAY_MS = 300;
/** 투명한 첫 프레임이 그려질 틈 */
const PAINT_MS = 30;

export interface ToastState {
  message: string;
  visible: boolean;
}

/** 화면 위쪽에 잠깐 떴다 사라지는 알림. 반환한 toast 를 `<Toast />` 에 넘긴다. */
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
    // 투명한 상태로 먼저 그려야 나타나는 동안에도 전환이 걸린다.
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
