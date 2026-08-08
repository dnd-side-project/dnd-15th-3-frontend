import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  background: "rgba(242, 243, 247, 0.69)",
  icon: "rgba(75, 75, 75, 0.33)",
  selectedBackground: "#3793FF",
  selectedIcon: "#F2F3F7",
};

export const root = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  gap: 10,
  width: 107,
  height: 46,
  padding: 5,
  borderRadius: vars.radius.full,
  backgroundColor: colors.background,
});

export const item = recipe({
  base: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    alignSelf: "stretch",
    padding: 0,
    border: "none",
    borderRadius: vars.radius.full,
    backgroundColor: "transparent",
    color: colors.icon,
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease",
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
  },
  variants: {
    selected: {
      true: {
        backgroundColor: colors.selectedBackground,
        color: colors.selectedIcon,
      },
      false: {},
    },
  },
  defaultVariants: {
    selected: false,
  },
});
