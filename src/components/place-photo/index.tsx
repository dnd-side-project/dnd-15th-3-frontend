import type { PlacePhoto } from "@/domains/catalog/api/types";

export interface PlacePhotoImageProps {
  photo: PlacePhoto | null | undefined;
  alt?: string;
  className?: string;
}

export function PlacePhotoImage({ photo, alt = "", className }: PlacePhotoImageProps) {
  if (photo == null) {
    return <span aria-hidden className={className} />;
  }

  return <img alt={alt} className={className} src={photo.url} />;
}
