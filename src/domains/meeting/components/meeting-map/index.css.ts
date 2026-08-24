import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const root = recipe({
  base: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#E9EEF5",
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
  color: "#707D91",
  ...text({ size: 16, weight: 500 }),
  pointerEvents: "none",
});

export const originMarker = style({
  display: "block",
  width: 60,
  height: 62,
});

export const currentDot = style({
  // 인라인이면 지름이 먹지 않는다.
  display: "block",
  width: 18,
  height: 18,
  border: "3px solid #FFFFFF",
  borderRadius: vars.radius.full,
  backgroundColor: "#3793FF",
  boxShadow: `0 0 0 6px ${"rgba(55, 147, 255, 0.25)"}`,
});
