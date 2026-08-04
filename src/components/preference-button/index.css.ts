import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  like: "#66ADFF",
  dislike: "#FF46CE",
  inactiveBackground: "rgba(255, 255, 255, 0.3)",
  foreground: "#FFFFFF",
};

export const preferenceButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minHeight: 25,
    padding: "0 8px",
    border: "none",
    borderRadius: vars.radius.full,
    fontFamily: vars.font.body,
    fontSize: 12,
    fontWeight: vars.fontWeight.medium,
    lineHeight: 1.4,
    color: colors.foreground,
    cursor: "pointer",
    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.6,
      },
    },
  },
  variants: {
    type: {
      like: {},
      dislike: {},
    },
    selected: {
      true: {},
      false: { backgroundColor: colors.inactiveBackground },
    },
  },
  compoundVariants: [
    {
      variants: { type: "like", selected: true },
      style: { backgroundColor: colors.like },
    },
    {
      variants: { type: "dislike", selected: true },
      style: { backgroundColor: colors.dislike },
    },
  ],
  defaultVariants: {
    type: "like",
    selected: false,
  },
});
