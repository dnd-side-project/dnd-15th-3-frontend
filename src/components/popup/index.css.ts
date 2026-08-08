import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/theme.css";

const backdropColor = "rgba(0, 0, 0, 0.4)";
const cardColor = "#FFFFFF";
const closeColor = "#BBBBBB";
const titleColor = "#000000";
const descriptionColor = "#6D6D6D";

export const backdrop = style({
  position: "fixed",
  inset: 0,
  backgroundColor: backdropColor,
  transition: "opacity 0.15s ease",
  selectors: {
    "&[data-starting-style]": {
      opacity: 0,
    },
    "&[data-ending-style]": {
      opacity: 0,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
});

export const card = style({
  boxSizing: "border-box",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 259,
  padding: "0 15px 28px",
  borderRadius: 12,
  backgroundColor: cardColor,
  fontFamily: vars.font.body,
  outline: "none",
  transition: "opacity 0.15s ease, transform 0.15s ease",
  selectors: {
    "&[data-starting-style]": {
      opacity: 0,
      transform: "translate(-50%, -50%) scale(0.96)",
    },
    "&[data-ending-style]": {
      opacity: 0,
      transform: "translate(-50%, -50%) scale(0.96)",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
});

export const close = style({
  boxSizing: "border-box",
  position: "absolute",
  top: 23,
  right: 19,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  color: closeColor,
  cursor: "pointer",
});

export const media = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 211,
});

export const texts = style({
  display: "flex",
  flexDirection: "column",
  gap: 1,
  textAlign: "center",
});

export const title = style({
  margin: 0,
  fontSize: 20,
  lineHeight: "30px",
  fontWeight: 600,
  color: titleColor,
});

export const description = style({
  margin: 0,
  fontSize: 14,
  lineHeight: "20.54px",
  fontWeight: 400,
  color: descriptionColor,
});
