import { style } from "@vanilla-extract/css";

import { vars } from "../../../../../styles/theme.css";

const colors = {
  surface: "#FFFFFF",
  action: "#707D91",
};

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  background: colors.surface,
});

export const intro = style({
  marginTop: 30,
});

export const editButton = style({
  position: "absolute",
  top: -2,
  right: 21,
  display: "flex",
  alignItems: "center",
  gap: 2,
  height: 16,
  padding: 0,
  border: "none",
  background: "none",
  color: colors.action,
  fontFamily: vars.font.body,
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 1.2,
  cursor: "pointer",
});

export const picker = style({
  marginTop: 37,
});

export const status = style({
  padding: "40px 20px",
  color: colors.action,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.5,
  textAlign: "center",
});
