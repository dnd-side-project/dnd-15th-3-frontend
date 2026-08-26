import type { CategorySlug, PlacePhoto, ProfileAvatarId } from "@/domains/catalog/api/types";
import type { ParticipantRole, ViewerPreference } from "@/domains/meeting/api/types";

export interface CourseCandidateSummary {
  courseCandidateId: string;
  order: number;
}

export interface CourseCandidateList {
  courseCandidates: CourseCandidateSummary[];
  totalCount: number;
}

export interface CourseRouteStep {
  recommendationId: string;
  placeId: string;
  order: number;
  name: string;
  category: string;
  categorySlug: CategorySlug;
  address: string;
  previewPhoto: PlacePhoto | null;
  longitude: number;
  latitude: number;
  walkDurationToNextMin: number | null;
}

export interface CourseDetail {
  courseName: string;
  totalDistanceKm: number;
  totalCount: number;
  route: CourseRouteStep[];
}

export interface CourseComment {
  commentId: string;
  nickname: string;
  profileAvatarId: ProfileAvatarId;
  authorRole: ParticipantRole;
  isMine: boolean;
  content: string;
  createdAt: string;
}

export interface CreateCourseCommentRequest {
  content: string;
}

export interface CreateCourseCommentResponse {
  commentId: string;
  content: string;
  createdAt: string;
}

export interface MeetingPlaceRecommendation {
  recommendationId: string;
  category: string;
  categorySlug: CategorySlug;
  name: string;
  address: string;
  previewPhoto: PlacePhoto | null;
  likeCount: number;
  dislikeCount: number;
  myPreference: ViewerPreference | null;
}

export interface ExcludedPlaceList {
  items: MeetingPlaceRecommendation[];
  totalCount: number;
  appliedCategory?: CategorySlug | null;
}

export interface AddCoursePlaceRequest {
  recommendationId: string;
}

export interface UpdateCoursePlacesRequest {
  recommendationIds: string[];
}

export interface SkipCourseCustomization {
  type: "SKIP";
}

export interface CourseGenerationAnswer {
  questionId: string;
  optionId: string;
}

export interface QuestionnaireCourseCustomization {
  type: "QUESTIONNAIRE";
  questionnaireId: string;
  questionnaireVersion: number;
  /** 정확히 3개 */
  answers: CourseGenerationAnswer[];
}

export type CourseCustomization = SkipCourseCustomization | QuestionnaireCourseCustomization;

export interface GenerateCourseRequest {
  customization: CourseCustomization;
}
