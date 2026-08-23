import { queryOptions } from "@tanstack/react-query";

import { filled } from "@/utils/query";

import type { GetExcludedPlacesParams } from "./index";
import {
  getCourseCandidates,
  getCourseComments,
  getCourseDetail,
  getExcludedPlaces,
} from "./index";

export const courseQueries = {
  candidates: (meetingId: string, accessToken: string) =>
    queryOptions({
      queryKey: ["course", meetingId, "candidates"] as const,
      queryFn: ({ signal }) => getCourseCandidates(meetingId, accessToken, signal),
      enabled: filled(meetingId, accessToken),
    }),

  detail: (meetingId: string, courseCandidateId: string, accessToken: string) =>
    queryOptions({
      queryKey: ["course", meetingId, "detail", courseCandidateId] as const,
      queryFn: ({ signal }) => getCourseDetail(meetingId, courseCandidateId, accessToken, signal),
      enabled: filled(meetingId, courseCandidateId, accessToken),
    }),

  comments: (meetingId: string, courseCandidateId: string, accessToken: string) =>
    queryOptions({
      queryKey: ["course", meetingId, "comments", courseCandidateId] as const,
      queryFn: ({ signal }) => getCourseComments(meetingId, courseCandidateId, accessToken, signal),
      enabled: filled(meetingId, courseCandidateId, accessToken),
    }),

  excludedPlaces: (
    meetingId: string,
    courseCandidateId: string,
    accessToken: string,
    params?: GetExcludedPlacesParams,
  ) =>
    queryOptions({
      queryKey: ["course", meetingId, "excluded", courseCandidateId, params?.category] as const,
      queryFn: ({ signal }) =>
        getExcludedPlaces(meetingId, courseCandidateId, accessToken, params, signal),
      enabled: filled(meetingId, courseCandidateId, accessToken),
    }),
};
