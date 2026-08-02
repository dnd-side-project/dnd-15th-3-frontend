import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

// Figma 와이어프레임 기준 로컬 컬러값 (공용 theme 토큰 미확정으로 로컬에 둠)
const colors = {
  like: "#5CA7FF",
  dislike: "#FF46CE",
  inactiveBackground: "#CCCDCE",
  inactiveForeground: "#ffffff",
  activeForeground: "#ffffff",
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
      false: {
        backgroundColor: colors.inactiveBackground,
        color: colors.inactiveForeground,
      },
    },
  },
  compoundVariants: [
    {
      variants: { type: "like", selected: true },
      style: {
        backgroundColor: colors.like,
        color: colors.activeForeground,
      },
    },
    {
      variants: { type: "dislike", selected: true },
      style: {
        backgroundColor: colors.dislike,
        color: colors.activeForeground,
      },
    },
  ],
  defaultVariants: {
    type: "like",
    selected: false,
  },
});
