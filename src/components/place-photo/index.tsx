import type { CategorySlug, PlacePhoto } from "@/domains/catalog/api/types";
import { placeFallbackImage } from "@/domains/catalog/place-fallback-images";

export interface PlacePhotoImageProps {
  photo: PlacePhoto | null | undefined;
  category: CategorySlug;
  alt?: string;
  className?: string;
}

export function PlacePhotoImage({ photo, category, alt = "", className }: PlacePhotoImageProps) {
  if (photo == null) {
    return <img aria-hidden alt="" className={className} src={placeFallbackImage(category)} />;
  }

  return <img alt={alt} className={className} src={photo.url} />;
}
