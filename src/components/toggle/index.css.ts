import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const trackBackground = "rgba(242, 243, 247, 0.69)";
const selectedBackground = "#3793FF";
const selectedIcon = "#F2F3F7";
const unselectedIcon = "rgba(75, 75, 75, 0.33)";

export const root = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  gap: 10.35,
  width: 107,
  height: 46,
  padding: 4.6,
  borderRadius: 50,
  backgroundColor: trackBackground,
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
    color: unselectedIcon,
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
        backgroundColor: selectedBackground,
        color: selectedIcon,
      },
      false: {},
    },
  },
  defaultVariants: {
    selected: false,
  },
});
