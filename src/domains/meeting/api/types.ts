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
  firstLocationPlaceId: string;
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
  placeId: string;
  firstLocationPlaceId: string;
  permissions: MeetingPermissions;
  meetingType: MeetingTypeSummary;
  meetingTypeCode: MeetingTypeCode;
  host: ParticipantProfile;
  categorySlugs: CategorySlug[];
  firstLocation: PlaceSummary;
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
  placeId: string;
  place: PlaceSummary;
}

export interface JoinMeetingRequest extends ParticipantProfile {
  invitationCode: string;
}
