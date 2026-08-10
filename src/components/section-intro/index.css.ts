import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/theme.css";

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
  fontFamily: vars.font.body,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 1.2,
});

export const description = style({
  margin: 0,
  color: colors.description,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.2,
});
