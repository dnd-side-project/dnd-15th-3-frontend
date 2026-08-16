import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "../../../../../styles/text";

export const surfaceColor = "#FFFFFF";

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  background: surfaceColor,
});

export const intro = style({
  marginTop: 30,
});

export const editButton = recipe({
  base: {
    position: "absolute",
    top: -3,
    right: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 29,
    height: 30,
    padding: 0,
    border: "none",
    borderRadius: 16,
    backgroundColor: "rgba(185, 185, 185, 0.14)",
    cursor: "pointer",
  },
  variants: {
    // 저장 상태를 알리는 시안이 없어 아이콘 색으로만 구분한다.
    editing: {
      true: { color: "#3793FF" },
      false: { color: "#A8A8A8" },
    },
  },
  defaultVariants: {
    editing: false,
  },
});

export const picker = style({
  marginTop: 37,
});

export const status = style({
  padding: "40px 20px",
  color: "#A8A8A8",
  ...text({ size: 16, weight: 500, lineHeight: 1.5 }),
  textAlign: "center",
});
