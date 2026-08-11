import {
  Children,
  isValidElement,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  type Ref,
  useCallback,
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
  viewContainer,
} from "./index.css";

const DUMMY_PREFIX = "__end_dummy__";

type SheetProps = Omit<ComponentProps<typeof Sheet>, "unstyled" | "className">;

export interface ViewProps<T extends string = string> {
  name: T;
  height: number;
  next?: T | null;
  previous?: T | null;
  disableDismiss?: boolean;
  children: ReactNode;
}

export function View<T extends string>(_props: ViewProps<T>): null {
  return null;
}

export interface BottomSheetProps extends SheetProps {
  hasHeader?: boolean;
  topBorderRadius?: "sm" | "md";
  onTapBackdrop?: () => void;
  ref?: Ref<SheetRef>;
}

export function BottomSheet({
  children,
  topBorderRadius,
  onTapBackdrop,
  hasHeader = true,
  detent = "content",
  ref,
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
        <Sheet.Content className={content}>{children}</Sheet.Content>
      </Sheet.Container>
      {onTapBackdrop && <Sheet.Backdrop style={backdrop} onTap={onTapBackdrop} />}
    </Sheet>
  );
}

interface ViewConfig {
  name: string;
  height: number;
  next?: string | null;
  previous?: string | null;
  disableDismiss?: boolean;
  children: ReactNode;
}

export interface MultiViewBottomSheetProps extends SheetProps {
  view?: string;
  onViewChange?: (view: string) => void;
  initialView?: string;
  children: ReactNode;
  hasHeader?: boolean;
  topBorderRadius?: "sm" | "md";
  onTapBackdrop?: () => void;
}

function extractViews(children: ReactNode): ViewConfig[] {
  const views: ViewConfig[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== View) {
      return;
    }
    const props = child.props as ViewProps;
    views.push({
      name: props.name,
      height: props.height,
      next: props.next,
      previous: props.previous,
      disableDismiss: props.disableDismiss,
      children: props.children,
    });
  });
  return views;
}

function injectDummyViews(views: ViewConfig[]): ViewConfig[] {
  return views.flatMap((v) => {
    if (v.next !== undefined && v.next !== null) {
      return [v];
    }
    const dummyName = `${DUMMY_PREFIX}${v.name}`;
    return [
      { ...v, next: dummyName },
      {
        name: dummyName,
        height: v.height,
        previous: v.name,
        next: undefined,
        disableDismiss: v.disableDismiss,
        children: v.children,
      },
    ];
  });
}

export function MultiViewBottomSheet({
  view,
  onViewChange,
  initialView,
  children,
  hasHeader = true,
  topBorderRadius,
  onTapBackdrop,
  ...props
}: MultiViewBottomSheetProps) {
  const views = extractViews(children);
  const processedViews = injectDummyViews(views);

  const isControlled = view !== undefined;
  const [internalView, setInternalView] = useState<string>(initialView ?? processedViews[0]!.name);
  const currentView = isControlled ? view : internalView;

  const ref = useRef<SheetRef>(null);
  const pendingPreviousRef = useRef(false);

  const viewMap = new Map(processedViews.map((v) => [v.name, v]));
  const activeView = viewMap.get(currentView) ?? processedViews[0]!;
  const isDummy = currentView.startsWith(DUMMY_PREFIX);

  const snapPoints = [0, activeView.height, 1];
  const restIndex = 1;

  const setView = useCallback(
    (newView: string) => {
      if (!isControlled) {
        setInternalView(newView);
      }
      onViewChange?.(newView);
    },
    [isControlled, onViewChange, setInternalView],
  );

  useEffect(() => {
    if (pendingPreviousRef.current) {
      pendingPreviousRef.current = false;
    }
    ref.current?.snapTo(restIndex);
  }, [currentView]);

  useEffect(() => {
    if (isDummy && activeView.previous) {
      queueMicrotask(() => {
        setView(activeView.previous!);
      });
    }
  }, [isDummy, activeView.previous, setView]);

  const handleSnap = (index: number) => {
    if (index === restIndex) {
      return;
    }
    if (index < restIndex) {
      const prev = activeView.previous;
      if (prev === currentView) {
        return;
      }
      if (typeof prev === "string") {
        pendingPreviousRef.current = true;
        setView(prev);
      }
    } else {
      const next = activeView.next;
      if (next === currentView) {
        return;
      }
      if (typeof next === "string") {
        setView(next);
      }
    }
  };

  const wrapOnClose = () => {
    if (pendingPreviousRef.current) {
      return;
    }
    props.onClose?.();
  };

  const containerStyle: CSSProperties = { height: activeView.height };

  return (
    <BottomSheet
      {...props}
      ref={ref}
      detent="default"
      snapPoints={snapPoints}
      initialSnap={restIndex}
      onSnap={handleSnap}
      onClose={wrapOnClose}
      disableDismiss={activeView.disableDismiss ?? false}
      tweenConfig={{ ease: "linear", duration: 0.15 }}
      hasHeader={hasHeader}
      topBorderRadius={topBorderRadius}
      onTapBackdrop={onTapBackdrop}
    >
      <div key={currentView} className={viewContainer} style={containerStyle}>
        {activeView.children}
      </div>
    </BottomSheet>
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
