import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const chipColor = {
  unselectedBackground: "#F0F0F0",
  unselectedBorder: "#E0E0E0",
  unselectedText: "#333333",
  selectedBackground: "#4A4A4A",
  selectedText: "#FFFFFF",
};

export const chipContainer = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.xs,
    borderRadius: vars.radius.full,
    boxSizing: "border-box",
  },
  variants: {
    selected: {
      false: {
        backgroundColor: chipColor.unselectedBackground,
        border: `1px solid ${chipColor.unselectedBorder}`,
      },
      true: {
        backgroundColor: chipColor.selectedBackground,
        border: "1px solid transparent",
      },
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
