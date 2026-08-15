import { style } from "@vanilla-extract/css";

import { text } from "../../styles/text";

const colors = {
  title: "#3D3D3D",
  description: "#707D91",
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
