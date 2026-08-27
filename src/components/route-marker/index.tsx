import type { CategorySlug } from "@/domains/catalog/api/types";
import { placeFallbackImage } from "@/domains/catalog/place-fallback-images";

import { badge, body, clickable, root, shape, tail, thumbnail } from "./index.css";

export type RouteMarkerTone = "blue" | "pink" | "purple";

export interface RouteMarkerProps {
  index: number;
  category: CategorySlug;
  tone?: RouteMarkerTone;
  imageUrl?: string | null;
  imageAlt?: string;
  onClick?: () => void;
}

export function RouteMarker({
  index,
  category,
  tone = "blue",
  imageUrl,
  imageAlt,
  onClick,
}: RouteMarkerProps) {
  const content = (
    <>
      <div className={shape}>
        <div className={tail} />
        <div className={body}>
          {imageUrl ? (
            <img alt={imageAlt ?? ""} className={thumbnail} src={imageUrl} />
          ) : (
            <img aria-hidden alt="" className={thumbnail} src={placeFallbackImage(category)} />
          )}
        </div>
      </div>
      <span className={badge({ tone })}>{index}</span>
    </>
  );

  if (onClick) {
    return (
      <button
        aria-label={imageAlt ? `${index}번 장소 ${imageAlt}` : `${index}번 장소`}
        className={`${root} ${clickable}`}
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    );
  }

  return <div className={root}>{content}</div>;
}
