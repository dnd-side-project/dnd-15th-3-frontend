import { globalStyle, style } from "@vanilla-extract/css";

export const root = style({
  position: "absolute",
  inset: 0,
  backgroundColor: "#E9EEF5",
  pointerEvents: "none",
});

// leaflet.css 의 `.leaflet-container .leaflet-marker-pane img { width: auto; ... }` 규칙이
// 마커 썸네일 <img> 의 width/height 를 덮어쓰는 것을 막는다. (특이도 (0,3,1) 로 제압)
globalStyle(`${root} .leaflet-marker-pane img`, {
  width: 68,
  height: 68,
  maxWidth: "none",
  maxHeight: "none",
  padding: 0,
});

export const map = style({
  width: "100%",
  height: "100%",
});

export const attribution = style({
  fontSize: "8px !important",
});
