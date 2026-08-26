import { request, requestBlob } from "@/utils/http";

import type {
  AddRecommendationRequest,
  CourseImageResponse,
  CoursePlan,
  CreateMeetingRequest,
  JoinMeetingRequest,
  MeetingInvitation,
  MeetingLocation,
  MeetingLocationResponse,
  MeetingScreen,
  MeetingStatus,
  MapPins,
  PlacePreferenceResponse,
  RecommendationPreview,
  UpdateCoursePlanRequest,
  UpdatePlacePreferenceRequest,
} from "./types";

export function createMeeting(body: CreateMeetingRequest) {
  return request<MeetingScreen>("/api/v1/meetings", { method: "POST", body });
}

export function previewInvitation(invitationCode: string) {
  return request<MeetingInvitation>("/api/v1/meetings/invitation/preview", {
    method: "POST",
    body: { invitationCode },
  });
}

export function joinMeeting(body: JoinMeetingRequest) {
  return request<MeetingScreen>("/api/v1/meetings/join", { method: "POST", body });
}

export function getMeetingDetail(meetingId: string, accessToken: string, signal?: AbortSignal) {
  return request<MeetingScreen>(`/api/v1/meeting/${meetingId}`, {
    query: { accessToken },
    signal,
  });
}

export function getCoursePlan(meetingId: string, accessToken: string, signal?: AbortSignal) {
  return request<CoursePlan>(`/api/v1/meetings/${meetingId}/course-plan`, {
    query: { accessToken },
    signal,
  });
}

export function updateCoursePlan(
  meetingId: string,
  accessToken: string,
  body: UpdateCoursePlanRequest,
) {
  return request<CoursePlan>(`/api/v1/meetings/${meetingId}/course-plan`, {
    method: "PUT",
    query: { accessToken },
    body,
  });
}

export function getMeetingStatus(meetingId: string, accessToken: string, signal?: AbortSignal) {
  return request<MeetingStatus>(`/api/v1/meetings/${meetingId}`, {
    query: { accessToken },
    signal,
  });
}

export function getMapPins(meetingId: string, accessToken: string, signal?: AbortSignal) {
  return request<MapPins>(`/api/v1/meetings/${meetingId}/places/pins`, {
    query: { accessToken },
    signal,
  });
}

export function getRecommendations(meetingId: string, accessToken: string, signal?: AbortSignal) {
  return request<RecommendationPreview[]>(`/api/v1/meetings/${meetingId}/recommendations`, {
    query: { accessToken },
    signal,
  });
}

export function updatePlacePreference(
  meetingId: string,
  recommendationId: string,
  accessToken: string,
  body: UpdatePlacePreferenceRequest,
) {
  return request<PlacePreferenceResponse>(
    `/api/v1/meetings/${meetingId}/places/${recommendationId}/preference`,
    { method: "PATCH", query: { accessToken }, body },
  );
}

export function updateLocation(meetingId: string, accessToken: string, body: MeetingLocation) {
  return request<MeetingLocationResponse>(`/api/v1/meetings/${meetingId}/location`, {
    method: "PUT",
    query: { accessToken },
    body,
  });
}

export function addRecommendation(
  meetingId: string,
  accessToken: string,
  body: AddRecommendationRequest,
) {
  return request<RecommendationPreview>(`/api/v1/meetings/${meetingId}/recommendations`, {
    method: "POST",
    query: { accessToken },
    body,
  });
}

export function updateCourseImage(meetingId: string, accessToken: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return request<CourseImageResponse>(`/api/v1/meetings/${meetingId}/course-image`, {
    method: "PUT",
    query: { accessToken },
    body: formData,
  });
}

export function downloadCourseImage(meetingId: string, accessToken: string, signal?: AbortSignal) {
  return requestBlob(`/api/v1/meetings/${meetingId}/course-image/download`, {
    query: { accessToken },
    signal,
  });
}
