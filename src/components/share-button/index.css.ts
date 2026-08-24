import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";

const colors = {
  background: vars.color.surface.muted,
  icon: vars.color.text.tertiary,
  kakaoBackground: vars.color.external.kakaoYellow,
  kakaoIcon: vars.color.text.strong,
};

export const group = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 14,
});

export const iconButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 62,
    height: 59,
    border: "none",
    borderRadius: vars.radius.full,
    cursor: "pointer",
    selectors: {
      "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    },
  },
  variants: {
    tone: {
      link: {
        backgroundColor: colors.background,
        color: colors.icon,
      },
      kakao: {
        backgroundColor: colors.kakaoBackground,
        color: colors.kakaoIcon,
      },
      more: {
        backgroundColor: colors.background,
        color: colors.icon,
      },
    },
  },
});
