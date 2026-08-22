export interface Bounds {
  /** 기본 상태의 높이 */
  peek: number;
  /** 전체 화면 높이 */
  full: number;
}

/** 시트를 얼마나 올렸는지(0~1). 끝까지 올리면 1 이다. */
export function expandRatio(height: number, peek: number, full: number) {
  if (full <= peek) {
    return 1;
  }
  return Math.min(1, Math.max(0, (height - peek) / (full - peek)));
}

/** 손을 떼면 절반을 넘긴 쪽으로 붙는다. */
export function snapHeight(height: number, peek: number, full: number) {
  return height > (peek + full) / 2 ? full : peek;
}
