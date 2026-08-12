import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../../../../styles/theme.css";

export const surfaceColor = "#FFFFFF";

const colors = {
  surface: surfaceColor,
  action: "#A8A8A8",
  actionBackdrop: "rgba(185, 185, 185, 0.14)",
  editing: "#3793FF",
};

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  background: colors.surface,
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
    backgroundColor: colors.actionBackdrop,
    cursor: "pointer",
  },
  variants: {
    // 저장 상태를 알리는 시안이 없어 아이콘 색으로만 구분한다.
    editing: {
      true: { color: colors.editing },
      false: { color: colors.action },
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
  color: colors.action,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.5,
  textAlign: "center",
});
