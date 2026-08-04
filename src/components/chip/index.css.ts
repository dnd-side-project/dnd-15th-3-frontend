import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const chipColor = {
  unselectedBackground: "#ECEFF5",
  unselectedText: "#6D6D6D",
  unselectedIcon: "#A4B1C5",
  // TODO(design): 필터바는 #3D3D3D, 코스/카테고리는 #606060로 시안이 갈린다.
  // 디자이너 확인 전까지 tone으로 둘 다 지원한다.
  selectedBackground: "#606060",
  selectedStrongBackground: "#3D3D3D",
  selectedText: "#FFFFFF",
  overlayBackground: "#F5F6F8",
  overlayBorder: "#DADADA",
  overlayText: "#3D3D3D",
};

const paddingX = createVar();
const iconColor = createVar();

export const chipContainer = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: vars.radius.full,
    boxSizing: "border-box",
    width: "fit-content",
    fontFamily: vars.font.body,
    fontSize: 14,
    fontWeight: vars.fontWeight.medium,
    lineHeight: 1.4,
  },
  variants: {
    size: {
      sm: { minHeight: 34, vars: { [paddingX]: "12px" } },
      md: { minHeight: 38, vars: { [paddingX]: "16px" } },
    },
    variant: {
      filled: {},
      overlay: {
        backgroundColor: chipColor.overlayBackground,
        color: chipColor.overlayText,
        boxShadow: `inset 0 0 0 1px ${chipColor.overlayBorder}, 0 2px 6px rgba(0, 0, 0, 0.08)`,
        vars: { [iconColor]: "currentColor" },
      },
    },
    tone: {
      default: {},
      strong: {},
    },
    selected: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { selected: false, variant: "filled" },
      style: {
        backgroundColor: chipColor.unselectedBackground,
        color: chipColor.unselectedText,
        vars: { [iconColor]: chipColor.unselectedIcon },
      },
    },
    {
      variants: { selected: true, tone: "default", variant: "filled" },
      style: {
        backgroundColor: chipColor.selectedBackground,
        color: chipColor.selectedText,
        vars: { [iconColor]: chipColor.selectedText },
      },
    },
    {
      variants: { selected: true, tone: "strong", variant: "filled" },
      style: {
        backgroundColor: chipColor.selectedStrongBackground,
        color: chipColor.selectedText,
        vars: { [iconColor]: chipColor.selectedText },
      },
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "filled",
    tone: "default",
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
    alignSelf: "stretch",
    gap: 6,
    padding: `0 ${paddingX}`,
    font: "inherit",
    color: "inherit",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  variants: {
    removable: {
      true: { paddingRight: 0 },
      false: {},
    },
  },
  defaultVariants: {
    removable: false,
  },
});

export const chipIcon = style({
  display: "inline-flex",
  alignItems: "center",
  color: iconColor,
});

export const chipRemoveButton = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "stretch",
  padding: "0 4px",
  marginRight: `calc(${paddingX} - 4px)`,
  color: "inherit",
  cursor: "pointer",
  borderRadius: vars.radius.full,
});

export const chipGroup = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
});
