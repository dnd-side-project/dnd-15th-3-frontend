import { badge, body, clickable, root, shape, tail, thumbnail } from "./index.css";

export type RouteMarkerTone = "blue" | "pink" | "purple";

export interface RouteMarkerProps {
  index: number;
  tone?: RouteMarkerTone;
  imageUrl?: string;
  imageAlt?: string;
  onClick?: () => void;
}

export function RouteMarker({
  index,
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
            <div className={thumbnail} />
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
