import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  icon: "#FFFFFF",
  restaurant: "#FF7751",
  activity: "#3793FF",
  shopping: "#FF46A9",
  walk: "#38C0B3",
  bar: "#A754EB",
  culture: "#28C55F",
  cafe: "#FF9B04",
};

export const root = recipe({
  base: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.radius.full,
    color: colors.icon,
  },
  variants: {
    category: {
      restaurant: { backgroundColor: colors.restaurant },
      activity: { backgroundColor: colors.activity },
      shopping: { backgroundColor: colors.shopping },
      walk: { backgroundColor: colors.walk },
      bar: { backgroundColor: colors.bar },
      culture: { backgroundColor: colors.culture },
      cafe: { backgroundColor: colors.cafe },
    },
    size: {
      16: { width: 16, height: 16 },
      20: { width: 20, height: 20 },
    },
  },
  defaultVariants: {
    size: 20,
  },
});
