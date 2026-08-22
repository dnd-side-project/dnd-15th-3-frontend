import { style } from "@vanilla-extract/css";

import { text } from "../../../../styles/text";

const colors = {
  label: "#262626",
  description: "#707D91",
  fieldBackground: "#ECEFF5",
  fieldText: "#3D3D3D",
  placeholder: "#707D91",
  icon: "#707D91",
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
  ...text({ size: 20, weight: 600, lineHeight: 1.2 }),
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
  ...text({ size: 16, weight: 500, lineHeight: 1.2 }),
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
  marginTop: 35,
});

export const picker = style({
  marginTop: 25,
});
