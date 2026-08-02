import { bubble, icon, iconDot } from "./index.css";

interface SpeechBubbleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function SpeechBubble({ children, icon: iconSlot }: SpeechBubbleProps) {
  return (
    <div className={bubble}>
      <span className={icon}>{iconSlot ?? <span className={iconDot} />}</span>
      {children}
    </div>
  );
}
