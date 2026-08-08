import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  like: "#66ADFF",
  dislike: "#FF46A9",
  overlayBackground: "rgba(242, 243, 247, 0.34)",
  mutedBackground: "#ECEFF5",
  mutedForeground: "#A4B1C5",
  foreground: "#FFFFFF",
};

export const preferenceButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minHeight: 25,
    padding: "0 9px",
    border: "none",
    borderRadius: vars.radius.full,
    fontFamily: vars.font.body,
    fontSize: 12.27,
    fontWeight: 500,
    lineHeight: "14.57px",
    color: colors.foreground,
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease",
    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.6,
      },
    },
    "@media": {
      "(prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },
  variants: {
    type: {
      like: {},
      dislike: {},
    },
    tone: {
      overlay: {},
      muted: {},
    },
    selected: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { tone: "overlay", selected: false },
      style: { backgroundColor: colors.overlayBackground },
    },
    {
      variants: { tone: "muted", selected: false },
      style: { backgroundColor: colors.mutedBackground, color: colors.mutedForeground },
    },
    {
      variants: { type: "like", selected: true },
      style: { backgroundColor: colors.like },
    },
    {
      variants: { type: "dislike", selected: true },
      style: { backgroundColor: colors.dislike },
    },
  ],
  defaultVariants: {
    type: "like",
    tone: "overlay",
    selected: false,
  },
});
