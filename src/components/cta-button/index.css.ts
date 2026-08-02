import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

// Figma 와이어프레임 기준 로컬 색상값 (공용 theme.css.ts 토큰과는 별개)
const colors = {
  primary: "#57a5ff",
  primaryPressed: "#eaf2ff",
  disabledBackground: "#a1a3a7",
  disabledText: "#ffffff",
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
          },
        },
      },
      secondary: {
        backgroundColor: colors.secondaryBackground,
        color: colors.secondaryText,
      },
    },
    disabled: {
      true: {
        backgroundColor: colors.disabledBackground,
        color: colors.disabledText,
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
