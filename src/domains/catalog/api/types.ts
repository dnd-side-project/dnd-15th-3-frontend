/** URL·식별자에 사용할 카테고리 슬러그 */
export type CategorySlug =
  | "restaurant"
  | "cafe"
  | "bar"
  | "walk"
  | "shopping"
  | "activity"
  | "culture"
  | "other";

/** 모임 유형 코드 */
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

/** 캐릭터 식별자. 프론트엔드가 앱 내 이미지와 매핑합니다. */
export type ProfileAvatarId =
  | "momo-blue"
  | "momo-yellow"
  | "momo-purple"
  | "momo-pink"
  | "momo-green";

export interface MeetingTypeResponse {
  id: string;
  code: MeetingTypeCode;
  /** 화면에 표시할 모임 유형명 */
  name: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  slug: CategorySlug;
}

export interface ProfileAvatarResponse {
  id: ProfileAvatarId;
  /** 캐릭터 이름 */
  name: string;
}

export interface PlaceSearchResponse {
  id: string;
  /** 장소가 속한 카테고리 ID */
  categoryId: string;
  name: string;
  /** 도로명 또는 지번 주소 */
  address: string;
  latitude: number;
  longitude: number;
  /** 대표 이미지 또는 미리보기 URL */
  previewUrl: string;
}

export interface FirstMeetingPlaceResponse {
  /** 내부에서 사용할 장소 ID */
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
