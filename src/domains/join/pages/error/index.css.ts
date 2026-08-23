import { keyframes, style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

const colors = {
  background: "#F1F8FF",
  title: "#3793FF",
  description: "#707D91",
};

const wobble = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(-10deg)" },
});

export const root = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100dvh",
  backgroundColor: colors.background,
});

export const head = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
  marginTop: 102,
});

export const title = style({
  margin: 0,
  color: colors.title,
  textAlign: "center",
  ...text({ size: 24, weight: 600 }),
});

export const description = style({
  margin: 0,
  color: colors.description,
  textAlign: "center",
  ...text({ size: 16, weight: 500 }),
});

export const momo = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 92,
});

export const momoInner = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 39,
});

export const momoImage = style({
  display: "block",
  width: 301,
  height: "auto",
  transformOrigin: "center bottom",
  animation: `${wobble} 1.2s ease-in-out infinite alternate`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

export const momoShadow = style({
  display: "block",
  width: 144,
  color: "#DAE1EC",
});

export const footer = style({
  display: "flex",
  marginTop: "auto",
  padding: "10px 20px calc(21px + env(safe-area-inset-bottom))",
});
