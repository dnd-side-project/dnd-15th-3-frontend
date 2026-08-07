import { style } from "@vanilla-extract/css";

import { vars } from "../../styles/theme.css";

const colors = {
  background: "#DBECFF",
  text: "#3793FF",
};

export const bubble = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: 3,
  height: 33,
  marginBottom: 15,
  padding: "0 10px",
  borderRadius: 8,
  backgroundColor: colors.background,
  color: colors.text,
  fontFamily: vars.font.body,
  fontSize: 16,
  fontWeight: 500,
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -13,
      left: "50%",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "13px 7.5px 0 7.5px",
      borderColor: `${colors.background} transparent transparent transparent`,
      transform: "translateX(-50%)",
    },
  },
});
