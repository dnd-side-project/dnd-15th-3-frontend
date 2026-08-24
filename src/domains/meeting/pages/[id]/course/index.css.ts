import { style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

export const status = style({
  ...text({ size: 15, weight: 500 }),
  color: "#7D7D7D",
  textAlign: "center",
  padding: "40px 20px",
});
