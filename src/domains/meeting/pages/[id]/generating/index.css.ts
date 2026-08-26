import { keyframes, style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

// momoImage 가 떠오르는 동안 momoShadow 는 반대로 옅어지고 좁아진다. 같은 길이·이징으로 맞춰야 동기화된다.
const float = keyframes({
  "0%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-10px)" },
  "100%": { transform: "translateY(0)" },
});

const shadowPulse = keyframes({
  "0%": { transform: "scaleX(1)", opacity: 1 },
  "50%": { transform: "scaleX(0.85)", opacity: 0.6 },
  "100%": { transform: "scaleX(1)", opacity: 1 },
});

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
  background: vars.color.brand.surface,
});

export const texts = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  alignItems: "center",
  marginTop: 89,
  textAlign: "center",
});

export const title = style({
  margin: 0,
  color: vars.color.brand.primary,
  ...text({ size: 24, weight: 600, lineHeight: 1.2 }),
});

export const description = style({
  margin: 0,
  color: vars.color.text.secondary,
  ...text({ size: 16, weight: 500, lineHeight: 1.5 }),
});

export const momo = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 39,
  marginTop: 48,
});

export const momoImage = style({
  display: "block",
  width: 301,
  height: "auto",
  animation: `${float} 2.4s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

export const momoShadow = style({
  display: "block",
  width: 144,
  color: vars.color.surface.mutedStrong,
  animation: `${shadowPulse} 2.4s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});
