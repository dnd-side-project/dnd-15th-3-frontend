import { style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

const colors = {
  title: vars.color.text.heading,
  description: vars.color.text.secondary,
};

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: "0 23px",
});

export const title = style({
  margin: 0,
  color: colors.title,
  ...text({ size: 20, weight: 600, lineHeight: 1.2 }),
});

export const description = style({
  margin: 0,
  color: colors.description,
  ...text({ size: 16, weight: 500, lineHeight: 1.2 }),
});
