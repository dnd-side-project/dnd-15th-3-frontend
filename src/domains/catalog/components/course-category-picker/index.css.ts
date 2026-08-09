import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "../../../../styles/text";

export const selected = style({
  minHeight: 83,
  padding: "0 20px",
});

export const empty = style({
  // 83px 인 선택 영역 안에서 시안의 문구 위치에 맞춘다.
  margin: 0,
  paddingTop: 43,
  color: "#A4B1C5",
  ...text({ size: 14, weight: 400, lineHeight: "20px" }),
  textAlign: "center",
  whiteSpace: "pre-line",
});

export const available = recipe({
  base: {
    padding: "0 20px",
  },
  variants: {
    // 선택한 코스와 카테고리 목록 사이 간격이 화면마다 다르다.
    gap: {
      wide: { marginTop: 71 },
      narrow: { marginTop: 49 },
    },
  },
  defaultVariants: {
    gap: "wide",
  },
});
