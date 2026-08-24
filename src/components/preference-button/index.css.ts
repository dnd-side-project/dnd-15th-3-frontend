import { recipe } from "@vanilla-extract/recipes";

import { palette } from "@/styles/palette";
import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

const colors = {
  like: vars.color.status.like,
  dislike: vars.color.status.dislike,
  overlayBackground: palette.gray5Alpha34,
  mutedBackground: vars.color.surface.muted,
  mutedForeground: vars.color.text.tertiary,
  foreground: vars.color.text.inverse,
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
    ...text({ size: 12, weight: 500, lineHeight: "14.25px" }),
    color: colors.foreground,
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease",
    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.5,
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
