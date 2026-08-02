import { style } from "@vanilla-extract/css";

// Figma 와이어프레임 기준 로컬 색상값 (공용 theme.css.ts 토큰과는 별개)
const colors = {
  background: "#eaf2ff",
  text: "#3182f6",
  iconBackground: "#ffffff",
};

const tailSize = "6px";

export const bubble = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "12px",
  padding: "10px 16px",
  borderRadius: "16px",
  backgroundColor: colors.background,
  color: colors.text,
  fontSize: "0.875rem",
  fontWeight: 600,
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: `calc(${tailSize} * -1)`,
      left: "24px",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: `${tailSize} ${tailSize} 0 ${tailSize}`,
      borderColor: `${colors.background} transparent transparent transparent`,
    },
  },
});

export const icon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  backgroundColor: colors.iconBackground,
  flexShrink: 0,
});

export const iconDot = style({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: colors.text,
});
