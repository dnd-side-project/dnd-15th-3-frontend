import { style } from "@vanilla-extract/css";

import { vars } from "../../../../styles/theme.css";

const colors = {
  label: "#262626",
  heading: "#3D3D3D",
  description: "#707D91",
  fieldBackground: "#ECEFF5",
  fieldText: "#3D3D3D",
  placeholder: "#707D91",
  icon: "#707D91",
  divider: "#ECEFF5",
  resultText: "#000000",
  match: "#3793FF",
};

export const location = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginTop: 45,
  padding: "0 20px",
});

export const locationLabel = style({
  margin: "0 3px",
  color: colors.label,
  fontFamily: vars.font.body,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 1.2,
});

export const locationField = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  width: "100%",
  height: 54,
  padding: "0 13px",
  border: "none",
  borderRadius: 8,
  backgroundColor: colors.fieldBackground,
  color: colors.fieldText,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.2,
  textAlign: "left",
  cursor: "pointer",
});

export const locationPlaceholder = style({
  color: colors.placeholder,
});

export const searchIcon = style({
  flexShrink: 0,
  color: colors.icon,
});

export const intro = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginTop: 35,
  padding: "0 23px",
});

export const introTitle = style({
  margin: 0,
  color: colors.heading,
  fontFamily: vars.font.body,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 1.2,
});

export const introDescription = style({
  margin: 0,
  color: colors.description,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.2,
});

export const picker = style({
  marginTop: 25,
});

export const sheetBody = style({
  display: "flex",
  flexDirection: "column",
  gap: 30,
  paddingTop: 11,
  paddingBottom: 30,
});

export const sheetSearch = style({
  padding: "0 19.5px",
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
  borderTop: `1px solid ${colors.divider}`,
  background: "none",
  color: colors.resultText,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "19.09px",
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
  lineHeight: "19.09px",
});
