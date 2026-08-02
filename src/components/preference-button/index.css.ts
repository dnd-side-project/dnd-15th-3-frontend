import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  like: "#5CA7FF",
  dislike: "#FF46CE",
  inactiveBackground: "#CCCDCE",
  foreground: "#ffffff",
};

export const preferenceButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.xs,
    border: "none",
    borderRadius: vars.radius.full,
    padding: `${vars.space.xs} ${vars.space.sm}`,
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.sm,
    fontWeight: vars.fontWeight.medium,
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
