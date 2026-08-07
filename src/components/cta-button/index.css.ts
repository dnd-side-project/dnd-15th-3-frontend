import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  primary: "#66ADFF",
  secondaryBackground: "#DAE1EC",
  secondaryText: "#707D91",
  white: "#FFFFFF",
};

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
    fontFamily: vars.font.body,
    fontSize: 18,
    fontWeight: 600,
    cursor: "pointer",
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
