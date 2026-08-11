import { style } from "@vanilla-extract/css";

import { vars } from "../../../../../styles/theme.css";

const colors = {
  pillBackground: "#3D4A5C",
  pillText: "#FFFFFF",
  sheet: "#FFFFFF",
  divider: "#DAE1EC",
  placeName: "#262626",
  placeAddress: "#707D91",
  addBackground: "#ECEFF5",
  addIcon: "#A4B1C5",
};

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflow: "hidden",
});

export const toggle = style({
  position: "absolute",
  top: 20,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1,
});

export const chips = style({
  position: "absolute",
  top: 81,
  left: 0,
  right: 0,
  zIndex: 1,
  padding: "0 15px",
});

// 시트 높이가 화면마다 달라, 지도 위 버튼이 시트를 따라 올라오도록 함께 묶는다.
export const bottomStack = style({
  position: "absolute",
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  // 버튼과 시트를 뺀 영역은 지도가 받아야 한다.
  pointerEvents: "none",
});

export const bottomActions = style({
  pointerEvents: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 7,
  alignItems: "flex-start",
  alignSelf: "flex-start",
  marginLeft: 20,
});

export const meetingPill = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  height: 35,
  padding: "0 7px",
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: colors.pillBackground,
  boxShadow: "0 0 6px rgba(0, 0, 0, 0.25)",
  color: colors.pillText,
  fontFamily: vars.font.body,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: "22px",
  cursor: "pointer",
});

export const pillIcon = style({
  flexShrink: 0,
  width: 23,
  height: 23,
});

export const sheet = style({
  pointerEvents: "auto",
  borderRadius: "24px 24px 0 0",
  backgroundColor: colors.sheet,
  boxShadow: "0 4px 70px rgba(0, 0, 0, 0.2)",
});

export const grabber = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
});

export const grabberBar = style({
  width: 50,
  height: 5,
  borderRadius: 10,
  backgroundColor: "#D1D1D1",
});

export const search = style({
  padding: "11px 20px 0",
});

export const results = style({
  display: "flex",
  flexDirection: "column",
  maxHeight: 320,
  marginTop: 16,
  overflowY: "auto",
});

export const result = style({
  display: "flex",
  alignItems: "center",
  gap: 14,
  width: "100%",
  padding: "17px 20px",
  border: "none",
  borderTop: `1px solid ${colors.divider}`,
  background: "none",
  textAlign: "left",
  cursor: "pointer",
});

export const thumbnail = style({
  flexShrink: 0,
  width: 96,
  height: 71,
  borderRadius: 5,
  backgroundColor: colors.addBackground,
  objectFit: "cover",
});

export const resultTexts = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 6,
  minWidth: 0,
});

export const resultName = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: colors.placeName,
  fontFamily: vars.font.body,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1.4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const resultAddress = style({
  color: colors.placeAddress,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const addButton = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: colors.addBackground,
  color: colors.addIcon,
  cursor: "pointer",
});

export const empty = style({
  padding: "24px 20px 32px",
  color: colors.placeAddress,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  textAlign: "center",
});

export const sheetBottom = style({
  height: "calc(35px + env(safe-area-inset-bottom))",
});
