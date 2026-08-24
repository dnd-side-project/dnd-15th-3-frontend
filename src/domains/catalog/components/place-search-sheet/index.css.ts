import { style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: 30,
  paddingTop: 11,
  paddingBottom: 30,
});

export const search = style({
  padding: "0 20px",
});

export const searchIcon = style({
  flexShrink: 0,
  color: "#707D91",
});

export const results = style({
  display: "flex",
  flexDirection: "column",
  padding: "0 20px",
});

export const result = style({
  display: "block",
  width: "100%",
  padding: "16px 3px",
  border: "none",
  borderTop: `1px solid ${"#ECEFF5"}`,
  background: "none",
  color: "#000000",
  ...text({ size: 16, weight: 400, lineHeight: 1.2 }),
  textAlign: "left",
  cursor: "pointer",
  selectors: {
    "&:last-child": { borderBottom: `1px solid ${"#ECEFF5"}` },
  },
});

export const empty = style({
  padding: "16px 3px",
  color: "#707D91",
  ...text({ size: 16, weight: 400, lineHeight: 1.2 }),
});
