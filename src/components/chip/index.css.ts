import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const chipColor = {
  unselectedBackground: "#ECEFF5",
  unselectedText: "#6D6D6D",
  unselectedIcon: "#A4B1C5",
  selectedBackground: "#606060",
  selectedText: "#FFFFFF",
};

export const chipContainer = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.xs,
    borderRadius: vars.radius.full,
    boxSizing: "border-box",
    width: "fit-content",
  },
  variants: {
    selected: {
      false: { backgroundColor: chipColor.unselectedBackground },
      true: { backgroundColor: chipColor.selectedBackground },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export const chipLabel = recipe({
  base: {
    appearance: "none",
    border: "none",
    background: "transparent",
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.xs,
    padding: `${vars.space.xs} ${vars.space.sm}`,
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.sm,
    fontWeight: vars.fontWeight.medium,
    lineHeight: 1.4,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  variants: {
    selected: {
      false: { color: chipColor.unselectedText },
      true: { color: chipColor.selectedText },
    },
    removable: {
      true: { paddingRight: vars.space.none },
      false: {},
    },
  },
  defaultVariants: {
    selected: false,
    removable: false,
  },
});

export const chipIcon = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
  },
  variants: {
    selected: {
      false: { color: chipColor.unselectedIcon },
      true: { color: chipColor.selectedText },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export const chipRemoveButton = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  marginRight: vars.space.sm,
  color: chipColor.selectedText,
  cursor: "pointer",
  borderRadius: vars.radius.full,
});

export const chipGroup = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
});
