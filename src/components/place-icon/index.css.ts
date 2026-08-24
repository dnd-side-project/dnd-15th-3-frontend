import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";

const colors = {
  icon: vars.color.text.inverse,
  restaurant: vars.color.category.restaurant,
  activity: vars.color.category.activity,
  shopping: vars.color.category.shopping,
  walk: vars.color.category.walk,
  bar: vars.color.category.bar,
  culture: vars.color.category.culture,
  cafe: vars.color.category.cafe,
  other: vars.color.category.other,
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
      other: { backgroundColor: colors.other },
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
