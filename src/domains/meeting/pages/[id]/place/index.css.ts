import { style } from "@vanilla-extract/css";

import { vars } from "../../../../../styles/theme.css";

const colors = {
  pillBackground: "#3D4A5C",
  pillText: "#FFFFFF",
  sheet: "#FFFFFF",
  divider: "#ECEFF5",
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

export const bottomActions = style({
  position: "absolute",
  left: 20,
  bottom: 139,
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 7,
  alignItems: "flex-start",
});

export const meetingPill = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  height: 35,
  padding: "0 12px",
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

export const sheet = style({
  position: "absolute",
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
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
  gap: 16,
  width: "100%",
  padding: "13px 20px",
  border: "none",
  borderTop: `1px solid ${colors.divider}`,
  background: "none",
  textAlign: "left",
  cursor: "pointer",
});

export const thumbnail = style({
  flexShrink: 0,
  width: 96,
  height: 96,
  borderRadius: 8,
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
  width: 56,
  height: 56,
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
