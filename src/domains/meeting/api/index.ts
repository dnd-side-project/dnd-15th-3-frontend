import { request } from "../../../lib/http";

import type {
  CoursePlan,
  CreateMeetingRequest,
  JoinMeetingRequest,
  MeetingInvitation,
  MeetingScreen,
  UpdateCoursePlanRequest,
} from "./types";

/** 모임 생성 및 방장 참여 */
export function createMeeting(body: CreateMeetingRequest) {
  return request<MeetingScreen>("/api/v1/meetings", { method: "POST", body });
}

/** 초대 코드 검증 및 모임 미리보기 */
export function previewInvitation(invitationCode: string) {
  return request<MeetingInvitation>("/api/v1/meetings/invitation/preview", {
    method: "POST",
    body: { invitationCode },
  });
}

/** 모임 참여 */
export function joinMeeting(body: JoinMeetingRequest) {
  return request<MeetingScreen>("/api/v1/meetings/join", { method: "POST", body });
}

/** 참여자 전용 모임 상세 조회 */
export function getMeetingDetail(meetingId: string, accessToken: string, signal?: AbortSignal) {
  return request<MeetingScreen>(`/api/v1/meeting/${meetingId}`, {
    query: { accessToken },
    signal,
  });
}

/** 코스 계획 조회 */
export function getCoursePlan(meetingId: string, accessToken: string, signal?: AbortSignal) {
  return request<CoursePlan>(`/api/v1/meetings/${meetingId}/course-plan`, {
    query: { accessToken },
    signal,
  });
}

/** 코스 계획 전체 저장 */
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
