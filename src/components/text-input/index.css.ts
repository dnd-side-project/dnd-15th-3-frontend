import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

// 와이어프레임 단계라 정확한 색상은 확정되지 않음. 공용 theme 토큰과의 충돌을 피하기 위해
// 텍스트 인풋 전용 색상은 이 파일 안에 로컬 값으로 둔다.
const localColor = {
  roundedBackground: "#eef0f5",
  pillBackground: "#ffffff",
  pillBorder: "#e2e4ea",
  placeholder: "#9096a3",
};

export const wrapper = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.xs,
    width: "100%",
    boxSizing: "border-box",
    paddingLeft: vars.space.md,
    paddingRight: vars.space.md,
  },
  variants: {
    shape: {
      rounded: {
        backgroundColor: localColor.roundedBackground,
        borderRadius: vars.radius.md,
      },
      pill: {
        backgroundColor: localColor.pillBackground,
        border: `1px solid ${localColor.pillBorder}`,
        borderRadius: vars.radius.full,
      },
    },
  },
  defaultVariants: {
    shape: "rounded",
  },
});

export const input = style({
  flex: 1,
  minWidth: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  paddingTop: vars.space.sm,
  paddingBottom: vars.space.sm,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  color: vars.color.text,

  "::placeholder": {
    color: localColor.placeholder,
  },
});

export const adornment = style({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
  color: localColor.placeholder,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.sm,
});
