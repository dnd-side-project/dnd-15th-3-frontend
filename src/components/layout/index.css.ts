import { style } from "@vanilla-extract/css";

const colors = {
  backdrop: "#EEEEEE",
  surface: "#F5F6F8",
};

export const letterbox = style({
  display: "flex",
  justifyContent: "center",
  minHeight: "100dvh",
  background: colors.backdrop,
});

export const frame = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: 393,
  minHeight: "100dvh",
  background: colors.surface,
});
