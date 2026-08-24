import { style } from "@vanilla-extract/css";

import { palette } from "@/styles/palette";

import { vars } from "@/styles/theme.css";

const colors = {
  backdrop: palette.black9Alpha40,
  background: vars.color.surface.default,
  icon: palette.neutral8,
  title: vars.color.text.strong,
  description: vars.color.text.description,
};

export const backdrop = style({
  position: "fixed",
  inset: 0,
  backgroundColor: colors.backdrop,
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
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 259,
  padding: "0 15px 28px",
  overflow: "hidden",
  borderRadius: 12,
  backgroundColor: colors.background,
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
  position: "absolute",
  zIndex: 1,
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
  color: colors.icon,
  cursor: "pointer",
});

export const media = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 211,
});

export const texts = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 1,
  textAlign: "center",
});

export const title = style({
  margin: 0,
  fontSize: 20,
  lineHeight: 1.5,
  fontWeight: 600,
  color: colors.title,
});

export const description = style({
  margin: 0,
  fontSize: 14,
  lineHeight: 1.5,
  fontWeight: 400,
  color: colors.description,
});
