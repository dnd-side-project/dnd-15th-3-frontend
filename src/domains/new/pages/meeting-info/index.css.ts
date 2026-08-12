import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "../../../../styles/text";

const colors = {
  nameLabel: "#262626",
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
  ...text({ size: 20, weight: 600, lineHeight: 1.2 }),
});

export const intro = style({
  marginTop: 36,
});

export const types = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "18px 17px",
  marginTop: 28,
  padding: "0 26px",
});

export const typeCard = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    height: 102,
    padding: "10px 4px",
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
  ...text({ size: 14, weight: 600, lineHeight: 1.5 }),
  whiteSpace: "nowrap",
});
