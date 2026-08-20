import type { CategorySlug, MeetingTypeCode, ProfileAvatarId } from "../../catalog/api/types";

export type ParticipantRole = "HOST" | "MEMBER";

export type ViewerPreference = "LIKE" | "DISLIKE";

export interface ParticipantProfile {
  userKey: string;
  nickname: string;
  profileAvatarId: ProfileAvatarId;
}

export interface CreateMeetingRequest {
  meetingTypeCode: MeetingTypeCode;
  name: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:mm */
  time: string;
  /** 첫 만남 위치 검색 결과에서 고른 위치 */
  firstMeetingLocation: MeetingLocation;
  /** 배열 순서가 코스 진행 순서. 1~6개. */
  categorySlugs: CategorySlug[];
  host: ParticipantProfile;
}

export interface MeetingPermissions {
  canManageMeeting: boolean;
  canSelectCourse: boolean;
  canShareInvitation: boolean;
}

export interface MeetingTypeSummary {
  id: string;
  code: MeetingTypeCode;
  name: string;
}

export interface PlaceSummary {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  /**
   * 이미지 수집 전에는 null.
   * @deprecated 서버 `PlaceSummaryDto` 에 없는 필드입니다. 추가를 요청 중입니다.
   */
  previewUrl: string | null;
}

/** 첫 만남 기준 위치. 장소(PlaceSummary)와 달리 주소 검색 결과에서 온다. */
export interface MeetingLocation {
  displayName: string;
  address: string;
  latitude: number;
  longitude: number;
  externalAddressId?: string | null;
}

export interface MeetingLocationResponse extends MeetingLocation {
  id: string;
  syncVersion: number;
}

export interface MeetingParticipant {
  id: string;
  nickname: string;
  role: ParticipantRole;
  profileAvatarId: ProfileAvatarId;
}

export interface CourseCategoryStep {
  id: string;
  name: string;
  slug: CategorySlug;
  order: number;
}

export interface RecommendationPreview {
  id: string;
  categoryId: string;
  place: PlaceSummary;
  recommendedByParticipantId: string;
  likeCount: number;
  dislikeCount: number;
  viewerPreference?: ViewerPreference | null;
}

export interface SelectedCourse {
  id: string;
  /** 배열 순서가 이동 순서 */
  recommendationIds: string[];
}

export interface MeetingScreen {
  id: string;
  /** @deprecated `id` 를 사용합니다. */
  meetingId: string;
  invitationCode: string;
  /** 초대 코드를 대신해 상세 조회에 쓰는 재접속 토큰 */
  participantAccessToken: string;
  invitationUrl: string;
  name: string;
  date: string;
  time: string;
  role: ParticipantRole;
  isHost: boolean;
  permissions: MeetingPermissions;
  meetingType: MeetingTypeSummary;
  meetingTypeCode: MeetingTypeCode;
  host: ParticipantProfile;
  categorySlugs: CategorySlug[];
  firstLocation: MeetingLocationResponse;
  viewerParticipantId: string;
  participants: MeetingParticipant[];
  categorySteps: CourseCategoryStep[];
  recommendations: RecommendationPreview[];
  selectedCourse: SelectedCourse | null;
}

export interface CoursePlan {
  meetingId: string;
  maxSteps: number;
  version: number;
  categorySteps: CourseCategoryStep[];
}

export interface UpdateCoursePlanRequest {
  /** 비우면 코스를 모두 삭제한다. 0~6개. */
  categorySlugs: CategorySlug[];
  /** 조회한 버전. 다른 변경이 먼저 저장되면 409. */
  version: number;
}

export interface MeetingInvitation {
  meetingId: string;
  invitationCode: string;
  invitationUrl: string;
  name: string;
  date: string;
  time: string;
  locationId: string;
}

export interface JoinMeetingRequest extends ParticipantProfile {
  invitationCode: string;
}

export type MeetingStatusKind =
  | "RECOMMENDATION_COLLECTING"
  | "COURSE_GENERATING"
  | "COURSE_GENERATED"
  | "COURSE_GENERATION_FAILED"
  | "COURSE_CONFIRMED";

export interface MeetingStatus {
  status: MeetingStatusKind;
  confirmedCourseCandidateId: string | null;
}

export interface MapPin {
  placeId: string;
  name: string;
  category: string;
  categorySlug: CategorySlug;
  longitude: number;
  latitude: number;
}

export interface MapPins {
  startPlace: MapPin;
  sharedPlaces: MapPin[];
}

export interface UpdatePlacePreferenceRequest {
  preference: ViewerPreference;
}

export interface PlacePreferenceResponse {
  likeCount: number;
  dislikeCount: number;
  myPreference: ViewerPreference;
}

export interface SimilarPlaceResponse {
  id: string;
  categoryId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  primaryImageUrl: string | null;
  previewUrl: string;
}

export interface AddRecommendationRequest {
  placeId: string;
}

export interface UpdateCourseImageRequest {
  courseImageKey: string;
}
