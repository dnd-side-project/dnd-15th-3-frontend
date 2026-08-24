import { style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

export const card = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: 177,
  height: 247,
  overflow: "hidden",
  backgroundColor: "#FDFDFD",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
});

export const photoArea = style({
  position: "relative",
  alignSelf: "center",
  width: 156,
  height: 134,
  margin: "10px 0 0",
  borderRadius: 5,
  overflow: "hidden",
  background: "linear-gradient(24deg, rgba(102, 173, 255, 0.5) 33%, rgba(172, 189, 255, 0.5) 66%)",
});

export const confetti = style({
  position: "absolute",
  top: 30,
  left: -22,
  width: 200,
  height: 117,
});

export const momoImage = style({
  position: "absolute",
  bottom: -65,
  left: "50%",
  width: "125%",
  height: "135%",
  transform: "translateX(-50%)",
  objectFit: "contain",
  objectPosition: "center bottom",
});

export const dateStamp = style({
  position: "absolute",
  top: 6,
  left: 6,
  color: "#3D3D3D",
  fontFamily: "Montserrat, sans-serif",
  fontSize: 6,
  fontWeight: 400,
  lineHeight: 1,
  whiteSpace: "nowrap",
});

// 포토칸과 본문 배경의 왼쪽 경계, 약간 하단에 붙이는 하트 장식.
export const heartDrawing = style({
  position: "absolute",
  left: 0,
  top: 100,
  width: 24,
  height: 19,
  zIndex: 2,
});

export const body = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "8px 12px 0",
});

export const title = style({
  margin: 0,
  color: "#3D3D3D",
  ...text({ size: 12, weight: 600, lineHeight: 1.2 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const routeLabel = style({
  marginTop: 6,
  color: "#3D3D3D",
  fontFamily: "Montserrat, sans-serif",
  fontSize: 6,
  fontWeight: 400,
  lineHeight: 1,
});

export const route = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 4,
  marginTop: 4,
});

export const routeItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  whiteSpace: "nowrap",
});

export const placeName = style({
  color: "#3D3D3D",
  ...text({ size: 8, weight: 500, lineHeight: 1.4 }),
});

export const arrow = style({
  flexShrink: 0,
  width: 7,
  height: 5,
  color: "#A4B1C5",
});

export const footer = style({
  display: "flex",
  justifyContent: "center",
  padding: "0 0 6px",
});
