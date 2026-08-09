import { queryOptions } from "@tanstack/react-query";

import { getCoursePlan, getMeetingDetail } from "./index";

export const meetingQueries = {
  detail: (meetingId: string, accessToken: string) =>
    queryOptions({
      queryKey: ["meeting", meetingId, "detail"] as const,
      queryFn: ({ signal }) => getMeetingDetail(meetingId, accessToken, signal),
      enabled: meetingId.length > 0 && accessToken.length > 0,
    }),

  coursePlan: (meetingId: string, accessToken: string) =>
    queryOptions({
      queryKey: ["meeting", meetingId, "course-plan"] as const,
      queryFn: ({ signal }) => getCoursePlan(meetingId, accessToken, signal),
      enabled: meetingId.length > 0 && accessToken.length > 0,
    }),
};
