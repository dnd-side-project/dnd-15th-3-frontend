import { style } from "@vanilla-extract/css";

import { palette } from "@/styles/palette";

import { vars } from "@/styles/theme.css";

// 프레임 배경. sticky 상단 앱바가 같은 색을 깔아야 해서 밖으로 노출한다.
export const surfaceColor = vars.color.surface.app;

const colors = {
  backdrop: palette.neutral1,
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
