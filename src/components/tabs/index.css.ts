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
  alignItems: "center",
  height: 45,
  padding: "0 5px",
  borderRadius: 30,
  backgroundColor: "rgba(255, 255, 255, 0.81)",
});

export const tab = recipe({
  base: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 37,
    border: "none",
    borderRadius: 30,
    backgroundColor: "transparent",
    color: "#B0B0B0",
    fontFamily: vars.font.body,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease",
    "@media": {
      "(prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: "#3793FF",
        color: "#FFFFFF",
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});
