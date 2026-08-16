import { style } from "@vanilla-extract/css";

import { text } from "../../styles/text";

const colors = {
  background: "rgba(62, 62, 62, 0.8)",
  text: "#FFFFFF",
};

export const toast = style({
  position: "absolute",
  top: 40,
  left: "50%",
  zIndex: 1,
  padding: "8px 20px",
  borderRadius: 30,
  backgroundColor: colors.background,
  backdropFilter: "blur(4px)",
  color: colors.text,
  ...text({ size: 16, weight: 500, lineHeight: 1.6 }),
  whiteSpace: "nowrap",
  transform: "translateX(-50%)",
  transition: "opacity 300ms ease-out",
  pointerEvents: "none",
  selectors: {
    "&[data-visible='false']": { opacity: 0 },
    "&[data-visible='true']": { opacity: 1 },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});
