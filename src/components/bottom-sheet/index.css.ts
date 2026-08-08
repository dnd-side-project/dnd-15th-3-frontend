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
  },
  defaultVariants: {
    topBorderRadius: "md",
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
export const backdrop = {
  background: "none",
};
export const content = style({
  backgroundColor: "#FFFFFF",
});
