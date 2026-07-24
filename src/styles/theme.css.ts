import { createGlobalTheme } from "@vanilla-extract/css";

// 전역 디자인 토큰
export const vars = createGlobalTheme(":root", {
  color: {
    background: "#ffffff",
    text: "#213547",
    primary: "#646cff",
    primaryHover: "#535bf2",
    muted: "#888888",
  },
  font: {
    body: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  fontSize: {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "2rem",
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    bold: "700",
  },
  radius: {
    sm: "4px",
    md: "8px",
    full: "9999px",
  },
  space: {
    none: "0",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
});
