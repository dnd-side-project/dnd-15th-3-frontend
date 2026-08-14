export type CategorySlug =
  | "restaurant"
  | "cafe"
  | "bar"
  | "walk"
  | "shopping"
  | "activity"
  | "culture"
  | "other";

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

export interface PlaceSearchItem {
  id: string;
  name: string;
  address: string;
  category: CategoryResponse;
  latitude: number;
  longitude: number;
  /** 모임 기준 위치로부터의 거리 */
  distanceMeters: number;
  /** 이미지 수집 전에는 null */
  previewUrl: string | null;
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

/** 장소 상세. 검색 결과와 달리 사진을 여러 장 준다. */
export interface PlaceDetail {
  placeId: string;
  category: string;
  categorySlug: CategorySlug;
  name: string;
  address: string;
  primaryImageUrl?: string;
  imageUrls?: string[];
  previewUrl?: string;
}

export interface FirstMeetingPlaceResponse {
  id: string;
  externalAddressId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
