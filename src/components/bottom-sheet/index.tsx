import {
  Children,
  isValidElement,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  type Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import { Sheet, type SheetContext, type SheetRef } from "react-modal-sheet";

import {
  backdrop,
  bottomSheet,
  container,
  content,
  dragIndicator,
  header,
  viewLayer,
  viewStack,
} from "./index.css";

type SheetProps = Omit<ComponentProps<typeof Sheet>, "unstyled" | "className">;

export interface BottomSheetProps extends SheetProps {
  hasHeader?: boolean;
  topBorderRadius?: "sm" | "md";
  onTapBackdrop?: () => void;
  ref?: Ref<SheetRef>;
  disableContentDrag?: boolean;
  disableContentScroll?: boolean;
}

export function BottomSheet({
  children,
  topBorderRadius,
  onTapBackdrop,
  hasHeader = true,
  detent = "content",
  ref,
  disableContentDrag,
  disableContentScroll,
  ...props
}: BottomSheetProps) {
  return (
    <Sheet unstyled {...props} ref={ref} detent={detent} className={bottomSheet}>
      <Sheet.Container className={container}>
        {hasHeader && (
          <Sheet.Header className={header({ topBorderRadius: topBorderRadius })}>
            <div className={dragIndicator} />
          </Sheet.Header>
        )}
        <Sheet.Content
          className={content}
          disableDrag={disableContentDrag}
          disableScroll={disableContentScroll}
        >
          {children}
        </Sheet.Content>
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

export interface ViewProps {
  snapIndex: number;
  height?: number;
  fullScreen?: boolean;
  children: ReactNode;
}

export function View(_props: ViewProps): null {
  return null;
}

export interface MultiViewBottomSheetProps extends SheetProps {
  initialSnapIndex?: number;
  snapIndex?: number;
  onSnapIndexChange?: (index: number) => void;
  children: ReactNode;
  hasHeader?: boolean;
  topBorderRadius?: "sm" | "md";
  onTapBackdrop?: () => void;
}

function extractViews(children: ReactNode): ViewProps[] {
  const views: ViewProps[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== View) {
      return;
    }
    const props = child.props as ViewProps;
    const height = props.fullScreen ? window.innerHeight : (props.height ?? 0);
    views.push({
      snapIndex: props.snapIndex,
      height,
      fullScreen: props.fullScreen,
      children: props.children,
    });
  });
  return views.sort((a, b) => a.snapIndex - b.snapIndex);
}

export function MultiViewBottomSheet({
  initialSnapIndex,
  snapIndex,
  onSnapIndexChange,
  children,
  hasHeader = true,
  topBorderRadius,
  onTapBackdrop,
  ...props
}: MultiViewBottomSheetProps) {
  const views = extractViews(children);
  const maxSnapIndex = Math.max(...views.map((v) => v.snapIndex));
  const maxHeight = Math.max(...views.map((v) => v.height ?? 0));

  const snapPoints = [0];
  for (let i = 1; i < maxSnapIndex; i++) {
    const view = views.find((v) => v.snapIndex === i);
    snapPoints.push(view ? (view.height ?? 0) : 0);
  }
  snapPoints.push(1);

  const isControlled = snapIndex !== undefined;
  const [internalSnapIndex, setInternalSnapIndex] = useState(initialSnapIndex ?? 1);
  const currentSnapIndex = isControlled ? snapIndex : internalSnapIndex;

  const sheetRef = useRef<SheetRef>(null);

  useEffect(() => {
    sheetRef.current?.snapTo(currentSnapIndex);
  }, [currentSnapIndex]);

  const handleSnap = (index: number) => {
    if (!isControlled) {
      setInternalSnapIndex(index);
    }
    onSnapIndexChange?.(index);
  };

  const currentView = views.find((v) => v.snapIndex === currentSnapIndex);
  const stackStyle: CSSProperties = { height: maxHeight };
  const detent = currentView?.fullScreen ? "full" : "content";

  return (
    <BottomSheet
      {...props}
      ref={sheetRef}
      detent={detent}
      snapPoints={snapPoints}
      initialSnap={currentSnapIndex}
      onSnap={handleSnap}
      hasHeader={hasHeader}
      topBorderRadius={topBorderRadius}
      onTapBackdrop={onTapBackdrop}
      disableContentScroll
    >
      <div className={viewStack} style={stackStyle}>
        {views.map((view) => {
          const isActive = view.snapIndex === currentSnapIndex;
          return (
            <div
              key={view.snapIndex}
              className={viewLayer({ active: isActive })}
              style={{ height: view.height }}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              {view.children}
            </div>
          );
        })}
      </div>
    </BottomSheet>
  );
}

export type BottomSheetRef = SheetRef;
