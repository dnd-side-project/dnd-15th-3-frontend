import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const selected = style({
  minHeight: 83,
  padding: "0 20px",
});

export const empty = style({
  margin: 0,
  paddingTop: 43,
  color: vars.color.text.tertiary,
  ...text({ size: 14, weight: 400, lineHeight: "20px" }),
  textAlign: "center",
  whiteSpace: "pre-line",
});

export const available = recipe({
  base: {
    padding: "0 20px",
  },
  variants: {
    gap: {
      wide: { marginTop: 71 },
      narrow: { marginTop: 49 },
    },
  },
  defaultVariants: {
    gap: "wide",
  },
});
