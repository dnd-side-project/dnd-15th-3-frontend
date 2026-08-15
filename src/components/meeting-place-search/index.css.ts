import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/theme.css";

const colors = {
  description: "#707D91",
  divider: "#ECEFF5",
  resultText: "#000000",
  match: "#3793FF",
  icon: "#707D91",
};

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: 30,
  paddingTop: 11,
  paddingBottom: 30,
});

export const search = style({
  padding: "0 20px",
});

export const results = style({
  height: 103,
  display: "flex",
  flexDirection: "column",
  padding: "0 20px",
  overflowY: "auto",
});

export const result = style({
  width: "100%",
  padding: "16px 3px",
  height: 51,
  border: "none",
  borderTop: `1px solid ${colors.divider}`,
  background: "none",
  color: colors.resultText,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 400,
  textAlign: "left",
  cursor: "pointer",
  selectors: {
    "&:last-child": { borderBottom: `1px solid ${colors.divider}` },
  },
});

export const match = style({
  color: colors.match,
});

export const empty = style({
  padding: "16px 3px",
  color: colors.description,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 400,
});

export const searchIcon = style({
  color: colors.icon,
});
