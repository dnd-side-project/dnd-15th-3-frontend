import { style } from "@vanilla-extract/css";

import { text } from "../../../../../styles/text";

import { vars } from "../../../../../styles/theme.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  backgroundColor: "#FFFFFF",
});

export const selected = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: "20px 0",
  backgroundColor: "#EEF6FF",
});

export const selectedTitle = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  margin: "0 20px",
  color: "#3793FF",
  ...text({ size: 16, weight: 600, lineHeight: 1.4 }),
});

export const summary = style({
  display: "flex",
  gap: 6,
  margin: "0 20px 14px",
  color: "#707D91",
  ...text({ size: 13, weight: 500, lineHeight: 1.4 }),
});

export const saved = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "24px 0 0",
});

export const savedTitle = style({
  margin: "0 20px",
  color: "#262626",
  ...text({ size: 18, weight: 600, lineHeight: 1.4 }),
});

export const chips = style({
  padding: "0 20px",
});

export const savedList = style({
  display: "flex",
  flexDirection: "column",
});

export const savedPlace = style({
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: "14px 20px",
  border: "none",
  borderTop: "1px solid #ECEFF5",
  background: "none",
  textAlign: "left",
  cursor: "pointer",
});

export const thumbnail = style({
  flexShrink: 0,
  width: 60,
  height: 60,
  borderRadius: 8,
  backgroundColor: "#ECEFF5",
  objectFit: "cover",
});

export const savedTexts = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 4,
  minWidth: 0,
});

export const name = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  color: "#262626",
  ...text({ size: 16, weight: 600, lineHeight: 1.4 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const texts = style({
  color: "#7D7D7D",
  ...text({ size: 13, weight: 500, lineHeight: 1.4 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const preferences = style({
  display: "flex",
  flexShrink: 0,
  gap: 6,
});

export const preference = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  height: 24,
  padding: "0 8px",
  borderRadius: vars.radius.full,
  backgroundColor: "#F2F4F8",
  color: "#A4B1C5",
});

export const count = style({
  color: "#707D91",
  ...text({ size: 12, weight: 500, lineHeight: 1.2 }),
});

export const footer = style({
  display: "flex",
  marginTop: "auto",
  padding: "10px 20px calc(21px + env(safe-area-inset-bottom))",
});

export const status = style({
  padding: "24px 20px",
  color: "#7D7D7D",
  ...text({ size: 16, weight: 500 }),
  textAlign: "center",
});
