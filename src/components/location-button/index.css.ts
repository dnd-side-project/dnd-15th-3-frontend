import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

const colors = {
  background: "#FFFFFF",
  activeBackground: "#F2F3F7",
  icon: "#606060",
  shadow: "rgba(0, 0, 0, 0.2)",
};

export const button = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 44,
  height: 44,
  padding: 0,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: colors.background,
  boxShadow: `0 0 6px ${colors.shadow}`,
  color: colors.icon,
  cursor: "pointer",
  transition: "background-color 0.15s ease",
  selectors: {
    "&:active:not(:disabled)": {
      backgroundColor: colors.activeBackground,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
});
