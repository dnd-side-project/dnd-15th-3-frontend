import { request } from "../../../utils/http";
import type {
  CoursePlan,
  CreateMeetingRequest,
  JoinMeetingRequest,
  MeetingInvitation,
  MeetingScreen,
  UpdateCoursePlanRequest,
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
