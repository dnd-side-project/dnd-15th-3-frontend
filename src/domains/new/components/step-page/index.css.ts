import { style } from "@vanilla-extract/css";

export const body = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const footer = style({
  display: "flex",
  marginTop: "auto",
  padding: "10px 20px calc(21px + env(safe-area-inset-bottom))",
});
