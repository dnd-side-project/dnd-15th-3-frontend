import { style } from "@vanilla-extract/css";

import { vars } from "../../../../styles/theme.css";

const colors = {
  fallback: "#E9EEF5",
  muted: "#707D91",
  current: "#3793FF",
  currentHalo: "rgba(55, 147, 255, 0.25)",
};

export const root = style({
  position: "absolute",
  inset: 0,
  backgroundColor: colors.fallback,
});

export const map = style({
  width: "100%",
  height: "100%",
});

export const notice = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: colors.muted,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  pointerEvents: "none",
});

export const currentDot = style({
  width: 18,
  height: 18,
  border: "3px solid #FFFFFF",
  borderRadius: vars.radius.full,
  backgroundColor: colors.current,
  boxShadow: `0 0 0 6px ${colors.currentHalo}`,
});
