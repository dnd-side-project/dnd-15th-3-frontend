import { style } from "@vanilla-extract/css";

import { palette } from "@/styles/palette";
import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const root = style({
  display: "flex",
  alignItems: "center",
  gap: 5,
  padding: "0 20px",
  overflowX: "auto",
  scrollPadding: "0 20px",
});

export const place = style({
  position: "relative",
  flexShrink: 0,
  width: 98,
  height: 98,
  borderRadius: 10,
  backgroundColor: vars.color.surface.muted,
  overflow: "hidden",
});

export const thumbnail = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  backgroundColor: vars.color.surface.muted,
  objectFit: "cover",
});

// Figma의 "선택된 장소" 카드와 같은 방식으로, 텍스트 그림자 대신 바닥에서 위로
// 옅어지는 스크림을 깔아 사진 위에서도 이름이 읽히게 한다.
export const name = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "flex-end",
  gap: 4,
  padding: 8,
  backgroundImage: `linear-gradient(0deg, ${palette.black4} 0%, ${palette.neutral16Alpha0} 100%)`,
  color: vars.color.text.inverse,
  ...text({ size: 12, weight: 600, lineHeight: 1.3 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const arrow = style({
  flexShrink: 0,
  width: 0,
  height: 0,
  border: "5px solid transparent",
  borderLeft: `8px solid ${vars.color.brand.primary}`,
});

export const addButton = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 98,
  height: 98,
  border: "none",
  borderRadius: 10,
  backgroundColor: vars.color.brand.subtle,
  color: vars.color.brand.primary,
  cursor: "pointer",
});
