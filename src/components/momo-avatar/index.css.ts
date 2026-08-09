import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const root = recipe({
  base: {
    display: "block",
    flexShrink: 0,
    padding: 0,
    border: "none",
    background: "none",
  },
  variants: {
    size: {
      large: { width: 133, height: 133 },
      medium: { width: 110, height: 110 },
      small: { width: 70, height: 70 },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const image = style({
  display: "block",
  width: "100%",
  height: "100%",
});
