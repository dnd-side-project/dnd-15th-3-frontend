import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "../../../../styles/text";

import { vars } from "../../../../styles/theme.css";

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflow: "hidden",
});

export const toggle = style({
  position: "absolute",
  top: 20,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1,
});

export const chips = style({
  position: "absolute",
  top: 81,
  left: 0,
  right: 0,
  zIndex: 1,
  padding: "0 15px",
});

// 시트 높이가 화면마다 달라, 지도 위 버튼이 시트를 따라 올라오도록 함께 묶는다.
export const bottomStack = style({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: 14,
  // 버튼과 시트를 뺀 영역은 지도가 받아야 한다.
  pointerEvents: "none",
});

export const bottomActions = style({
  pointerEvents: "auto",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  gap: 7,
  alignItems: "flex-start",
  alignSelf: "flex-start",
  marginLeft: 20,
});

export const meetingPill = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  height: 35,
  padding: "0 7px",
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: "#3D4A5C",
  boxShadow: "0 0 6px rgba(0, 0, 0, 0.25)",
  color: "#FFFFFF",
  ...text({ size: 14, weight: 600, lineHeight: "22px" }),
  cursor: "pointer",
});

export const pillIcon = style({
  flexShrink: 0,
  width: 23,
  height: 23,
});

export const sheet = recipe({
  base: {
    pointerEvents: "auto",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    borderRadius: "24px 24px 0 0",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 4px 70px rgba(0, 0, 0, 0.2)",
  },
  variants: {
    dragging: {
      // 끄는 동안에는 손가락을 그대로 따라와야 한다.
      true: {},
      false: { transition: "height 250ms ease-out, border-radius 250ms ease-out" },
    },
  },
});

export const grabber = style({
  display: "flex",
  flexShrink: 0,
  touchAction: "none",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
});

export const grabberBar = style({
  width: 50,
  height: 5,
  borderRadius: 10,
  backgroundColor: "#D1D1D1",
});
