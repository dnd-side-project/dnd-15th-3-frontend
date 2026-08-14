import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

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
    backgroundColor: "#FFFFFF",
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
        boxShadow: "0px 4px 70px rgba(0, 0, 0, 0.2)",
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
  backgroundColor: "#D1D1D1",
});

export const container = style({
  margin: "0 auto",
});
export const backdrop = style({
  backgroundColor: "rgba(0,0,0,0.25)",
});
export const content = style({
  backgroundColor: "#FFFFFF",
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
