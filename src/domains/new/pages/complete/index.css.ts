import { style } from "@vanilla-extract/css";

import { palette } from "@/styles/palette";
import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  // 상태바 48px 를 뺀 프레임 기준으로 흰색 도달 지점을 옮겼다.
  background: `linear-gradient(180deg, ${palette.blue6} 0%, ${palette.red1} 42%)`,
});

export const texts = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  alignItems: "center",
  marginTop: 89,
});

export const title = style({
  margin: 0,
  color: vars.color.brand.primary,
  ...text({ size: 24, weight: 600, lineHeight: 1.2 }),
});

export const description = style({
  margin: 0,
  color: vars.color.text.secondary,
  ...text({ size: 16, weight: 500, lineHeight: 1.2 }),
});

export const card = style({
  position: "relative",
  overflow: "hidden",
  height: 301,
  margin: "51px 20px 0",
  borderRadius: 12,
  background: `linear-gradient(180deg, ${palette.blue20} 40%, ${palette.blue14} 72%)`,
  boxShadow: `0 3px 4px ${vars.color.overlay.scrim25}`,
});

export const confetti = style({
  position: "absolute",
  top: -78,
  left: -44,
  width: 439,
  height: 257,
});

export const cardImage = style({
  position: "absolute",
  top: 90,
  left: "50%",
  width: 457,
  height: 366,
  transform: "translateX(-50%)",
});

export const badge = style({
  position: "absolute",
  top: 24,
  left: "50%",
  display: "flex",
  transform: "translateX(-50%)",
  alignItems: "center",
  justifyContent: "center",
  width: 76,
  height: 38,
  borderRadius: 20,
  background: `linear-gradient(90deg, ${palette.white7Alpha12} 0%, ${palette.blue27Alpha25} 100%)`,
  backdropFilter: "blur(4px)",
  color: vars.color.text.inverse,
  fontFamily: "Montserrat, sans-serif",
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "22px",
});

export const codeRow = style({
  position: "absolute",
  top: 96,
  left: "50%",
  display: "flex",
  transform: "translateX(-50%)",
  alignItems: "center",
  gap: 16,
  padding: 0,
  border: "none",
  background: "none",
  color: vars.color.text.inverse,
  cursor: "pointer",
});

export const code = style({
  fontFamily: "Montserrat, sans-serif",
  fontSize: 32,
  fontWeight: 600,
  marginRight: -5,
  letterSpacing: 5,
  lineHeight: 1.6,
});

export const divider = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  height: 26,
  margin: "38px 18px 0",
});

export const dividerLine = style({
  flex: 1,
  height: 1,
  backgroundColor: vars.color.surface.mutedStrong,
});

export const dividerLabel = style({
  color: vars.color.text.description,
  ...text({ size: 16, weight: 600, lineHeight: 1.6 }),
});

export const share = style({
  display: "flex",
  justifyContent: "center",
  marginTop: 18,
});

export const footer = style({
  display: "flex",
  marginTop: "auto",
  padding: "10px 20px calc(21px + env(safe-area-inset-bottom))",
});

export const status = style({
  margin: "51px 20px 0",
  color: vars.color.text.secondary,
  ...text({ size: 16, weight: 500, lineHeight: 1.5 }),
  textAlign: "center",
});
