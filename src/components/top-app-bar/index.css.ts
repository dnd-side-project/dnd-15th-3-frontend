import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  backgroundSurface: "#F5F6F8",
  backgroundWhite: "#FFFFFF",
  title: "#262626",
  icon: "#606060",
};

export const root = recipe({
  base: {
    display: "grid",
    gridTemplateColumns: "24px 1fr 24px",
    alignItems: "center",
    boxSizing: "border-box",
    width: "100%",
    height: 64,
    padding: "25px 20px 10px",
  },
  variants: {
    background: {
      surface: { backgroundColor: colors.backgroundSurface },
      white: { backgroundColor: colors.backgroundWhite },
    },
  },
  defaultVariants: {
    background: "surface",
  },
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
  fontFamily: vars.font.body,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1.6,
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
