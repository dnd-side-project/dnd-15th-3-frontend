import { Dialog } from "@base-ui/react/dialog";
import { type ReactNode, useRef } from "react";

import XIcon from "@/assets/icon-x.svg?react";

import {
  backdrop,
  card,
  close,
  description as descriptionStyle,
  media as mediaStyle,
  texts,
  title as titleStyle,
} from "./index.css";

export interface PopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  media?: ReactNode;
  showClose?: boolean;
}

export function Popup({
  open,
  onOpenChange,
  title,
  description,
  media,
  showClose = true,
}: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <Dialog.Portal>
        <Dialog.Backdrop className={backdrop} />
        <Dialog.Popup ref={popupRef} initialFocus={popupRef} className={card}>
          {showClose && (
            <Dialog.Close aria-label="닫기" className={close}>
              <XIcon aria-hidden height={15} width={15} />
            </Dialog.Close>
          )}
          <div className={mediaStyle}>{media}</div>
          <div className={texts}>
            <Dialog.Title className={titleStyle}>{title}</Dialog.Title>
            {description && (
              <Dialog.Description className={descriptionStyle}>{description}</Dialog.Description>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
