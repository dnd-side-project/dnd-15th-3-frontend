import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  roundedBackground: "#ECEFF5",
  pillBackground: "#FDFDFF",
  pillBorder: "#E7E7E7",
  placeholder: "#888888",
};

export const wrapper = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    boxSizing: "border-box",
    fontFamily: vars.font.body,
    color: colors.placeholder,
  },
  variants: {
    shape: {
      rounded: {
        height: 54,
        padding: "0 14px",
        borderRadius: 8,
        backgroundColor: colors.roundedBackground,
        fontSize: 16,
      },
      pill: {
        height: 50,
        padding: "0 18px",
        border: `1px solid ${colors.pillBorder}`,
        borderRadius: vars.radius.full,
        backgroundColor: colors.pillBackground,
        fontSize: 14,
      },
    },
  },
  defaultVariants: {
    shape: "rounded",
  },
});

export const input = style({
  flex: 1,
  minWidth: 0,
  padding: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  fontFamily: "inherit",
  fontSize: "inherit",
  color: vars.color.text,

  "::placeholder": {
    color: colors.placeholder,
  },
});

export const adornment = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
});
