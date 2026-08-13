import { style } from "@vanilla-extract/css";

import { text } from "../../../../../styles/text";

import { vars } from "../../../../../styles/theme.css";

const colors = {
  pillBackground: "#3D4A5C",
  pillText: "#FFFFFF",
  divider: "#DAE1EC",
  placeName: "#262626",
  placeAddress: "#707D91",
  addBackground: "#ECEFF5",
  addIcon: "#A4B1C5",
  noticeIcon: "#E0E0E0",
  noticeTitle: "#000000",
  noticeDescription: "#6D6D6D",
};

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
  ...text({ size: 18, weight: 600, lineHeight: 1.4 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const resultAddress = style({
  color: colors.placeAddress,
  ...text({ size: 16, weight: 500, lineHeight: 1.4 }),
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

export const notice = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "41px 62px 45px",
  textAlign: "center",
});

export const noticeIcon = style({
  marginBottom: 18,
  color: colors.noticeIcon,
});

export const noticeTitle = style({
  alignSelf: "stretch",
  margin: 0,
  color: colors.noticeTitle,
  ...text({ size: 20, weight: 600, lineHeight: "30px" }),
});

export const noticeDescription = style({
  alignSelf: "stretch",
  margin: "1px 0 0",
  color: colors.noticeDescription,
  ...text({ size: 14, weight: 500, lineHeight: "21px" }),
});

export const sheetBottom = style({
  height: "calc(35px + env(safe-area-inset-bottom))",
});
