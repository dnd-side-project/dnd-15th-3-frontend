import { queryOptions } from "@tanstack/react-query";

import {
  getCategories,
  getMeetingTypes,
  getProfileAvatars,
  searchFirstMeetingPlaces,
  searchPlaces,
} from "./index";

// 카탈로그는 거의 변하지 않으므로 세션 동안 캐시를 유지한다.
const CATALOG_STALE_TIME = Number.POSITIVE_INFINITY;

export const catalogQueries = {
  meetingTypes: () =>
    queryOptions({
      queryKey: ["catalog", "meeting-types"] as const,
      queryFn: ({ signal }) => getMeetingTypes(signal),
      staleTime: CATALOG_STALE_TIME,
    }),

  categories: () =>
    queryOptions({
      queryKey: ["catalog", "categories"] as const,
      queryFn: ({ signal }) => getCategories(signal),
      staleTime: CATALOG_STALE_TIME,
    }),

  profileAvatars: () =>
    queryOptions({
      queryKey: ["catalog", "profile-avatars"] as const,
      queryFn: ({ signal }) => getProfileAvatars(signal),
      staleTime: CATALOG_STALE_TIME,
    }),

  places: (keyword: string) =>
    queryOptions({
      queryKey: ["catalog", "places", keyword] as const,
      queryFn: ({ signal }) => searchPlaces(keyword, signal),
      enabled: keyword.length > 0,
    }),

  firstMeetingPlaces: (q: string) =>
    queryOptions({
      queryKey: ["catalog", "first-meeting-places", q] as const,
      queryFn: ({ signal }) => searchFirstMeetingPlaces(q, signal),
      enabled: q.length > 0,
    }),
};
