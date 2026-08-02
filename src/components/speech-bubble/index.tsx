import { bubble, icon, iconDot } from "./index.css";

interface SpeechBubbleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * CTA 버튼 위에 얹어 쓰는 상태 안내 말풍선.
 * 버튼과 강결합하지 않고, 사용하는 쪽에서 버튼과 함께 배치(compose)한다.
 */
export function SpeechBubble({ children, icon: iconSlot }: SpeechBubbleProps) {
  return (
    <div className={bubble}>
      <span className={icon}>{iconSlot ?? <span className={iconDot} />}</span>
      {children}
    </div>
  );
}
