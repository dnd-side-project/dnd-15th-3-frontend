import { style } from "@vanilla-extract/css";

import { palette } from "@/styles/palette";
import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  background: vars.color.surface.default,
});

export const toggle = style({
  display: "flex",
  justifyContent: "center",
  marginTop: 20,
});

export const filters = style({
  marginTop: 17,
});

export const bar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 22,
  margin: "22px 20px 0",
});

export const count = style({
  color: vars.color.text.primary,
  ...text({ size: 18, weight: 600, lineHeight: "22px" }),
});

export const sort = style({
  display: "flex",
  alignItems: "center",
  gap: 3,
  padding: 0,
  border: "none",
  background: "none",
  color: vars.color.text.secondary,
  ...text({ size: 16, weight: 500, lineHeight: "17px" }),
  cursor: "pointer",
});

export const emptyState = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  marginTop: 106,
});

export const emptyTexts = style({
  display: "flex",
  flexDirection: "column",
  gap: 1,
  width: 230,
  marginTop: -23,
  paddingTop: 23,
  backgroundColor: vars.color.surface.default,
  textAlign: "center",
});

export const emptyTitle = style({
  margin: 0,
  color: vars.color.text.primary,
  ...text({ size: 20, weight: 600, lineHeight: "30px" }),
});

export const emptyDescription = style({
  margin: 0,
  color: vars.color.text.secondaryAlt,
  ...text({ size: 14, weight: 500, lineHeight: "21px" }),
});

export const grid = style({
  display: "flex",
  gap: 13,
  margin: "25px 22px 0",
  // 마지막 카드가 하단 고정 버튼에 가리지 않게 한다.
  paddingBottom: 123,
});

export const column = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 13,
  minWidth: 0,
});

export const card = style({
  position: "relative",
  flexShrink: 0,
  borderRadius: 12,
  overflow: "hidden",
});

// 선호도 버튼과 중첩되지 않도록 카드 전체 링크를 아래에 깔아 둔다.
export const cardLink = style({
  position: "absolute",
  inset: 0,
  padding: 0,
  border: "none",
  background: "none",
  cursor: "pointer",
});

export const cardImage = style({
  display: "block",
  width: "100%",
  height: "100%",
  backgroundColor: vars.color.surface.muted,
  objectFit: "cover",
});

export const cardScrim = style({
  position: "absolute",
  inset: 0,
  background: `linear-gradient(180deg, ${palette.black6Alpha0} 40%, ${palette.black7Alpha59} 58%)`,
});

export const cardBody = style({
  pointerEvents: "none",
  position: "absolute",
  right: 16,
  bottom: 16,
  left: 16,
  display: "flex",
  flexDirection: "column",
  gap: 15,
});

export const cardHeader = style({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

export const cardTexts = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 5,
  minWidth: 0,
});

export const cardName = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  color: vars.color.text.inverse,
  ...text({ size: 16, weight: 600, lineHeight: "20px" }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const cardAddress = style({
  color: vars.color.text.inverse,
  ...text({ size: 12, weight: 500, lineHeight: "12px" }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const preferences = style({
  pointerEvents: "auto",
  display: "flex",
  gap: 5,
  alignSelf: "flex-start",
});

export const footer = style({
  position: "sticky",
  bottom: 0,
  marginTop: "auto",
  display: "flex",
  padding: "10px 20px calc(20px + env(safe-area-inset-bottom))",
  backgroundColor: vars.color.surface.default,
  boxShadow: `0 4px 11.9px ${vars.color.overlay.scrim25}`,
});

export const retry = style({
  alignSelf: "center",
  height: 40,
  padding: "0 20px",
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.surface.muted,
  color: vars.color.slate.text,
  ...text({ size: 15, weight: 600, lineHeight: 1.2 }),
  cursor: "pointer",
});

export const status = style({
  padding: "40px 20px",
  color: vars.color.text.secondary,
  ...text({ size: 16, weight: 500 }),
  textAlign: "center",
});

export const infoBox = style({
  position: "fixed",
  top: 63,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 100,
  maxWidth: 309,
  width: "calc(100% - 40px)",
  minHeight: 68,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 20px",
  borderRadius: 15,
  backgroundColor: palette.neutral22Alpha80,
  backdropFilter: "blur(4px)",
  color: vars.color.text.inverse,
  whiteSpace: "pre-wrap",
  ...text({ size: 16, weight: 500, lineHeight: 1.6 }),
  cursor: "pointer",
  boxSizing: "border-box",
});
