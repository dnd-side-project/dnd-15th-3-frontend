import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  surface: "#FFFFFF",
  placeholder: "#E2E2E2",
  shadow: "rgba(0, 0, 0, 0.3)",
  tone: {
    blue: "#3793FF",
    pink: "#FF46A9",
    purple: "#A754EB",
  },
};

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
  filter: `drop-shadow(0 2px 5px ${colors.shadow})`,
});

export const body = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: 72,
  height: 72,
  borderRadius: 18,
  backgroundColor: colors.surface,
});

export const tail = style({
  position: "absolute",
  top: 66,
  left: "50%",
  width: 13,
  height: 15,
  transform: "translateX(-50%)",
  backgroundColor: colors.surface,
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
  backgroundColor: colors.placeholder,
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
    width: "auto",
    minWidth: 16,
    height: 16,
    padding: "0 3px",
    borderRadius: vars.radius.full,
    color: colors.surface,
    fontFamily: vars.font.body,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.2,
  },
  variants: {
    tone: {
      blue: { backgroundColor: colors.tone.blue },
      pink: { backgroundColor: colors.tone.pink },
      purple: { backgroundColor: colors.tone.purple },
    },
  },
  defaultVariants: {
    tone: "blue",
  },
});
