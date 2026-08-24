import { recipe } from "@vanilla-extract/recipes";

import { palette } from "@/styles/palette";

import { vars } from "@/styles/theme.css";

export const dropdown = recipe({
  base: {
    boxShadow: `0px 2px 4px ${vars.color.overlay.scrim25}`,
    borderRadius: 5,
    marginBlock: 5,
  },
  variants: {
    size: {
      sm: {},
      md: {},
    },
  },
});

export const item = recipe({
  base: {
    selectors: {
      [`${dropdown.classNames.variants.size.sm} &`]: {
        minWidth: 65,
      },
      [`${dropdown.classNames.variants.size.md} &`]: {
        minWidth: 79,
      },
    },
    ":first-child": {
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      boxShadow: `inset 0px -0.5px ${palette.neutral3}`,
    },
    ":last-child": {
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
    },
    cursor: "pointer",
    lineHeight: "28.7px",
    letterSpacing: -0.4,
    backgroundColor: vars.color.surface.default,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  variants: {
    selected: {
      true: {
        color: vars.color.text.primary,
      },
      false: {
        color: vars.color.text.disabled,
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});
