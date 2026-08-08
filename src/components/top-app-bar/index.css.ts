import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/theme.css";

const backgroundColor = "#F5F6F8";
const titleColor = "#262626";
const iconColor = "#606060";

export const root = style({
  display: "grid",
  gridTemplateColumns: "24px 1fr 24px",
  alignItems: "center",
  boxSizing: "border-box",
  width: "100%",
  height: 64,
  padding: "25px 20px 10px",
  backgroundColor,
});

export const slot = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
});

export const title = style({
  minWidth: 0,
  overflow: "hidden",
  color: titleColor,
  fontFamily: vars.font.body,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: "28.8px",
  textAlign: "center",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const iconButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  padding: 0,
  border: "none",
  background: "transparent",
  color: iconColor,
  cursor: "pointer",
});
