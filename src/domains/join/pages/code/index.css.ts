import { globalStyle, keyframes, style } from "@vanilla-extract/css";

import { surfaceColor } from "../../../../components/layout/index.css";
import { vars } from "../../../../styles/theme.css";

const colors = {
  pasteBackground: "#ECEFF5",
  pasteText: "#A4B1C5",
  titleText: "#000000",
  otpBackground: "#ECEFF5",
  otpBorder: "#E1E6EE",
  otpFilled: "#E5EEF9",
  otpFilledBorder: "#C5E0FF",
  otpTextColor: "#66ADFF",
};

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

/** 글자가 들어찰 때 한 번 튕긴다. */
const pop = keyframes({
  "0%": { transform: "scale(0.88)", opacity: 0.4 },
  "60%": { transform: "scale(1.08)", opacity: 1 },
  "100%": { transform: "scale(1)", opacity: 1 },
});

export const page = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  backgroundColor: surfaceColor,
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: 28,
  flex: 1,
  padding: "40px 20px 0",
});

export const title = style({
  margin: 0,
  color: colors.titleText,
  fontFamily: vars.font.body,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 1.05,
  textAlign: "left",
});

export const pasteButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 3,
  height: 33,
  padding: "5px 10px",
  border: "none",
  borderRadius: 8,
  backgroundColor: colors.pasteBackground,
  color: colors.pasteText,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.5,
  cursor: "pointer",
});

export const codeInputArea = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 102,
});

globalStyle(`${pasteButton} > svg`, {
  transformOrigin: "center",
  animation: `${spin} 1s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

export const ctaArea = style({
  padding: "16px 20px calc(20px + env(safe-area-inset-bottom))",
});

export const otpRoot = style({
  display: "flex",
  gap: 10,
  width: "100%",
});

/** 초대 링크의 코드를 채우는 동안에는 손대지 못하게 한다. */
export const otpRootAuto = style({ pointerEvents: "none" });

export const otpInput = style({
  flex: "1 1 0%",
  minWidth: 0,
  maxWidth: 50,
  height: 65,
  padding: 0,
  margin: 0,
  border: `2px solid ${colors.otpBorder}`,
  borderRadius: 6,
  backgroundColor: colors.otpBackground,
  color: colors.otpTextColor,
  caretColor: "#66ADFF",
  fontFamily: '"Montserrat"',
  fontSize: 32,
  fontWeight: 600,
  lineHeight: 1,
  textAlign: "center",
  outline: "none",
  boxSizing: "border-box",
  selectors: {
    "&[data-filled]": {
      backgroundColor: colors.otpFilled,
      color: colors.otpTextColor,
      borderColor: colors.otpFilledBorder,
      animation: `${pop} 0.22s ease-out`,
    },
    "&:focus": {
      borderColor: colors.otpFilledBorder,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      selectors: { "&[data-filled]": { animation: "none" } },
    },
  },
});
