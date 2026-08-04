import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

export const group = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 16,
});

export const iconButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
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
        background: "#ECEFF5",
        color: "#A4B1C5",
      },
      kakao: {
        background: "#FEE500",
        color: "#000000",
      },
    },
  },
});
