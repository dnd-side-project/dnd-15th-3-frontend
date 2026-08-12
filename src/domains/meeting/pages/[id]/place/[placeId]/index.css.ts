import { style } from "@vanilla-extract/css";

import { text } from "../../../../../../styles/text";

import { vars } from "../../../../../../styles/theme.css";

const colors = {
  sheet: "#FFFFFF",
  headerBackground: "rgba(255, 255, 255, 0.93)",
  title: "#262626",
  address: "#7D7D7D",
  addBackground: "#ECEFF5",
  addIcon: "#A4B1C5",
  linkBackground: "#F2F3F7",
  icon: "#606060",
  photo: "#ECEFF5",
};

export const sheet = style({
  pointerEvents: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 7,
  borderRadius: "24px 24px 0 0",
  backgroundColor: colors.sheet,
  boxShadow: "0 4px 70px rgba(0, 0, 0, 0.2)",
});

export const header = style({
  display: "grid",
  gridTemplateColumns: "24px 1fr 24px",
  alignItems: "center",
  height: 49,
  padding: "10px 20px",
  backgroundColor: colors.headerBackground,
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
  color: colors.icon,
  cursor: "pointer",
});

export const headerTitle = style({
  color: colors.title,
  ...text({ size: 18, weight: 600, lineHeight: 1.6 }),
  textAlign: "center",
});

export const photos = style({
  display: "flex",
  gap: 12,
  padding: "0 20px 20px",
  overflowX: "auto",
  scrollSnapType: "x mandatory",
});

export const photo = style({
  flex: "0 0 100%",
  height: 213,
  borderRadius: 10,
  backgroundColor: colors.photo,
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
  color: colors.title,
  ...text({ size: 20, weight: 600, lineHeight: 1.2 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const address = style({
  display: "flex",
  gap: 0,
  margin: "0 3px",
  color: colors.address,
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

export const addButton = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 44,
  height: 44,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: colors.addBackground,
  color: colors.addIcon,
  cursor: "pointer",
});

export const externalLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 28,
  margin: "10px 0 calc(30px + env(safe-area-inset-bottom)) 20px",
  padding: "0 6px",
  borderRadius: 5,
  backgroundColor: colors.linkBackground,
  color: colors.address,
  ...text({ size: 14, weight: 400, lineHeight: 1.2 }),
  textDecoration: "none",
});

export const externalLogo = style({
  width: 20,
  height: 20,
});

export const status = style({
  padding: "24px 20px calc(30px + env(safe-area-inset-bottom))",
  color: colors.address,
  ...text({ size: 16, weight: 500 }),
  textAlign: "center",
});
