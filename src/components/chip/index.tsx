import type { ReactNode } from "react";

import XIcon from "../../assets/icon-x.svg?react";

import { chipContainer, chipGroup, chipLabel, chipRemoveButton } from "./index.css";

interface ChipProps {
  /** 칩에 표시할 라벨 */
  children: ReactNode;
  /** 선택 여부 */
  selected?: boolean;
  /** 칩(라벨) 클릭 시 호출된다. 선택 토글 등에 사용한다. */
  onClick?: () => void;
  /**
   * 전달하면 선택 상태에서 우측에 삭제(×) 아이콘이 렌더링되고,
   * 클릭 시 호출된다. "전체"처럼 선택은 되지만 제거할 수 없는
   * 칩은 onRemove를 전달하지 않으면 된다.
   */
  onRemove?: () => void;
}

export function Chip({ children, selected = false, onClick, onRemove }: ChipProps) {
  const removable = Boolean(onRemove);

  return (
    <span className={chipContainer({ selected })}>
      <button
        type="button"
        className={chipLabel({ selected, removable })}
        aria-pressed={selected}
        onClick={onClick}
      >
        {children}
      </button>
      {removable && (
        <button type="button" className={chipRemoveButton} aria-label="삭제" onClick={onRemove}>
          <XIcon width={12} height={12} />
        </button>
      )}
    </span>
  );
}

interface ChipGroupProps {
  children: ReactNode;
}

/** 여러 칩을 flex-wrap으로 나열하기 위한 레이아웃 헬퍼 */
export function ChipGroup({ children }: ChipGroupProps) {
  return <div className={chipGroup}>{children}</div>;
}
