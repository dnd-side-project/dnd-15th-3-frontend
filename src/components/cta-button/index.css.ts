import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

// Figma 와이어프레임 기준 로컬 색상값 (공용 theme.css.ts 토큰과는 별개)
const colors = {
  primary: "#57a5ff",
  primaryPressed: "#eaf2ff",
  primaryPressedText: "#3182f6",
  secondaryBackground: "#f2f3f5",
  secondaryText: "#4e5257",
  white: "#ffffff",
};

export const button = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // width는 단독 배치(full-width) 시, flex는 row 배치 시 각각 적용된다.
    width: "100%",
    flex: "1 1 0%",
    height: "52px",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: colors.primary,
        color: colors.white,
        selectors: {
          "&:active": {
            backgroundColor: colors.primaryPressed,
            color: colors.primaryPressedText,
          },
        },
      },
      secondary: {
        backgroundColor: colors.secondaryBackground,
        color: colors.secondaryText,
      },
    },
    // Figma 상 비활성 버튼은 "위로" 보조 버튼과 동일한 연회색 배경 + 짙은 텍스트 조합을 쓴다
    // (짙은 회색 배경 + 흰 텍스트가 아님에 유의).
    disabled: {
      true: {
        backgroundColor: colors.secondaryBackground,
        color: colors.secondaryText,
        cursor: "not-allowed",
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: "primary",
    disabled: false,
  },
});

export const row = style({
  display: "flex",
  gap: "8px",
  width: "100%",
});

export const rowBackButton = style({
  flex: "0 0 88px",
});

export const rowNextButton = style({
  flex: "1 1 0%",
});
