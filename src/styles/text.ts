import { vars } from "./theme.css";

interface TextStyle {
  size: number;
  weight: number;
  lineHeight?: string | number;
}

/** 스타일마다 반복되는 글꼴 네 줄을 한 줄로 줄인다. */
export const text = ({ size, weight, lineHeight }: TextStyle) => ({
  fontFamily: vars.font.body,
  fontSize: size,
  fontWeight: weight,
  ...(lineHeight === undefined ? {} : { lineHeight }),
});
