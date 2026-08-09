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
  | "momo-green";

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

export interface PlaceSearchResponse {
  id: string;
  categoryId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  previewUrl: string;
}

export interface FirstMeetingPlaceResponse {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
