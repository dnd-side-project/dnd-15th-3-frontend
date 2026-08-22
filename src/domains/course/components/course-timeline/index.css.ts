import { style } from "@vanilla-extract/css";

import { text } from "../../../../styles/text";

import { vars } from "../../../../styles/theme.css";

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  margin: 0,
  padding: "0 25px 0 30px",
  listStyle: "none",
});

export const item = style({
  position: "relative",
  display: "flex",
  gap: 20,
  selectors: {
    // 마지막 장소 뒤로는 선을 잇지 않는다.
    "&:not(:last-child)::before": {
      content: "",
      position: "absolute",
      top: 20,
      bottom: -12,
      left: 10,
      width: 1,
      backgroundColor: "#3793FF",
    },
  },
});

export const badge = style({
  zIndex: 1,
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  borderRadius: vars.radius.full,
  backgroundColor: "#3793FF",
  color: "#FFFFFF",
  ...text({ size: 12, weight: 600, lineHeight: 1 }),
});

export const body = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 6,
  minWidth: 0,
});

export const place = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  height: 90,
  padding: "0 11px",
  border: "none",
  borderRadius: 10,
  backgroundColor: "#F5F6F8",
  color: "#A4B1C5",
  textAlign: "left",
  cursor: "pointer",
});

export const thumbnail = style({
  flexShrink: 0,
  width: 70,
  height: 70,
  borderRadius: 8,
  backgroundColor: "#ECEFF5",
  objectFit: "cover",
});

export const texts = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 4,
  minWidth: 0,
});

export const name = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  color: "#262626",
  ...text({ size: 16, weight: 600, lineHeight: 1.4 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const address = style({
  color: "#7D7D7D",
  ...text({ size: 13, weight: 500, lineHeight: 1.4 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const walk = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 30,
  padding: "0 12px",
  borderRadius: 8,
  backgroundColor: "#F4F9FF",
  color: "#3793FF",
  ...text({ size: 13, weight: 500, lineHeight: 1.2 }),
});

export const walkTime = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
});

export const routeLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  color: "#3793FF",
  textDecoration: "none",
});
