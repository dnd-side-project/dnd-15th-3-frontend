import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { palette } from "@/styles/palette";
import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const surfaceColor = vars.color.surface.default;

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  background: surfaceColor,
});

export const intro = style({
  marginTop: 30,
});

export const editButton = recipe({
  base: {
    position: "absolute",
    top: -3,
    right: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 29,
    height: 30,
    padding: 0,
    border: "none",
    borderRadius: 16,
    backgroundColor: palette.neutral9Alpha14,
    cursor: "pointer",
  },
  variants: {
    editing: {
      true: { color: vars.color.brand.primary },
      false: { color: palette.neutral12 },
    },
  },
  defaultVariants: {
    editing: false,
  },
});

export const picker = style({
  marginTop: 37,
});

export const status = style({
  padding: "40px 20px",
  color: palette.neutral12,
  ...text({ size: 16, weight: 500, lineHeight: 1.5 }),
  textAlign: "center",
});
