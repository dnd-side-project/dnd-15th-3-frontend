import { style } from "@vanilla-extract/css";

export const root = style({
  position: "absolute",
  inset: 0,
  backgroundColor: "#E9EEF5",
  pointerEvents: "none",
});

export const map = style({
  width: "100%",
  height: "100%",
});

export const attribution = style({
  fontSize: "8px !important",
});
