import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/theme.css";

const colors = {
  crownBackground: "#FF46A9",
  crownForeground: "#FFECF6",
};

export const avatarWrapper = style({
  position: "relative",
  display: "inline-block",
  flexShrink: 0,
});

export const crown = style({
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 15,
  height: 15,
  borderRadius: vars.radius.full,
  backgroundColor: colors.crownBackground,
  color: colors.crownForeground,
});
