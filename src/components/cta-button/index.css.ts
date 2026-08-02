import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const colors = {
  primary: "#57a5ff",
  primaryPressed: "#eaf2ff",
  primaryPressedText: "#3182f6",
  secondaryBackground: "#f2f3f5",
  secondaryText: "#4e5257",
  white: "#ffffff",
};

export const button = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: "1 1 0%",
    height: "52px",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: colors.primary,
        color: colors.white,
        selectors: {
          "&:active": {
            backgroundColor: colors.primaryPressed,
            color: colors.primaryPressedText,
          },
        },
      },
      secondary: {
        backgroundColor: colors.secondaryBackground,
        color: colors.secondaryText,
      },
    },
    disabled: {
      true: {
        backgroundColor: colors.secondaryBackground,
        color: colors.secondaryText,
        cursor: "not-allowed",
      },
      false: {},
    },
    fixedWidth: {
      true: { flex: "0 0 88px" },
      false: {},
    },
  },
  defaultVariants: {
    variant: "primary",
    disabled: false,
    fixedWidth: false,
  },
});

export const row = style({
  display: "flex",
  gap: "8px",
  width: "100%",
});
