import type {
  CategorySlug,
  MeetingTypeCode,
  ProfileAvatarId,
} from "../../catalog/api/types";

export type ParticipantRole = "HOST" | "MEMBER";

export type ViewerPreference = "LIKE" | "DISLIKE";

export interface ParticipantProfile {
  /** 클라이언트가 보관하는 익명 사용자 키 */
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
  /** 첫 만남 장소 검색 응답의 id 를 변환 없이 그대로 전달합니다. */
  firstLocationPlaceId: string;
  /** 배열 순서가 코스 진행 순서입니다. 1~6개. */
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
  /** 코스 순서 */
  order: number;
}

export interface RecommendationPreview {
  id: string;
  categoryId: string;
  place: PlaceSummary;
  recommendedByParticipantId: string;
  likeCount: number;
  dislikeCount: number;
  /** 현재 사용자의 선택 */
  viewerPreference?: ViewerPreference | null;
}

export interface SelectedCourse {
  id: string;
  /** 배열 순서가 이동 순서입니다. */
  recommendationIds: string[];
}

export interface MeetingScreen {
  id: string;
  /** @deprecated `id` 를 사용합니다. */
  meetingId: string;
  invitationCode: string;
  /** 초대 코드를 대신해 상세 조회에 사용하는 참여자 전용 재접속 토큰 */
  participantAccessToken: string;
  invitationUrl: string;
  name: string;
  date: string;
  time: string;
  role: ParticipantRole;
  isHost: boolean;
  /** 화면에서 공통으로 사용하는 첫 장소 ID */
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
  /** 아직 선정 전이면 null */
  selectedCourse: SelectedCourse | null;
}

export interface CoursePlan {
  meetingId: string;
  /** 허용되는 최대 코스 수 */
  maxSteps: number;
  version: number;
  categorySteps: CourseCategoryStep[];
}

export interface UpdateCoursePlanRequest {
  /** 배열 순서가 코스 진행 순서입니다. 비우면 코스를 모두 삭제합니다. 0~6개. */
  categorySlugs: CategorySlug[];
  /** 조회한 코스 버전. 다른 변경이 먼저 저장되면 409 로 충돌 처리합니다. */
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
  /** 초대 코드 6자리 */
  invitationCode: string;
}
