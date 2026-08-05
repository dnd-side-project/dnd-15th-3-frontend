import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
export const confirmButton = recipe({
  base: {
    borderStyle: "none",
    borderRadius: 8,
    textAlign: "center",
    paddingBlock: 12,
    fontSize: 18,
    width: 353,
    height: 53,
    margin: "10px 20px",
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
      },
      secondary: {
        backgroundColor: "#DAE1EC",
        color: "#707D91",
      },
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});

export const trigger = style({
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  columnGap: 15,
  width: 168,
  height: 54,
  backgroundColor: "#ECEFF5",
  color: "#707D91",
  border: 0,
  padding: "13px 15px",
  fontFamily: "sans-serif",
  fontSize: "1rem",
});

export const calendar = style({
  paddingLeft: 7,
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
  fontSize: "1rem",
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
  fontSize: "1rem",
  fontWeight: 400,
  padding: "0px 0px 15px 0px ",
  width: 43.32,
});

export const today = style({
  color: "white",
});

export const monthGrid = style({
  fontSize: 16,
  paddingTop: 19,
  borderSpacing: `8px 0`,
  paddingBottom: 12.6,
});

export const day = style({
  borderWidth: 0,
  padding: 0,
  height: 43.32,
  width: 43.32,
});
export const dayButton = style({
  borderWidth: 0,
  padding: 0,
  height: 43.32,
  width: 43.32,
  backgroundColor: "transparent",
  color: "inherit",
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
});

export const outside = style({
  backgroundColor: "#FFFFFF",
});
