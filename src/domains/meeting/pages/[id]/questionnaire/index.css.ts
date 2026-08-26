import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const surfaceColor = vars.color.surface.default;

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  background: surfaceColor,
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "16px 20px 0",
  overflowY: "auto",
});

export const progress = style({
  display: "inline-flex",
  width: "fit-content",
  padding: "4px 10px",
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.surface.app,
  ...text({ size: 13, weight: 700 }),
});

export const progressCurrent = style({
  color: vars.color.brand.strong,
});

export const progressTotal = style({
  color: vars.color.text.tertiary,
});

export const question = style({
  margin: "12px 0 0",
  color: vars.color.text.strong,
  ...text({ size: 20, weight: 700, lineHeight: 1.4 }),
});

export const optionList = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  marginTop: 24,
});

export const option = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "16px 18px",
    border: "none",
    borderRadius: 12,
    backgroundColor: vars.color.surface.app,
    color: vars.color.text.primary,
    textAlign: "left",
    cursor: "pointer",
    ...text({ size: 16, weight: 500 }),
    transition: "background-color 0.15s ease, color 0.15s ease",
    "@media": {
      "(prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },
  variants: {
    selected: {
      true: {
        backgroundColor: vars.color.brand.surface,
        color: vars.color.brand.primary,
        fontWeight: 700,
      },
      false: {},
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export const optionEmoji = style({
  flexShrink: 0,
  fontSize: 20,
  lineHeight: 1,
});

export const placeholder = style({
  margin: "40px 0 0",
  color: vars.color.text.description,
  textAlign: "center",
  ...text({ size: 15, weight: 500, lineHeight: 1.5 }),
});

export const retry = style({
  marginTop: 12,
  padding: 0,
  border: "none",
  background: "none",
  color: vars.color.brand.primary,
  cursor: "pointer",
  ...text({ size: 15, weight: 700 }),
});

export const footer = style({
  display: "flex",
  padding: "10px 20px calc(21px + env(safe-area-inset-bottom))",
});
