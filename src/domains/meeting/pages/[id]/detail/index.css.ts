import { style } from "@vanilla-extract/css";

import { palette } from "@/styles/palette";
import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

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
  backgroundColor: vars.color.brand.surfaceAlt,
});

export const planTitle = style({
  margin: 0,
  color: vars.color.brand.primary,
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
  backgroundColor: palette.white5Alpha90,
  boxShadow: `0 0 4px ${palette.black8Alpha15}`,
  color: vars.color.text.secondary,
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
  color: vars.color.text.primary,
  ...text({ size: 20, weight: 600, lineHeight: 1.4 }),
});

export const courseCount = style({
  color: vars.color.text.secondaryAlt,
  ...text({ size: 14, weight: 500, lineHeight: 1.4 }),
});

export const status = style({
  padding: "24px 20px",
  color: vars.color.text.secondaryAlt,
  ...text({ size: 16, weight: 500 }),
  textAlign: "center",
});
