import { style } from "@vanilla-extract/css";

import { text } from "../../styles/text";

export const viewport = style({
  position: "fixed",
  top: 40,
  left: "50%",
  zIndex: 100,
  display: "flex",
  justifyContent: "center",
  width: 393,
  transform: "translateX(-50%)",
  pointerEvents: "none",
});

export const root = style({
  position: "absolute",
  zIndex: "calc(1000 - var(--toast-index))",
  padding: "8px 20px",
  borderRadius: 30,
  backgroundColor: "rgba(62, 62, 62, 0.8)",
  backdropFilter: "blur(4px)",
  color: "#FFFFFF",
  ...text({ size: 16, weight: 500, lineHeight: 1.6 }),
  whiteSpace: "nowrap",
  transform:
    "translateY(calc(var(--toast-index) * 8px)) scale(calc(1 - var(--toast-index) * 0.05))",
  transition: "opacity 350ms ease-out, transform 350ms ease-out",
  touchAction: "none",
  pointerEvents: "auto",
  selectors: {
    "&[data-expanded]": {
      transform: "translateY(calc(var(--toast-offset-y) + var(--toast-index) * 10px))",
    },
    "&[data-starting-style], &[data-ending-style]": {
      opacity: 0,
      transform: "translateY(-140%) scale(0.96)",
    },
    "&[data-swiping]": {
      transition: "none",
      transform: "translateY(calc(var(--toast-index) * 8px + var(--toast-swipe-movement-y)))",
    },
    "&[data-ending-style][data-swipe-direction='up']": {
      transform: "translateY(calc(var(--toast-swipe-movement-y) - 140%))",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "opacity 350ms ease-out",
      selectors: {
        "&[data-starting-style], &[data-ending-style]": { transform: "none" },
      },
    },
  },
});

export const content = style({
  transition: "opacity 350ms ease-out",
  selectors: {
    "&[data-behind]": { opacity: 0 },
  },
});

export const title = style({
  margin: 0,
  ...text({ size: 16, weight: 500, lineHeight: 1.6 }),
});
