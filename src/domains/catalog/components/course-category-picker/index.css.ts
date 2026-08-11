import { style } from "@vanilla-extract/css";

import { vars } from "../../../../styles/theme.css";

export const selected = style({
  minHeight: 83,
  padding: "0 20px",
});

export const empty = style({
  // 83px 인 선택 영역 안에서 시안의 문구 위치에 맞춘다.
  paddingTop: 43,
  color: "#A4B1C5",
  fontFamily: vars.font.body,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "20px",
  textAlign: "center",
  whiteSpace: "pre-line",
});

export const available = style({
  marginTop: 71,
  padding: "0 20px",
});
