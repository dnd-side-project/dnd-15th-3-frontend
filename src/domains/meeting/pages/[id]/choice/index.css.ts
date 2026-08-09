import { style } from "@vanilla-extract/css";

import { vars } from "../../../../../styles/theme.css";

const colors = {
  surface: "#FFFFFF",
  heading: "#262626",
  muted: "#707D91",
  scrim: "rgba(0, 0, 0, 0.59)",
  cardText: "#FFFFFF",
  caret: "rgba(242, 243, 247, 0.59)",
};

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  background: colors.surface,
});

export const toggle = style({
  display: "flex",
  justifyContent: "center",
  marginTop: 20,
});

export const filters = style({
  marginTop: 17,
  padding: "0 20px",
});

export const bar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 22,
  margin: "22px 20px 0",
});

export const count = style({
  color: colors.heading,
  fontFamily: vars.font.body,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: "22px",
});

export const sort = style({
  display: "flex",
  alignItems: "center",
  gap: 3,
  padding: 0,
  border: "none",
  background: "none",
  color: colors.muted,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "17px",
  cursor: "pointer",
});

export const grid = style({
  columns: 2,
  columnGap: 12,
  margin: "25px 22px 0",
  // 마지막 카드가 하단 고정 버튼에 가리지 않게 한다.
  paddingBottom: 123,
});

export const card = style({
  position: "relative",
  marginBottom: 13,
  borderRadius: 12,
  overflow: "hidden",
  breakInside: "avoid",
});

// 카드 전체를 누르면 장소 상세로 간다. 선호도 버튼과 중첩되지 않도록 아래에 깔아 둔다.
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
});

export const cardScrim = style({
  position: "absolute",
  inset: 0,
  background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 39.9%, ${colors.scrim} 58.2%)`,
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
  gap: 5.54,
  color: colors.cardText,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 600,
  lineHeight: "20px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const cardAddress = style({
  color: colors.cardText,
  fontFamily: vars.font.body,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: "12px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const cardCaret = style({
  flexShrink: 0,
  color: colors.caret,
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
  display: "flex",
  padding: "10px 20px calc(20px + env(safe-area-inset-bottom))",
  backgroundColor: colors.surface,
  boxShadow: "0 4px 11.9px rgba(0, 0, 0, 0.25)",
});

export const status = style({
  padding: "40px 20px",
  color: colors.muted,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  textAlign: "center",
});
