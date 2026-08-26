import { style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
});

export const texts = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  alignItems: "center",
  marginTop: 89,
  textAlign: "center",
});

export const title = style({
  margin: 0,
  color: vars.color.brand.primary,
  ...text({ size: 24, weight: 600, lineHeight: 1.2 }),
});

export const description = style({
  margin: 0,
  color: vars.color.text.secondary,
  ...text({ size: 16, weight: 500, lineHeight: 1.5 }),
});

export const media = style({
  position: "relative",
  width: "100%",
  height: 320,
  marginTop: 24,
});

export const mapImage = style({
  position: "absolute",
  top: 0,
  left: "50%",
  width: 280,
  height: 336,
  transform: "translateX(-50%)",
});

export const pinImage = style({
  position: "absolute",
  top: 90,
  left: "50%",
  width: 57,
  height: 71,
  transform: "translateX(-8px)",
});
