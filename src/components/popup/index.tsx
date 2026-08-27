import { Dialog } from "@base-ui/react/dialog";
import { type ReactNode, useRef } from "react";

import XIcon from "@/assets/icon-x.svg?react";

import {
  backdrop,
  card,
  close,
  description as descriptionStyle,
  footer as footerStyle,
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
  footer?: ReactNode;
}

export function Popup({
  open,
  onOpenChange,
  title,
  description,
  media,
  showClose = true,
  footer,
}: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const hasMedia = media != null;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <Dialog.Portal>
        <Dialog.Backdrop className={backdrop} />
        <Dialog.Popup
          ref={popupRef}
          initialFocus={popupRef}
          className={card({ hasMedia, showClose })}
        >
          {showClose && (
            <Dialog.Close aria-label="닫기" className={close}>
              <XIcon aria-hidden height={15} width={15} />
            </Dialog.Close>
          )}
          {media && <div className={mediaStyle}>{media}</div>}
          <div className={texts({ hasMedia, showClose })}>
            <Dialog.Title className={titleStyle}>{title}</Dialog.Title>
            {description && (
              <Dialog.Description className={descriptionStyle}>{description}</Dialog.Description>
            )}
          </div>
          {footer && <div className={footerStyle}>{footer}</div>}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
