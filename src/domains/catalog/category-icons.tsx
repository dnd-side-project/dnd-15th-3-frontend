import type { ComponentType, SVGProps } from "react";

import ActivityIcon from "../../assets/icon-place-activity.svg?react";
import BarIcon from "../../assets/icon-place-bar.svg?react";
import CafeIcon from "../../assets/icon-place-cafe.svg?react";
import CultureIcon from "../../assets/icon-place-culture.svg?react";
import OtherIcon from "../../assets/icon-place-other.svg?react";
import RestaurantIcon from "../../assets/icon-place-restaurant.svg?react";
import ShoppingIcon from "../../assets/icon-place-shopping.svg?react";
import WalkIcon from "../../assets/icon-place-walk.svg?react";
import type { CategorySlug } from "./api/types";

const CATEGORY_ICONS: Record<CategorySlug, ComponentType<SVGProps<SVGSVGElement>>> = {
  restaurant: RestaurantIcon,
  cafe: CafeIcon,
  bar: BarIcon,
  walk: WalkIcon,
  shopping: ShoppingIcon,
  activity: ActivityIcon,
  culture: CultureIcon,
  other: OtherIcon,
};

export function CategoryIcon({ slug, size = 20 }: { slug: CategorySlug; size?: number }) {
  const Icon = CATEGORY_ICONS[slug];
  return <Icon aria-hidden height={size} width={size} />;
}
