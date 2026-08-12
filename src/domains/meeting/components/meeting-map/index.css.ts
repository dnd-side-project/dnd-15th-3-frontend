import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "../../../../styles/text";

import { vars } from "../../../../styles/theme.css";

const colors = {
  fallback: "#E9EEF5",
  muted: "#707D91",
  current: "#3793FF",
  currentHalo: "rgba(55, 147, 255, 0.25)",
};

export const root = recipe({
  base: {
    position: "absolute",
    inset: 0,
    backgroundColor: colors.fallback,
  },
  variants: {
    interactive: {
      false: { pointerEvents: "none" },
    },
  },
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
  ...text({ size: 16, weight: 500 }),
  pointerEvents: "none",
});

export const originMarker = style({
  display: "block",
  width: 60,
  height: 62,
});

export const currentDot = style({
  width: 18,
  height: 18,
  border: "3px solid #FFFFFF",
  borderRadius: vars.radius.full,
  backgroundColor: colors.current,
  boxShadow: `0 0 0 6px ${colors.currentHalo}`,
});
