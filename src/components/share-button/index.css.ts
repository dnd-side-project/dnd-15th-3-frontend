import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

export const group = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.lg,
});

export const iconButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60px",
    height: "60px",
    border: "none",
    borderRadius: vars.radius.full,
    cursor: "pointer",
    selectors: {
      "&:disabled": { opacity: 0.6, cursor: "not-allowed" },
    },
  },
  variants: {
    tone: {
      link: {
        background: "#e4e7ed",
        color: "#4b4f58",
      },
      kakao: {
        background: "#fee500",
        color: "#181600",
      },
    },
  },
});

export const label = style({
  margin: 0,
  color: "#ff5a5a",
  fontSize: vars.fontSize.sm,
});
