import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { palette } from "@/styles/palette";

import { vars } from "@/styles/theme.css";

const colors = {
  background: vars.color.surface.muted,
  focusedBackground: vars.color.surface.mutedStrong,
  pillBackground: vars.color.surface.default,
  pillBorder: palette.neutral2,
  mutedForeground: vars.color.text.secondary,
  focusedSendBackground: vars.color.brand.focusSurface,
  focusedSendForeground: vars.color.brand.badge,
};

const motion = {
  transition: "background-color 0.15s ease, color 0.15s ease",
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
} as const;

export const field = style({});

export const wrapper = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    fontFamily: vars.font.body,
    fontWeight: 500,
    color: colors.mutedForeground,
    ...motion,
  },
  variants: {
    shape: {
      rounded: {
        height: 54,
        padding: "0 13px",
        borderRadius: 8,
        backgroundColor: colors.background,
        fontSize: 16,
        lineHeight: 1.2,
        selectors: {
          "&:focus-within": { backgroundColor: colors.focusedBackground },
        },
      },
      pill: {
        height: 50,
        padding: "0 10px 0 20px",
        border: `1px solid ${colors.pillBorder}`,
        borderRadius: vars.radius.full,
        backgroundColor: colors.pillBackground,
        fontSize: 14,
        lineHeight: 1.2,
        selectors: {
          "&:focus-within": { backgroundColor: colors.background },
        },
      },
    },
  },
  defaultVariants: {
    shape: "rounded",
  },
});

export const input = style({
  flex: 1,
  minWidth: 0,
  padding: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
  lineHeight: "inherit",
  color: vars.color.text.primary,

  "::placeholder": {
    color: colors.mutedForeground,
  },
});

export const adornment = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
});

export const charCounter = style({
  fontWeight: 400,
});

export const sendButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 42,
  height: 36,
  padding: 0,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: colors.focusedBackground,
  color: colors.mutedForeground,
  cursor: "pointer",
  outline: "none",
  ...motion,
  selectors: {
    [`${field}:focus-within &`]: {
      backgroundColor: colors.focusedSendBackground,
      color: colors.focusedSendForeground,
    },
    // 키보드로 버튼에 직접 닿았을 때.
    "&:focus-visible": {
      outline: `2px solid ${colors.focusedSendForeground}`,
      outlineOffset: 2,
    },
  },
});
