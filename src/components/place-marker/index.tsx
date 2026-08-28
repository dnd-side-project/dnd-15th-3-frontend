import ActivityIcon from "@/assets/icon-place-activity.svg?react";
import BarIcon from "@/assets/icon-place-bar.svg?react";
import CafeIcon from "@/assets/icon-place-cafe.svg?react";
import CultureIcon from "@/assets/icon-place-culture.svg?react";
import OtherIcon from "@/assets/icon-place-other.svg?react";
import RestaurantIcon from "@/assets/icon-place-restaurant.svg?react";
import ShoppingIcon from "@/assets/icon-place-shopping.svg?react";
import WalkIcon from "@/assets/icon-place-walk.svg?react";
import type { PlaceCategory } from "@/components/place-icon";

import { iconWrap, pin, root } from "./index.css";

export type { PlaceCategory };

export interface PlaceMarkerProps {
  category: PlaceCategory;
  label?: string;
  onClick?: () => void;
}

const glyphs: Record<PlaceCategory, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  restaurant: RestaurantIcon,
  activity: ActivityIcon,
  shopping: ShoppingIcon,
  walk: WalkIcon,
  bar: BarIcon,
  culture: CultureIcon,
  cafe: CafeIcon,
  other: OtherIcon,
};

export function PlaceMarker({ category, label, onClick }: PlaceMarkerProps) {
  const Glyph = glyphs[category];

  return (
    <button aria-label={label ?? "장소 마커"} className={root} onClick={onClick} type="button">
      <svg
        className={pin({ category })}
        viewBox="0 0 41 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.5 0C9.178 0 0 9.178 0 20.5C0 31.822 20.5 51 20.5 51C20.5 51 41 31.822 41 20.5C41 9.178 31.822 0 20.5 0Z"
          fill="currentColor"
        />
      </svg>
      <span className={iconWrap}>
        <Glyph height={20} width={20} />
      </span>
    </button>
  );
}
