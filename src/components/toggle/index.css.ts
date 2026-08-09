import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  background: "rgba(242, 243, 247, 0.69)",
  icon: "rgba(75, 75, 75, 0.33)",
  selectedBackground: "#3793FF",
  selectedIcon: "#F2F3F7",
};

const PADDING = 5;
const GAP = 10;

export const root = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: GAP,
  width: 107,
  height: 46,
  padding: PADDING,
  borderRadius: vars.radius.full,
  backgroundColor: colors.background,
});

export const indicator = recipe({
  base: {
    position: "absolute",
    top: PADDING,
    bottom: PADDING,
    left: PADDING,
    width: `calc((100% - ${PADDING * 2 + GAP}px) / 2)`,
    borderRadius: vars.radius.full,
    backgroundColor: colors.selectedBackground,
    transition: "transform 0.2s ease",
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
  },
  variants: {
    value: {
      map: { transform: "translateX(0)" },
      list: { transform: `translateX(calc(100% + ${GAP}px))` },
    },
  },
  defaultVariants: {
    value: "map",
  },
});

export const item = recipe({
  base: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    alignSelf: "stretch",
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
    color: colors.icon,
    cursor: "pointer",
    transition: "color 0.15s ease",
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
  },
  variants: {
    selected: {
      true: { color: colors.selectedIcon },
      false: {},
    },
  },
  defaultVariants: {
    selected: false,
  },
});
