import {
  Children,
  isValidElement,
  type CSSProperties,
  type ComponentProps,
  type ReactNode,
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

type SheetProps = Omit<ComponentProps<typeof Sheet>, "unstyled" | "detent" | "className">;

interface BottomSheetProps extends SheetProps {
  hasHeader?: boolean;
  topBorderRadius?: "sm" | "md";
  onTapBackdrop?: () => void;
  initialView?: string;
}

export function BottomSheet({
  children,
  topBorderRadius,
  onTapBackdrop,
  hasHeader = true,
  ...props
}: BottomSheetProps) {
  const views = extractViews(children);
  const isViewsMode = views.length > 0;
  const initialView = props.initialView as string | undefined;

  if (isViewsMode) {
    if (!initialView) {
      throw new Error("initialView is required when using BottomSheet.View");
    }
    return (
      <BottomSheetViews
        views={injectDummyViews(views)}
        initialView={initialView}
        topBorderRadius={topBorderRadius}
        hasHeader={hasHeader}
        onTapBackdrop={onTapBackdrop}
        {...props}
      />
    );
  }

  return (
    <Sheet unstyled {...props} className={bottomSheet} detent="content">
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

interface ViewProps<T extends string = string> {
  name: T;
  height: number;
  next?: T | null;
  previous?: T | null;
  disableDismiss?: boolean;
  children: ReactNode;
}

function View<T extends string>(_props: ViewProps<T>): null {
  return null;
}

BottomSheet.View = View;

interface ViewConfig {
  name: string;
  height: number;
  next?: string | null;
  previous?: string | null;
  disableDismiss?: boolean;
  children: ReactNode;
}

interface BottomSheetViewsProps extends Omit<
  BottomSheetProps,
  "children" | "snapPoints" | "initialSnap" | "onSnap"
> {
  views: ViewConfig[];
  initialView: string;
}

function BottomSheetViews({
  views,
  initialView,
  topBorderRadius,
  hasHeader = true,
  onTapBackdrop,
  ...props
}: BottomSheetViewsProps) {
  const ref = useRef<SheetRef>(null);
  const [view, setView] = useState<string>(initialView);
  const pendingPreviousRef = useRef(false);

  const viewMap = new Map(views.map((v) => [v.name, v]));
  const activeView = viewMap.get(view) ?? views[0]!;
  const isDummy = view.startsWith(DUMMY_PREFIX);

  const snapPoints = [0, activeView.height, 1];
  const restIndex = 1;

  useEffect(() => {
    if (pendingPreviousRef.current) {
      pendingPreviousRef.current = false;
    }
    ref.current?.snapTo(restIndex);
  }, [view]);

  useEffect(() => {
    if (isDummy && activeView.previous) {
      queueMicrotask(() => {
        setView(activeView.previous!);
      });
    }
  }, [isDummy, activeView.previous]);

  const handleSnap = (index: number) => {
    if (index === restIndex) {
      return;
    }
    if (index < restIndex) {
      const prev = activeView.previous;
      if (prev === view) {
        return;
      }
      if (typeof prev === "string") {
        pendingPreviousRef.current = true;
        setView(prev);
      }
      // null/undefined → 라이브러리 onClose가 닫기 처리
    } else {
      const next = activeView.next;
      if (next === view) {
        return;
      }
      if (typeof next === "string") {
        setView(next);
      }
      // null/undefined → 도달 불가 (더미 주입으로 모든 next가 채워짐)
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
    <Sheet
      unstyled
      {...props}
      ref={ref}
      className={bottomSheet}
      detent="default"
      snapPoints={snapPoints}
      initialSnap={restIndex}
      onSnap={handleSnap}
      onClose={wrapOnClose}
      disableDismiss={activeView.disableDismiss ?? false}
      tweenConfig={{ ease: "linear", duration: 0.15 }}
    >
      <Sheet.Container className={container}>
        {hasHeader && (
          <Sheet.Header className={header({ topBorderRadius: topBorderRadius })}>
            <div className={dragIndicator} />
          </Sheet.Header>
        )}
        <Sheet.Content className={content}>
          <div key={view} className={viewContainer} style={containerStyle}>
            {activeView.children}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      {onTapBackdrop && <Sheet.Backdrop style={backdrop} onTap={onTapBackdrop} />}
    </Sheet>
  );
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

export function WithBottomSheetContext({
  children,
}: {
  children: (context: SheetContext) => ReactNode;
}) {
  const context = Sheet.useContext();
  return <>{children(context)}</>;
}

export type BottomSheetRef = SheetRef;
