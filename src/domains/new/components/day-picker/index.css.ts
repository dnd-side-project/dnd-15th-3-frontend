import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../../../styles/theme.css";
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
        backgroundColor: "#66ADFF",
        color: "#FFFFFF",
        ":active": {
          filter: "brightness(0.8)",
        },
        cursor: "pointer",
      },
      secondary: {
        backgroundColor: "#DAE1EC",
        color: "#707D91",
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
  backgroundColor: "#ECEFF5",
  color: "#707D91",
  border: 0,
  padding: "15px 13px",
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  cursor: "pointer",
});

export const calendar = style({
  paddingLeft: 7,
  overflowX: "auto",
});

export const selectedDay = style({
  backgroundColor: "#66ADFF",
  borderRadius: 100,
  color: "#FFFFFF",
});
export const monthCaption = style({
  color: "#262626",
  height: 24,
  width: 83,
  fontWeight: 700,
  textAlign: "center",
  fontSize: 16,
  paddingLeft: 8,
});
export const navigation = style({
  position: "absolute",
  insetBlockStart: 0,
  insetInlineEnd: 0,
  display: "flex",
  alignItems: "center",
  color: "#A4B1C5",
  height: 20,
  columnGap: 15,
  paddingRight: 16,
  paddingTop: 10,
});
export const weekdays = style({
  color: "#888888",
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
  borderSpacing: `8px 0`,
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
  cursor: "pointer",
});
export const dayPickArea = style({
  paddingBottom: 15,
  paddingTop: 11,
});

export const navigationButton = style({
  backgroundColor: "#FFFFFF",
  border: 0,
  color: "#A4B1C5",
  padding: 0,
  width: 20,
  height: 20,
  cursor: "pointer",
});

export const outside = style({
  backgroundColor: "#FFFFFF",
});
