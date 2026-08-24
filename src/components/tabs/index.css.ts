import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

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
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 45,
  padding: "4px 5px",
  borderRadius: vars.radius.full,
  backgroundColor: colors.track,
});

export const indicator = style({
  position: "absolute",
  top: "var(--active-tab-top)",
  left: "var(--active-tab-left)",
  width: "var(--active-tab-width)",
  height: "var(--active-tab-height)",
  borderRadius: vars.radius.full,
  backgroundColor: colors.activeBackground,
  transition: "left 0.2s ease, width 0.2s ease",
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

export const tab = recipe({
  base: {
    position: "relative",
    zIndex: 1,
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
    transition: "color 0.15s ease",
    "@media": {
      "(prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },
  variants: {
    active: {
      true: { color: colors.activeLabel },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});
