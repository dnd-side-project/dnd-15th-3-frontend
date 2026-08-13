import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
export const container = style({
  display: "flex",
  columnGap: 5,
});
export const step = recipe({
  base: {
    height: 4,
    backgroundColor: "#DAE1EC",
    borderRadius: 96,
    transition: "all 300ms ease-out",
  },
  variants: {
    isCurrent: {
      true: {
        width: 19,
        backgroundColor: "#66ADFF",
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
