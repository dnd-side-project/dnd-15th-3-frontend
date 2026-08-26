import type { CategorySlug } from "@/domains/catalog/api/types";
import type { MeetingStatus } from "@/domains/meeting/api/types";
import { request } from "@/utils/http";

import type {
  AddCoursePlaceRequest,
  CourseCandidateList,
  CourseComment,
  CourseDetail,
  CreateCourseCommentRequest,
  CreateCourseCommentResponse,
  ExcludedPlaceList,
  GenerateCourseRequest,
  UpdateCoursePlacesRequest,
} from "./types";

export function getCourseCandidates(meetingId: string, accessToken: string, signal?: AbortSignal) {
  return request<CourseCandidateList>(`/api/v1/meetings/${meetingId}/courses`, {
    query: { accessToken },
    signal,
  });
}

export function getCourseDetail(
  meetingId: string,
  courseCandidateId: string,
  accessToken: string,
  signal?: AbortSignal,
) {
  return request<CourseDetail>(`/api/v1/meetings/${meetingId}/courses/${courseCandidateId}`, {
    query: { accessToken },
    signal,
  });
}

export function getCourseComments(
  meetingId: string,
  courseCandidateId: string,
  accessToken: string,
  signal?: AbortSignal,
) {
  return request<CourseComment[]>(
    `/api/v1/meetings/${meetingId}/courses/${courseCandidateId}/comments`,
    { query: { accessToken }, signal },
  );
}

export interface GetExcludedPlacesParams {
  category?: CategorySlug;
}

export function getExcludedPlaces(
  meetingId: string,
  courseCandidateId: string,
  accessToken: string,
  params?: GetExcludedPlacesParams,
  signal?: AbortSignal,
) {
  return request<ExcludedPlaceList>(
    `/api/v1/meetings/${meetingId}/courses/${courseCandidateId}/excluded-places`,
    { query: { accessToken, ...params }, signal },
  );
}

export function generateCourse(
  meetingId: string,
  accessToken: string,
  body: GenerateCourseRequest,
) {
  return request<MeetingStatus>(`/api/v1/meetings/${meetingId}/courses`, {
    method: "POST",
    query: { accessToken },
    body,
  });
}

export function createCourseComment(
  meetingId: string,
  courseCandidateId: string,
  accessToken: string,
  body: CreateCourseCommentRequest,
) {
  return request<CreateCourseCommentResponse>(
    `/api/v1/meetings/${meetingId}/courses/${courseCandidateId}/comments`,
    { method: "POST", query: { accessToken }, body },
  );
}

export function addCoursePlace(
  meetingId: string,
  courseCandidateId: string,
  accessToken: string,
  body: AddCoursePlaceRequest,
) {
  return request<CourseDetail>(
    `/api/v1/meetings/${meetingId}/courses/${courseCandidateId}/places`,
    { method: "POST", query: { accessToken }, body },
  );
}

export function updateCoursePlaces(
  meetingId: string,
  courseCandidateId: string,
  accessToken: string,
  body: UpdateCoursePlacesRequest,
) {
  return request<CourseDetail>(
    `/api/v1/meetings/${meetingId}/courses/${courseCandidateId}/places`,
    { method: "PUT", query: { accessToken }, body },
  );
}

export function confirmCourse(
  meetingId: string,
  courseCandidateId: string,
  accessToken: string,
  signal?: AbortSignal,
) {
  return request<MeetingStatus>(
    `/api/v1/meetings/${meetingId}/courses/${courseCandidateId}/confirmation`,
    { method: "POST", query: { accessToken }, signal },
  );
}
