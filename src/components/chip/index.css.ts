import { createVar, globalStyle, style } from "@vanilla-extract/css";
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

// 아이콘 래퍼 span 없이 직계 자식 svg에 색을 준다 (DOM depth 한 단계 절약)
export const chipIconHost = style({});
globalStyle(`${chipIconHost} > svg`, { color: iconColor });

export const chipContainer = recipe({
  base: {
    appearance: "none",
    border: "none",
    background: "none",
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
    // 삭제 버튼이 없으면 컨테이너 자체가 라벨 버튼이 되어 래퍼가 사라진다.
    standalone: {
      true: {
        gap: 6,
        padding: `0 ${paddingX}`,
        cursor: "pointer",
      },
      false: {},
    },
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
    standalone: false,
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
