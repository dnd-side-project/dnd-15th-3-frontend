import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { palette } from "@/styles/palette";

import { vars } from "@/styles/theme.css";

export const bottomSheet = style({
  maxWidth: "393px",
  margin: "0 auto",
});
export const header = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 393,
    height: 25,
    backgroundColor: vars.color.surface.default,
  },
  variants: {
    topBorderRadius: {
      sm: {
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
      },
      md: { borderTopRightRadius: 24, borderTopLeftRadius: 24 },
    },
    shadow: {
      true: {
        boxShadow: `0px 4px 70px ${vars.color.overlay.scrim20}`,
      },
      false: {},
    },
  },
  defaultVariants: {
    topBorderRadius: "md",
    shadow: false,
  },
});

export const dragIndicator = style({
  width: 50,
  height: 5,
  borderRadius: 10,
  backgroundColor: palette.neutral7,
});

export const container = style({
  margin: "0 auto",
});
export const backdrop = style({
  backgroundColor: vars.color.overlay.scrim25,
});
export const content = style({
  backgroundColor: vars.color.surface.default,
});

export const viewStack = style({
  position: "relative",
  overflow: "hidden",
});

export const viewLayer = recipe({
  base: {
    position: "absolute",
    inset: 0,
    overflow: "auto",
    visibility: "hidden",
    opacity: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  variants: {
    active: {
      true: {
        visibility: "visible",
        opacity: 1,
        pointerEvents: "auto",
        zIndex: 1,
      },
    },
  },
});
