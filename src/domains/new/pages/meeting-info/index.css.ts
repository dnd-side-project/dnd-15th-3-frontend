import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../../../styles/theme.css";

const colors = {
  nameLabel: "#262626",
  heading: "#3D3D3D",
  description: "#707D91",
  cardBackground: "#ECEFF5",
  cardLabel: "#707D91",
  selectedBackground: "#DBECFF",
  selectedLabel: "#3793FF",
};

export const name = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginTop: 44,
  padding: "0 20px",
});

export const nameLabel = style({
  margin: "0 3px",
  color: colors.nameLabel,
  fontFamily: vars.font.body,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 1.2,
});

export const intro = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginTop: 36,
  padding: "0 23px",
});

export const introTitle = style({
  margin: 0,
  color: colors.heading,
  fontFamily: vars.font.body,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 1.2,
});

export const introDescription = style({
  margin: 0,
  color: colors.description,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.2,
});

export const types = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 102px)",
  gap: "18px 17px",
  justifyContent: "center",
  marginTop: 28,
  padding: "0 20px",
});

export const typeCard = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    height: 102,
    padding: "10px 24px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease",
    "@media": {
      "(prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },
  variants: {
    selected: {
      true: { backgroundColor: colors.selectedBackground, color: colors.selectedLabel },
      false: { backgroundColor: colors.cardBackground, color: colors.cardLabel },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export const typeIcon = style({
  display: "block",
  flexShrink: 0,
});

export const typeLabel = style({
  color: "inherit",
  fontFamily: vars.font.body,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.5,
  whiteSpace: "nowrap",
});
