import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/theme.css";

export const wrapper = style({
  position: "relative",
  width: "100%",
  height: "100%",
});

export const map = style({
  width: "100%",
  height: "100%",
});

export const overlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  color: vars.color.muted,
  backgroundColor: vars.color.background,
  pointerEvents: "none",
});
