export const CATEGORY_SLUGS = [
  "restaurant",
  "activity",
  "shopping",
  "walk",
  "bar",
  "culture",
  "cafe",
  "other",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type MeetingTypeCode =
  | "SOCIAL"
  | "DATING_HOBBY"
  | "COMPANY_DINNER"
  | "FAMILY"
  | "TRAVEL"
  | "STUDY"
  | "BUSINESS"
  | "ANNIVERSARY_EXERCISE"
  | "OTHER";

export type ProfileAvatarId =
  | "momo-blue"
  | "momo-yellow"
  | "momo-purple"
  | "momo-pink"
  | "momo-green"
  | "momo-mint";

export interface MeetingTypeResponse {
  id: string;
  code: MeetingTypeCode;
  name: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  slug: CategorySlug;
}

export interface ProfileAvatarResponse {
  id: ProfileAvatarId;
  name: string;
}

export type PlacePhotoSource = "OWNED" | "GOOGLE";

export interface PlacePhotoAttribution {
  displayName: string;
  uri: string | null;
  photoUri: string | null;
}

/** `url` 은 이번 응답에서만 쓰고 영구 저장하지 않는다. */
export interface PlacePhoto {
  id: string;
  url: string;
  width: number | null;
  height: number | null;
  source: PlacePhotoSource;
  attributions: PlacePhotoAttribution[];
  googleMapsUri: string | null;
  flagContentUri: string | null;
}

export interface PlaceSearchCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PlaceSearchItem {
  id: string;
  name: string;
  address: string;
  category: PlaceSearchCategory;
  latitude: number;
  longitude: number;
  /** 모임 기준 위치로부터의 거리 */
  distanceMeters: number;
  previewPhoto: PlacePhoto | null;
}

/** 검색 결과와 달리 카테고리를 id 로만 준다. */
export interface SimilarPlace {
  id: string;
  categoryId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  previewPhoto: PlacePhoto | null;
}

export type PlaceCollectionStatus = "PENDING" | "RUNNING" | "READY" | "PARTIAL" | "FAILED";

export interface PlaceSearchResponse {
  items: PlaceSearchItem[];
  page: number;
  size: number;
  total: number;
  hasNext: boolean;
  collectionStatus: PlaceCollectionStatus;
  lastSyncedAt: string | null;
}

export interface PlaceDetail {
  placeId: string;
  category: string;
  categorySlug: CategorySlug;
  name: string;
  address: string;
  photos: PlacePhoto[];
  previewPhoto: PlacePhoto | null;
}

export interface FirstMeetingPlaceResponse {
  id: string;
  externalAddressId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
