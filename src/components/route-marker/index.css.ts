import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const surface = "#FFFFFF";
const placeholder = "#E2E2E2";
const toneBlue = "#3793FF";
const tonePink = "#FF46A9";
const tonePurple = "#A754EB";

export const root = style({
  position: "relative",
  display: "block",
  width: 72,
  height: 81,
  padding: 0,
  border: "none",
  background: "none",
  overflow: "visible",
});

export const clickable = style({
  cursor: "pointer",
});

export const shape = style({
  position: "relative",
  width: 72,
  height: 81,
  filter: "drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3))",
});

export const body = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: 72,
  height: 72,
  borderRadius: 18,
  backgroundColor: surface,
});

export const tail = style({
  position: "absolute",
  top: 66,
  left: "50%",
  width: 13,
  height: 15,
  transform: "translateX(-50%)",
  backgroundColor: surface,
  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
});

export const thumbnail = style({
  position: "absolute",
  top: 2,
  left: 2,
  display: "block",
  width: 68,
  height: 68,
  borderRadius: 17,
  backgroundColor: placeholder,
  objectFit: "cover",
});

export const badge = recipe({
  base: {
    position: "absolute",
    top: -3,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    borderRadius: 8,
    color: surface,
    fontFamily: vars.font.body,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: "14.4px",
  },
  variants: {
    tone: {
      blue: { backgroundColor: toneBlue },
      pink: { backgroundColor: tonePink },
      purple: { backgroundColor: tonePurple },
    },
  },
  defaultVariants: {
    tone: "blue",
  },
});
