import ActivityIcon from "../../assets/icon-place-activity.svg?react";
import BarIcon from "../../assets/icon-place-bar.svg?react";
import CafeIcon from "../../assets/icon-place-cafe.svg?react";
import CultureIcon from "../../assets/icon-place-culture.svg?react";
import EllipsisIcon from "../../assets/icon-ellipsis.svg?react";
import RestaurantIcon from "../../assets/icon-place-restaurant.svg?react";
import ShoppingIcon from "../../assets/icon-place-shopping.svg?react";
import WalkIcon from "../../assets/icon-place-walk.svg?react";

import { root } from "./index.css";

export type PlaceCategory =
  | "restaurant"
  | "activity"
  | "shopping"
  | "walk"
  | "bar"
  | "culture"
  | "cafe"
  | "other";

export interface PlaceIconProps {
  category: PlaceCategory;
  size?: 16 | 20;
  label?: string;
}

const glyphs = {
  restaurant: RestaurantIcon,
  activity: ActivityIcon,
  shopping: ShoppingIcon,
  walk: WalkIcon,
  bar: BarIcon,
  culture: CultureIcon,
  cafe: CafeIcon,
  other: EllipsisIcon,
};

export function PlaceIcon({ category, size = 20, label }: PlaceIconProps) {
  const Glyph = glyphs[category];

  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={root({ category, size })}
      role={label ? "img" : undefined}
    >
      <Glyph height={12} width={12} />
    </span>
  );
}
