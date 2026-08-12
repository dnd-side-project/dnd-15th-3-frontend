/** 경로·토큰 같은 필수 문자열이 모두 채워졌을 때만 요청한다. */
export const filled = (...values: string[]) => values.every((value) => value.length > 0);
