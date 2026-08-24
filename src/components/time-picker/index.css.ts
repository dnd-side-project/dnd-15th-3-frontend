import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

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
});

export const timePickArea = style({
  paddingTop: 21,
  paddingBottom: 15,
  fontFamily: vars.font.body,
  fontSize: 27,
  color: vars.color.text.primary,
  display: "flex",
  flexDirection: "column",
  rowGap: 7,
  fontWeight: 400,
  alignItems: "center",
});

export const stepper = style({
  display: "flex",
  flexDirection: "column",
  width: 54,
  alignItems: "center",
  rowGap: 15,
});

export const stepperButton = style({
  borderStyle: "none",
  borderRadius: 100,
  backgroundColor: "white",
  padding: 9,
  color: vars.color.text.description,
  margin: 0,
  display: "flex",
  alignItems: "center",
  ":active": {
    filter: "brightness(0.95)",
  },
  ":hover": {
    filter: "brightness(0.95)",
  },
});

export const confirmButton = recipe({
  base: {
    borderStyle: "none",
    borderRadius: 8,
    textAlign: "center",
    paddingBlock: 12,
    fontSize: 18,
    alignSelf: "stretch",
    height: 53,
    margin: "10px 20px",
    fontWeight: 600,
    ":active": {
      filter: "brightness(0.8)",
    },
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: vars.color.brand.strong,
        color: vars.color.text.inverse,
      },
      secondary: {
        backgroundColor: vars.color.surface.mutedStrong,
        color: vars.color.text.secondary,
      },
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});
export const stepperGroup = style({
  display: "flex",
  columnGap: 67,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginBlock: 3,
});

export const timeGroup = style({
  display: "flex",
  columnGap: 36,
  alignItems: "center",
});
