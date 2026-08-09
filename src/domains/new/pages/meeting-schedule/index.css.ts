import { style } from "@vanilla-extract/css";

import { vars } from "../../../../styles/theme.css";

const colors = {
  heading: "#3D3D3D",
  description: "#707D91",
};

export const intro = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginTop: 35,
  padding: "0 23px",
});

export const introTitle = style({
  margin: 0,
  color: colors.heading,
  fontFamily: vars.font.body,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 1.2,
});

export const introDescription = style({
  margin: 0,
  color: colors.description,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.2,
});

export const fields = style({
  display: "flex",
  gap: 16,
  marginTop: 24,
  padding: "0 20px",
});
