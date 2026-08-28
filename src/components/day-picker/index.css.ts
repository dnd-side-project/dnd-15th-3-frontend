import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";
export const confirmButton = recipe({
  base: {
    borderStyle: "none",
    borderRadius: 8,
    textAlign: "center",
    paddingBlock: 12,
    fontSize: 18,
    width: "100%",
    height: 53,
    fontWeight: 600,
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: vars.color.brand.strong,
        color: vars.color.text.inverse,
        ":active": {
          filter: "brightness(0.8)",
        },
        cursor: "pointer",
      },
      secondary: {
        backgroundColor: vars.color.surface.mutedStrong,
        color: vars.color.text.secondary,
        cursor: "not-allowed",
      },
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});

export const confirmButtonWrapper = style({
  paddingBlock: 10,
  paddingInline: 20,
});

export const trigger = style({
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  columnGap: 15,
  flex: 1,
  height: 54,
  backgroundColor: vars.color.surface.muted,
  color: vars.color.text.secondary,
  border: 0,
  padding: "15px 13px",
  ...text({ size: 16, weight: 500 }),
  whiteSpace: "nowrap",
  cursor: "pointer",
});

export const calendar = style({
  paddingLeft: 7,
  overflowX: "auto",
});

export const selectedDay = style({
  backgroundColor: vars.color.brand.strong,
  borderRadius: 100,
  color: vars.color.text.inverse,
});
export const monthCaption = style({
  color: vars.color.text.primary,
  height: 24,
  fontWeight: 700,
  textAlign: "left",
  fontSize: 16,
  paddingLeft: 14,
  whiteSpace: "nowrap",
});
export const navigation = style({
  position: "absolute",
  insetBlockStart: 0,
  insetInlineEnd: 0,
  display: "flex",
  alignItems: "center",
  color: vars.color.text.tertiary,
  height: 20,
  columnGap: 15,
  paddingRight: 16,
  paddingTop: 10,
});
export const weekdays = style({
  color: vars.color.text.placeholder,
});
export const weekday = style({
  fontSize: 16,
  fontWeight: 400,
  padding: "0 0 15px",
  width: 43,
});

export const today = style({
  color: "white",
});

export const monthGrid = style({
  fontSize: 16,
  paddingTop: 19,
  borderSpacing: "8px 0",
  paddingBottom: 13,
});

export const day = style({
  borderWidth: 0,
  padding: 0,
  height: 43,
  width: 43,
});
export const dayButton = style({
  borderWidth: 0,
  padding: 0,
  height: 43,
  width: 43,
  backgroundColor: "transparent",
  color: "inherit",
  fontSize: 16,
  selectors: {
    "&:not(:disabled)": {
      cursor: "pointer",
    },
    "&:disabled": {
      color: vars.color.text.disabled,
      cursor: "not-allowed",
    },
  },
});
export const dayPickArea = style({
  paddingBottom: 15,
  paddingTop: 11,
});

export const navigationButton = style({
  backgroundColor: vars.color.surface.default,
  border: 0,
  color: vars.color.text.tertiary,
  padding: 0,
  width: 20,
  height: 20,
  cursor: "pointer",
});

export const outside = style({
  backgroundColor: vars.color.surface.default,
});
