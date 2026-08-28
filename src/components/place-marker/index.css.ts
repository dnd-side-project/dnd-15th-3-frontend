import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";

const colors = {
  restaurant: vars.color.category.restaurant,
  activity: vars.color.category.activity,
  shopping: vars.color.category.shopping,
  walk: vars.color.category.walk,
  bar: vars.color.category.bar,
  culture: vars.color.category.culture,
  cafe: vars.color.category.cafe,
  other: vars.color.category.other,
};

export const root = style({
  position: "relative",
  display: "block",
  width: 41,
  height: 51,
  padding: 0,
  border: "none",
  background: "none",
  overflow: "visible",
  cursor: "pointer",
});

export const pin = recipe({
  base: {
    display: "block",
    width: 41,
    height: 51,
  },
  variants: {
    category: {
      restaurant: { color: colors.restaurant },
      activity: { color: colors.activity },
      shopping: { color: colors.shopping },
      walk: { color: colors.walk },
      bar: { color: colors.bar },
      culture: { color: colors.culture },
      cafe: { color: colors.cafe },
      other: { color: colors.other },
    },
  },
});

export const iconWrap = style({
  position: "absolute",
  top: 10,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  color: "#FFFFFF",
});
