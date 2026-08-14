import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "../../styles/text";

import { vars } from "../../styles/theme.css";

const colors = {
  track: "rgba(255, 255, 255, 0.81)",
  label: "#B0B0B0",
  activeBackground: "#3793FF",
  activeLabel: "#FFFFFF",
};

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const list = style({
  display: "flex",
  alignItems: "center",
  height: 45,
  padding: "4px 5px",
  borderRadius: vars.radius.full,
  backgroundColor: colors.track,
});

export const tab = recipe({
  base: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    border: "none",
    borderRadius: vars.radius.full,
    backgroundColor: "transparent",
    color: colors.label,
    ...text({ size: 15, weight: 600, lineHeight: 1.2 }),
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease",
    "@media": {
      "(prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: colors.activeBackground,
        color: colors.activeLabel,
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});
