import { type PointerEvent, type ReactNode, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import CaretRightIcon from "../../../../assets/icon-caret-right.svg?react";
import { Layout } from "../../../../components/layout";
import { LocationButton } from "../../../../components/location-button";
import { Toggle } from "../../../../components/toggle";
import { useCurrentPosition } from "../../../../hooks/use-current-position";
import { cx } from "../../../../utils/cx";
import { CourseCategoryChips } from "../../../catalog/components/course-category-chips";
import { useMeeting } from "../../hooks";
import { MeetingMap } from "../meeting-map";
import { type Size, expandRatio, resize, snap } from "./expand";

import {
  bottomActions,
  bottomStack,
  chips,
  grabber,
  meetingPill,
  pillIcon,
  root,
  sheet,
  toggle,
} from "./index.css";

/** 지도 위에 토글·카테고리·하단 버튼을 얹고, 아래에 화면별 시트를 받는다. */
export function MapScreen({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { data: meeting } = useMeeting();
  const { position, locate, loading } = useCurrentPosition();

  return (
    <Layout>
      <div className={root}>
        <MeetingMap currentPosition={position} origin={meeting?.firstLocation} />

        <div className={toggle}>
          <Toggle value="map" onChange={() => void navigate(`/meeting/${id}/choice`)} />
        </div>

        <div className={chips}>
          <CourseCategoryChips value={meeting?.categorySlugs ?? []} variant="overlay" />
        </div>

        <div className={bottomStack}>
          <div className={bottomActions}>
            <LocationButton disabled={loading} onClick={locate} />
            <button
              className={meetingPill}
              type="button"
              onClick={() => void navigate(`/meeting/${id}`)}
            >
              <img alt="" className={pillIcon} src="/static/icon-meeting-calendar.webp" />
              모임 상세
              <CaretRightIcon aria-hidden height={16} width={16} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </Layout>
  );
}

export interface MapSheetProps {
  /** 시트 안쪽 배치가 화면마다 달라 덧붙일 수 있게 열어 둔다. */
  className?: string;
  /** 손잡이를 끌어 전체 화면까지 펼 수 있게 한다. */
  expandable?: boolean;
  children: ReactNode;
}

/** 지도 아래에 붙는 시트. 손잡이는 모든 지도 화면이 같아 여기서 그린다. */
export function MapSheet({ className, expandable = false, children }: MapSheetProps) {
  const [size, setSize] = useState<Size | null>(null);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ pointerY: number; height: number } | null>(null);

  const grab = (event: PointerEvent<HTMLDivElement>) => {
    const node = event.currentTarget.parentElement;
    const full = node?.parentElement?.clientHeight;
    if (node === null || full === undefined) {
      return;
    }

    // 처음 끌 때의 높이를 기본 높이로 삼는다.
    const height = Math.round(node.getBoundingClientRect().height);
    event.currentTarget.setPointerCapture(event.pointerId);
    start.current = { pointerY: event.clientY, height };
    setSize((current) => current ?? { height, peek: height, full });
    setDragging(true);
  };

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (start.current === null) {
      return;
    }
    const { pointerY, height } = start.current;
    setSize(resize(size, height + (pointerY - event.clientY)));
  };

  const release = () => {
    start.current = null;
    setDragging(false);
    setSize(snap(size));
  };

  const ratio = expandRatio(size);
  const radius = Math.round(24 * (1 - ratio));

  return (
    <div
      className={cx(sheet({ dragging }), className)}
      style={
        size === null
          ? undefined
          : { flexShrink: 0, height: size.height, borderRadius: `${radius}px ${radius}px 0 0` }
      }
    >
      <div
        className={grabber({ hidden: ratio === 1 && !dragging })}
        onPointerCancel={release}
        onPointerDown={expandable ? grab : undefined}
        onPointerMove={move}
        onPointerUp={release}
      />
      {children}
    </div>
  );
}
