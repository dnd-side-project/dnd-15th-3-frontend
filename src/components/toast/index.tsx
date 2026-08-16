import { Toast as BaseToast } from "@base-ui/react";
import type { PropsWithChildren } from "react";

import { toast } from "./manager";

import { content, root, title, viewport } from "./index.css";

const TIMEOUT_MS = 600;

function ToastList() {
  const { toasts } = BaseToast.useToastManager();

  return toasts.map((item) => (
    <BaseToast.Root className={root} key={item.id} swipeDirection="up" toast={item}>
      <BaseToast.Content className={content}>
        <BaseToast.Title className={title} />
      </BaseToast.Content>
    </BaseToast.Root>
  ));
}

export function ToastProvider({ children }: PropsWithChildren) {
  return (
    <BaseToast.Provider timeout={TIMEOUT_MS} toastManager={toast}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className={viewport}>
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}
