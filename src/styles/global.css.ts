import { globalStyle } from "@vanilla-extract/css";

import { vars } from "./theme.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

// 디자인 기준 서체. index.html 에서 Pretendard 를 불러온다.
globalStyle(":root", {
  vars: {
    [vars.font.body]:
      'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", sans-serif',
  },
});

globalStyle("body", {
  fontFamily: vars.font.body,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("button, input, textarea, select", {
  fontFamily: "inherit",
});
