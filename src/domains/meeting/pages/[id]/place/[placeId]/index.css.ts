import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "../../../../../../styles/text";

import { vars } from "../../../../../../styles/theme.css";

export const sheetLayout = style({
  display: "flex",
  flexDirection: "column",
  gap: 7,
  overflowY: "auto",
});

globalStyle(`${sheetLayout} > *`, {
  flexShrink: 0,
});

export const header = style({
  display: "grid",
  gridTemplateColumns: "24px 1fr 24px",
  alignItems: "center",
  height: 49,
  padding: "10px 20px",
  borderBottom: "1px solid #E5E5E5",
  backgroundColor: "rgba(255, 255, 255, 0.93)",
});

export const backButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  padding: 0,
  border: "none",
  background: "none",
  color: "#606060",
  cursor: "pointer",
});

export const headerTitle = style({
  color: "#262626",
  ...text({ size: 18, weight: 600, lineHeight: 1.6 }),
  textAlign: "center",
});

export const photos = style({
  display: "flex",
  gap: 12,
  padding: "0 20px 20px",
  overflowX: "auto",
  scrollPadding: "0 20px",
  scrollSnapType: "x mandatory",
});

export const photo = style({
  flex: "0 0 100%",
  height: 213,
  borderRadius: 10,
  backgroundColor: "#ECEFF5",
  objectFit: "cover",
  scrollSnapAlign: "start",
});

export const summary = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  height: 51,
  padding: "0 20px",
});

export const summaryTexts = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 8,
  minWidth: 0,
});

export const name = style({
  display: "flex",
  alignItems: "center",
  gap: 7,
  margin: "0 3px",
  color: "#262626",
  ...text({ size: 20, weight: 600, lineHeight: 1.2 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const address = style({
  display: "flex",
  gap: 0,
  margin: "0 3px",
  color: "#7D7D7D",
  ...text({ size: 16, weight: 500, lineHeight: 1.2 }),
});

export const addressLabel = style({
  flexShrink: 0,
  width: 54,
});

export const addressValue = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const addButton = recipe({
  base: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    border: "none",
    borderRadius: vars.radius.full,
    cursor: "pointer",
  },
  variants: {
    saved: {
      true: { backgroundColor: "#3793FF", color: "#FFFFFF", cursor: "default" },
      false: { backgroundColor: "#ECEFF5", color: "#A4B1C5" },
    },
  },
});

export const similar = style({
  display: "flex",
  flexDirection: "column",
  marginTop: 25,
});

export const similarTitle = style({
  margin: "0 0 4px 20px",
  color: "#262626",
  ...text({ size: 18, weight: 600, lineHeight: 1.4 }),
});

export const similarPlace = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: "17px 20px",
  "::after": {
    content: "",
    position: "absolute",
    right: 20,
    bottom: 0,
    left: 20,
    height: 1,
    backgroundColor: "#DAE1EC",
  },
});

export const similarOpen = style({
  display: "flex",
  flex: 1,
  alignItems: "center",
  gap: 14,
  minWidth: 0,
  padding: 0,
  border: "none",
  background: "none",
  textAlign: "left",
  cursor: "pointer",
});

export const similarThumbnail = style({
  flexShrink: 0,
  width: 96,
  height: 71,
  borderRadius: 5,
  backgroundColor: "#ECEFF5",
  objectFit: "cover",
});

export const similarTexts = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 6,
  minWidth: 0,
});

export const similarName = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "#262626",
  ...text({ size: 18, weight: 600, lineHeight: 1.4 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const similarAddress = style({
  color: "#707D91",
  ...text({ size: 16, weight: 500, lineHeight: 1.4 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const similarAddButton = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: "#ECEFF5",
  color: "#A4B1C5",
  cursor: "pointer",
});

export const refresh = style({
  display: "inline-flex",
  alignSelf: "center",
  alignItems: "center",
  gap: 6,
  height: 32,
  margin: "28px 0 calc(38px + env(safe-area-inset-bottom))",
  padding: "0 14px",
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: "#F1F8FF",
  color: "#3793FF",
  ...text({ size: 14, weight: 500, lineHeight: 1.2 }),
  cursor: "pointer",
});

export const externalLink = style({
  display: "inline-flex",
  alignSelf: "flex-start",
  alignItems: "center",
  gap: 6,
  height: 28,
  margin: "10px 0 0 20px",
  padding: "0 6px",
  borderRadius: 5,
  backgroundColor: "#F2F3F7",
  color: "#7D7D7D",
  ...text({ size: 14, weight: 400, lineHeight: 1.2 }),
  textDecoration: "none",
});

export const externalLogo = style({
  width: 20,
  height: 20,
});

export const status = style({
  padding: "24px 20px calc(30px + env(safe-area-inset-bottom))",
  color: "#7D7D7D",
  ...text({ size: 16, weight: 500 }),
  textAlign: "center",
});
