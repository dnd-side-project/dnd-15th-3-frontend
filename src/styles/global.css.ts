import { globalStyle } from "@vanilla-extract/css";

/**
 * 최소한의 전역 리셋. 토큰에 의존하지 않아 로드 순서와 무관합니다.
 */
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});
