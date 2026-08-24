import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";

const colors = {
  title: "#3D3D3D",
  description: "#707D91",
  cardBackground: "#ECEFF5",
  cardTitle: "#3793FF",
  arrowBackground: "rgba(0, 0, 0, 0.1)",
  arrowIcon: "#FFFFFF",
};

export const root = style({
  display: "flex",
  flexDirection: "column",
  padding: "20px 20px 0",
});

export const logo = style({
  display: "block",
});

export const intro = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginTop: 81,
  padding: "0 3px",
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

export const cards = style({
  display: "flex",
  flexDirection: "column",
  gap: 18,
  marginTop: 47,
});

export const card = recipe({
  base: {
    position: "relative",
    display: "block",
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
    textDecoration: "none",
  },
  variants: {
    size: {
      large: { height: 254 },
      small: { height: 79 },
    },
  },
});

export const confetti = style({
  position: "absolute",
  top: -120,
  left: -49,
  width: 451,
  height: 257,
});

export const illustration = recipe({
  base: { position: "absolute" },
  variants: {
    size: {
      large: { top: 21, right: 0, width: 319, height: 233 },
      small: { top: 0, right: 6, width: 210, height: 79 },
    },
  },
});

export const cardContent = recipe({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    margin: "0 28px 0 25px",
  },
  variants: {
    size: {
      large: { marginTop: 16 },
      small: { marginTop: 14 },
    },
  },
});

export const cardTexts = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
});

export const cardTitle = style({
  margin: 0,
  color: colors.cardTitle,
  fontFamily: vars.font.body,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1.65,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const cardDescription = style({
  margin: "-2px 0 0",
  color: colors.description,
  fontFamily: vars.font.body,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.65,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const arrow = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  borderRadius: vars.radius.full,
  backgroundColor: colors.arrowBackground,
  color: colors.arrowIcon,
});
