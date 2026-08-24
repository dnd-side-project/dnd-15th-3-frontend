import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { palette } from "@/styles/palette";
import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const root = recipe({
  base: {
    position: "absolute",
    inset: 0,
    backgroundColor: vars.color.surface.muted,
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
  color: vars.color.text.secondary,
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
  border: `3px solid ${vars.color.surface.default}`,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.brand.primary,
  boxShadow: `0 0 0 6px ${palette.blue24Alpha25}`,
});
