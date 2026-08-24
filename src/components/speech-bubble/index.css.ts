import { globalStyle, keyframes, style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

const colors = {
  background: vars.color.brand.subtle,
  text: vars.color.brand.primary,
};

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const bubble = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: 3,
  height: 33,
  marginBottom: 12,
  padding: "0 10px",
  borderRadius: 8,
  backgroundColor: colors.background,
  color: colors.text,
  ...text({ size: 16, weight: 500, lineHeight: 1.5 }),
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -11.5,
      left: "50%",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "12.5px 7.3px 0 7.3px",
      borderColor: `${colors.background} transparent transparent transparent`,
      transform: "translateX(-50%)",
    },
  },
});

globalStyle(`${bubble} > svg`, {
  transformOrigin: "center",
  animation: `${spin} 1s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});
