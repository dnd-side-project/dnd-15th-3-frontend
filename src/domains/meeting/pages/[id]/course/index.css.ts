import { style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const status = style({
  ...text({ size: 15, weight: 500 }),
  color: vars.color.text.secondaryAlt,
  textAlign: "center",
  padding: "40px 20px",
});
