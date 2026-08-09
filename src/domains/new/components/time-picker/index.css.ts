import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../../../styles/theme.css";

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
});

export const timePickArea = style({
  paddingTop: 20.65,
  paddingBottom: 15,
  fontFamily: vars.font.body,
  fontSize: 26.64,
  color: "#262626",
  display: "flex",
  flexDirection: "column",
  rowGap: 7,
  fontWeight: 400,
  alignItems: "center",
});

export const stepper = style({
  display: "flex",
  flexDirection: "column",
  width: 53.88,
  alignItems: "center",
  rowGap: 14.97,
});

export const stepperButton = style({
  borderStyle: "none",
  borderRadius: 100,
  backgroundColor: "white",
  padding: 8.98,
  color: "#6D6D6D",
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
    width: 353,
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
        backgroundColor: "#66ADFF",
        color: "#FFFFFF",
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
export const stepperGroup = style({
  display: "flex",
  columnGap: 67.35,
  alignItems: "center",
  justifyContent: "center",
  width: 380.65,
  marginBlock: 2.65,
});

export const timeGroup = style({
  display: "flex",
  columnGap: 35.92,
  alignItems: "center",
});
