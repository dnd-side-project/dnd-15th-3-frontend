import { style } from "@vanilla-extract/css";

import { text } from "../../../../styles/text";

export const root = style({
  display: "flex",
  alignItems: "center",
  gap: 5,
  padding: "0 20px",
  overflowX: "auto",
  scrollPadding: "0 20px",
});

export const place = style({
  position: "relative",
  display: "flex",
  flexShrink: 0,
  alignItems: "flex-end",
  width: 98,
  height: 98,
  padding: 8,
  borderRadius: 10,
  backgroundColor: "#ECEFF5",
  overflow: "hidden",
});

export const thumbnail = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#ECEFF5",
  objectFit: "cover",
});

export const name = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: 4,
  width: "100%",
  color: "#FFFFFF",
  ...text({ size: 12, weight: 600, lineHeight: 1.3 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textShadow: "0 0 4px rgba(0, 0, 0, 0.6)",
});

export const arrow = style({
  flexShrink: 0,
  width: 0,
  height: 0,
  border: "5px solid transparent",
  borderLeft: "8px solid #3793FF",
});

export const addButton = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 98,
  height: 98,
  border: "none",
  borderRadius: 10,
  backgroundColor: "#DBECFF",
  color: "#3793FF",
  cursor: "pointer",
});
