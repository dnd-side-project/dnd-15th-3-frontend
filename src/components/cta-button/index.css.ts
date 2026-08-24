import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

const colors = {
  primary: vars.color.brand.strong,
  secondaryBackground: vars.color.surface.mutedStrong,
  secondaryText: vars.color.text.secondary,
  icon: vars.color.text.tertiary,
  white: vars.color.surface.default,
};

export const buttonRoot = style({});
globalStyle(`${buttonRoot} svg`, {
  color: colors.icon,
});

export const button = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flex: "1 1 0%",
    width: "100%",
    height: 53,
    border: "none",
    borderRadius: 8,
    ...text({ size: 18, weight: 600, lineHeight: 1.6 }),
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease",
    "@media": {
      "(prefers-reduced-motion: reduce)": { transition: "none" },
    },
    selectors: {
      "&:disabled": {
        backgroundColor: colors.secondaryBackground,
        color: colors.secondaryText,
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: colors.primary,
        color: colors.white,
      },
      secondary: {
        backgroundColor: colors.secondaryBackground,
        color: colors.secondaryText,
      },
    },
    fixedWidth: {
      true: { flex: "0 0 80px" },
      false: {},
    },
  },
  defaultVariants: {
    variant: "primary",
    fixedWidth: false,
  },
});

export const row = style({
  display: "flex",
  gap: 12,
  width: "100%",
});
