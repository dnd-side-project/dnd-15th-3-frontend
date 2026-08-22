export interface Size {
  height: number;
  /** 기본 상태의 높이 */
  peek: number;
  /** 전체 화면 높이 */
  full: number;
}

/** 시트를 얼마나 올렸는지(0~1). 끝까지 올리면 1 이다. */
export function expandRatio(size: Size | null) {
  if (size === null || size.full <= size.peek) {
    return 0;
  }
  return Math.min(1, Math.max(0, (size.height - size.peek) / (size.full - size.peek)));
}

/** 기본 높이와 전체 화면 사이로 자른다. */
export function resize(size: Size | null, height: number) {
  if (size === null) {
    return size;
  }
  return { ...size, height: Math.min(size.full, Math.max(size.peek, height)) };
}

/** 손을 떼면 절반을 넘긴 쪽으로 붙는다. */
export function snap(size: Size | null) {
  if (size === null) {
    return size;
  }
  return { ...size, height: size.height > (size.peek + size.full) / 2 ? size.full : size.peek };
}
