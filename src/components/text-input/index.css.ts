import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  roundedBackground: "#ECEFF5",
  roundedFilledBackground: "#DAE1EC",
  pillBackground: "#FFFFFF",
  pillBorder: "#E7E7E7",
  placeholder: "#707D91",
};

export const wrapper = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    boxSizing: "border-box",
    fontFamily: vars.font.body,
    color: colors.placeholder,
  },
  variants: {
    shape: {
      rounded: {
        height: 54,
        padding: "0 13px",
        borderRadius: 8,
        backgroundColor: colors.roundedBackground,
        fontSize: 16,
      },
      pill: {
        height: 50,
        padding: "0 10px 0 20px",
        border: `1px solid ${colors.pillBorder}`,
        borderRadius: vars.radius.full,
        backgroundColor: colors.pillBackground,
        fontSize: 14,
      },
    },
    filled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { shape: "rounded", filled: true },
      style: { backgroundColor: colors.roundedFilledBackground },
    },
    {
      variants: { shape: "pill", filled: true },
      style: { backgroundColor: colors.roundedBackground },
    },
  ],
  defaultVariants: {
    shape: "rounded",
    filled: false,
  },
});

export const input = style({
  flex: 1,
  minWidth: 0,
  padding: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  fontFamily: "inherit",
  fontSize: "inherit",
  color: vars.color.text,

  "::placeholder": {
    color: colors.placeholder,
  },
});

export const adornment = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
});

export const sendButton = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 36,
    padding: 0,
    border: "none",
    borderRadius: 20,
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease",
    "@media": {
      "(prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },
  variants: {
    filled: {
      true: { backgroundColor: "#AAD1FF", color: "#4C9FFF" },
      false: { backgroundColor: "#DAE1EC", color: "#707D91" },
    },
  },
  defaultVariants: {
    filled: false,
  },
});
