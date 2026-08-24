import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";

export const greeting = recipe({
  base: {
    margin: 0,
    fontFamily: vars.font.body,
  },
  variants: {
    tone: {
      normal: { color: vars.color.text },
      primary: { color: vars.color.primary },
    },
    size: {
      md: { fontSize: vars.fontSize.md },
      lg: { fontSize: vars.fontSize.lg, fontWeight: vars.fontWeight.bold },
    },
  },
  defaultVariants: {
    tone: "normal",
    size: "md",
  },
});
