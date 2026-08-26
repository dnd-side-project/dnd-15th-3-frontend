import { queryOptions } from "@tanstack/react-query";

import { filled } from "@/utils/query";

import {
  getCoursePlan,
  getMapPins,
  getMeetingDetail,
  getMeetingStatus,
  getRecommendations,
} from "./index";

export const meetingQueries = {
  detail: (meetingId: string, accessToken: string) =>
    queryOptions({
      queryKey: ["meeting", meetingId, "detail"] as const,
      queryFn: ({ signal }) => getMeetingDetail(meetingId, accessToken, signal),
      enabled: filled(meetingId, accessToken),
    }),

  coursePlan: (meetingId: string, accessToken: string) =>
    queryOptions({
      queryKey: ["meeting", meetingId, "course-plan"] as const,
      queryFn: ({ signal }) => getCoursePlan(meetingId, accessToken, signal),
      enabled: filled(meetingId, accessToken),
    }),

  status: (meetingId: string, accessToken: string) =>
    queryOptions({
      queryKey: ["meeting", meetingId, "status"] as const,
      queryFn: ({ signal }) => getMeetingStatus(meetingId, accessToken, signal),
      enabled: filled(meetingId, accessToken),
    }),

  pins: (meetingId: string, accessToken: string) =>
    queryOptions({
      queryKey: ["meeting", meetingId, "pins"] as const,
      queryFn: ({ signal }) => getMapPins(meetingId, accessToken, signal),
      enabled: filled(meetingId, accessToken),
    }),

  recommendations: (meetingId: string, accessToken: string) =>
    queryOptions({
      queryKey: ["meeting", meetingId, "recommendations"] as const,
      queryFn: ({ signal }) => getRecommendations(meetingId, accessToken, signal),
      enabled: filled(meetingId, accessToken),
    }),
};
