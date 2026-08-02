import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/theme.css";

export const letterbox = style({
  display: "flex",
  justifyContent: "center",
  minHeight: "100dvh",
  background: "#eeeeee",
});

export const frame = style({
  width: "100%",
  maxWidth: "393px",
  background: vars.color.background,
  display: "flex",
  flexDirection: "column",
});
