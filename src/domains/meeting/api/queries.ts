import { queryOptions } from "@tanstack/react-query";

import { filled } from "../../../utils/query";
import { getCoursePlan, getMeetingDetail } from "./index";

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
};
