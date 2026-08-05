import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const list = style({
  display: "flex",
  gap: 2,
  padding: 2,
  borderRadius: 9999,
  backgroundColor: "#ECEFF5",
});

export const tab = recipe({
  base: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    border: "none",
    borderRadius: 9999,
    backgroundColor: "transparent",
    color: "#6D6D6D",
    fontFamily: vars.font.body,
    fontSize: 16,
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
  variants: {
    active: {
      true: {
        backgroundColor: "#3D3D3D",
        color: "#FFFFFF",
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});
