import { style } from "@vanilla-extract/css";

import { text } from "../../../../../styles/text";

import { vars } from "../../../../../styles/theme.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  paddingBottom: "calc(30px + env(safe-area-inset-bottom))",
});

export const plan = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "20px 20px 26px",
  backgroundColor: "#EEF6FF",
});

export const planTitle = style({
  margin: 0,
  color: "#3793FF",
  ...text({ size: 18, weight: 600, lineHeight: 1.4 }),
});

export const map = style({
  position: "relative",
  flexShrink: 0,
  height: 275,
  margin: "13px 20px 0",
  borderRadius: 12,
  overflow: "hidden",
});

export const expand = style({
  position: "absolute",
  zIndex: 1,
  top: 12,
  right: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.15)",
  color: "#707D91",
  cursor: "pointer",
});

export const course = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  margin: "28px 20px 26px",
});

export const courseTitle = style({
  margin: 0,
  color: "#262626",
  ...text({ size: 20, weight: 600, lineHeight: 1.4 }),
});

export const courseCount = style({
  color: "#7D7D7D",
  ...text({ size: 14, weight: 500, lineHeight: 1.4 }),
});

export const status = style({
  padding: "24px 20px",
  color: "#7D7D7D",
  ...text({ size: 16, weight: 500 }),
  textAlign: "center",
});
