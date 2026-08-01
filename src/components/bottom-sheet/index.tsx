import { type ComponentProps, type ReactNode } from "react";
import { Sheet, type SheetContext, type SheetRef } from "react-modal-sheet";

import { backdrop, bottomSheet, container, content, dragIndicator, header } from "./index.css";

type SheetProps = Omit<ComponentProps<typeof Sheet>, "unstyled" | "detent" | "className">;

interface BottomSheetProps extends SheetProps {
  topBorderRadius?: "sm" | "md";
  onTapBackdrop?: () => void;
  maxHeight?: number;
}

export function BottomSheet({
  children,
  topBorderRadius,
  onTapBackdrop,
  ...props
}: BottomSheetProps) {
  return (
    <Sheet unstyled {...props} className={bottomSheet} detent="content">
      <Sheet.Container className={container}>
        <Sheet.Header className={header({ topBorderRadius: topBorderRadius })}>
          <div className={dragIndicator} />
        </Sheet.Header>
        <Sheet.Content className={content}>{children}</Sheet.Content>
      </Sheet.Container>
      {onTapBackdrop && <Sheet.Backdrop style={backdrop} onTap={onTapBackdrop} />}
    </Sheet>
  );
}

export function WithBottomSheetContext({
  children,
}: {
  children: (context: SheetContext) => ReactNode;
}) {
  const context = Sheet.useContext();
  return <>{children(context)}</>;
}

export type BottomSheetRef = SheetRef;
