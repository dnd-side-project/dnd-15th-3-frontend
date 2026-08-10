import { style } from "@vanilla-extract/css";

// 프레임 배경. sticky 상단 앱바가 같은 색을 깔아야 해서 밖으로 노출한다.
export const surfaceColor = "#F5F6F8";

const colors = {
  backdrop: "#EEEEEE",
  surface: surfaceColor,
};

export const letterbox = style({
  display: "flex",
  justifyContent: "center",
  minHeight: "100dvh",
  background: colors.backdrop,
});

export const frame = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: 393,
  minHeight: "100dvh",
  background: colors.surface,
});
