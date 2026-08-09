import { style } from "@vanilla-extract/css";

import { vars } from "../../../../styles/theme.css";

const colors = {
  title: "#3793FF",
  description: "#707D91",
  divider: "#DAE1EC",
  dividerLabel: "#6D6D6D",
  code: "#FFFFFF",
};

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  // Figma 는 상태바를 포함한 852px 기준이라 흰색에 닿는 지점을 프레임 기준으로 옮겼다.
  background: "linear-gradient(180deg, #D7ECFF 0%, #FFFDFD 42%)",
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
  color: colors.title,
  fontFamily: vars.font.body,
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 1.2,
});

export const description = style({
  margin: 0,
  color: colors.description,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.2,
});

export const card = style({
  position: "relative",
  overflow: "hidden",
  height: 301,
  margin: "51px 20px 0",
  borderRadius: 12,
  background: "linear-gradient(180deg, #479BFF 40%, #7DB9FF 71.7%)",
  boxShadow: "0 3px 4px rgba(0, 0, 0, 0.25)",
});

export const confetti = style({
  position: "absolute",
  top: -77.83,
  left: -44,
  width: 439.31,
  height: 256.93,
});

export const cardImage = style({
  position: "absolute",
  top: 90,
  left: -52,
  width: 457,
  height: 366,
});

export const badge = style({
  position: "absolute",
  top: 24,
  left: 140.5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 76,
  height: 38,
  borderRadius: 20,
  background: "linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(10, 123, 255, 0.25) 100%)",
  backdropFilter: "blur(4px)",
  color: colors.code,
  fontFamily: "Montserrat, sans-serif",
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "22px",
});

export const codeRow = style({
  position: "absolute",
  top: 96,
  left: 72,
  display: "flex",
  alignItems: "center",
  gap: 16,
  width: 209,
  height: 51,
  padding: 0,
  border: "none",
  background: "none",
  color: colors.code,
  cursor: "pointer",
});

export const code = style({
  fontFamily: "Montserrat, sans-serif",
  fontSize: 32,
  fontWeight: 600,
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
  backgroundColor: colors.divider,
});

export const dividerLabel = style({
  color: colors.dividerLabel,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.6,
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
  color: colors.description,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.5,
  textAlign: "center",
});
