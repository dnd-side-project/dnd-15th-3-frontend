import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

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
  gap: 10.35,
  width: 107,
  height: 46,
  padding: 4.6,
  borderRadius: 50,
  backgroundColor: colors.background,
});

export const item = recipe({
  base: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 43.72,
    height: 36.82,
    padding: 0,
    border: "none",
    borderRadius: 50,
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
