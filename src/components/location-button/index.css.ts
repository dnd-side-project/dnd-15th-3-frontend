import { style } from "@vanilla-extract/css";

const backgroundColor = "#FFFFFF";
const activeBackgroundColor = "#F2F3F7";
const iconColor = "#606060";
const shadowColor = "rgba(0, 0, 0, 0.2)";

export const button = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 44,
  height: 44,
  padding: 0,
  border: "none",
  borderRadius: 9999,
  backgroundColor,
  boxShadow: `0 0 6px ${shadowColor}`,
  color: iconColor,
  cursor: "pointer",
  transition: "background-color 0.15s ease",
  selectors: {
    "&:active:not(:disabled)": {
      backgroundColor: activeBackgroundColor,
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
