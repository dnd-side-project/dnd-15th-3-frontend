import { style } from "@vanilla-extract/css";

import { vars } from "../../../../../../styles/theme.css";

export const tabs = style({
  margin: "20px auto 0",
  width: 353,
  height: 45,
});

export const editFab = style({
  position: "absolute",
  right: 20,
  // 모임 상세 버튼과 같은 높이. bottomStack 의 paddingBottom 과 같다.
  bottom: "var(--bottom-offset, 0px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 50,
  height: 50,
  padding: 0,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: "#4C9FFF",
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.25)",
  color: "#FFFFFF",
  cursor: "pointer",
  pointerEvents: "auto",
  zIndex: 3,
});
