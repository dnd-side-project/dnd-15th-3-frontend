import { style } from "@vanilla-extract/css";

import { text } from "../../styles/text";

const colors = {
  title: "#262626",
  icon: "#606060",
};

export const root = style({
  position: "sticky",
  top: 0,
  zIndex: 1,
  display: "grid",
  gridTemplateColumns: "24px 1fr 24px",
  alignItems: "center",
  width: "100%",
  height: 64,
  padding: "25px 20px 10px",
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
  color: colors.title,
  ...text({ size: 18, weight: 600, lineHeight: 1.6 }),
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
  color: colors.icon,
  cursor: "pointer",
});
