import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/theme.css";

// 화면 중앙 프레임을 제외한 좌우 여백(레터박스) 배경 — Toss식
export const letterbox = style({
  display: "flex",
  justifyContent: "center",
  minHeight: "100dvh",
  background: "#eeeeee",
});

// 모바일 폭(393px)으로 고정되는 콘텐츠 프레임
export const frame = style({
  width: "100%",
  maxWidth: "393px",
  background: vars.color.background,
  display: "flex",
  flexDirection: "column",
});
