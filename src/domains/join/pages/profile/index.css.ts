import { style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

import { surfaceColor } from "@/components/layout/index.css";
import { vars } from "@/styles/theme.css";

const colors = {
  heading: vars.color.text.heading,
  description: vars.color.text.secondary,
  changeBackground: vars.color.brand.primary,
  changeIcon: vars.color.surface.default,
};

export const page = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  backgroundColor: surfaceColor,
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const ctaArea = style({
  padding: "16px 20px calc(20px + env(safe-area-inset-bottom))",
});

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: 32,
  alignItems: "center",
  marginTop: 67,
});

export const profile = style({
  display: "flex",
  flexDirection: "column",
  gap: 11,
  alignItems: "center",
});

export const avatar = style({
  position: "relative",
});

export const changeButton = style({
  position: "absolute",
  right: 5,
  bottom: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 30,
  height: 30,
  padding: 1,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: colors.changeBackground,
  color: colors.changeIcon,
  cursor: "pointer",
});

export const nickname = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
  padding: "0 20px",
});

export const label = style({
  margin: "0 3px",
  color: colors.heading,
  ...text({ size: 20, weight: 600, lineHeight: 1.2 }),
});

export const sheetBody = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 28,
});

export const sheetTexts = style({
  display: "flex",
  flexDirection: "column",
  gap: 5,
  alignSelf: "stretch",
  padding: "0 30px",
});

export const sheetTitle = style({
  margin: 0,
  color: colors.heading,
  ...text({ size: 20, weight: 600, lineHeight: 1.2 }),
});

export const sheetDescription = style({
  margin: 0,
  color: colors.description,
  ...text({ size: 16, weight: 500, lineHeight: 1.2 }),
});

export const preview = style({
  marginTop: 32,
});

export const options = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 70px)",
  gap: "22px 40px",
  marginTop: 33,
});

export const option = style({
  display: "block",
  padding: 0,
  border: "none",
  background: "none",
  cursor: "pointer",
});

export const sheetFooter = style({
  display: "flex",
  marginTop: 21,
  padding: "10px 20px calc(32px + env(safe-area-inset-bottom))",
});
