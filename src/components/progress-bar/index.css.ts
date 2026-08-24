import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";
export const container = style({
  display: "flex",
  columnGap: 5,
});
export const step = recipe({
  base: {
    height: 4,
    backgroundColor: vars.color.surface.mutedStrong,
    borderRadius: 96,
    transition: "all 300ms ease-out",
  },
  variants: {
    isCurrent: {
      true: {
        width: 19,
        backgroundColor: vars.color.brand.strong,
      },
      false: {
        width: 5,
      },
    },
  },
  defaultVariants: {
    isCurrent: false,
  },
});
