import { queryOptions } from "@tanstack/react-query";

import {
  getCategories,
  getMeetingTypes,
  getPlaceDetail,
  getProfileAvatars,
  searchFirstMeetingPlaces,
  searchPlaces,
} from "./index";
import type { SearchPlacesParams } from "./index";

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

  places: ({ meetingId, accessToken, categoryId, page, size }: SearchPlacesParams) =>
    queryOptions({
      // 토큰은 캐시 키에서 뺀다. 다시 받아도 같은 목록이다.
      queryKey: ["catalog", "places", meetingId, categoryId, page, size] as const,
      queryFn: ({ signal }) =>
        searchPlaces({ meetingId, accessToken, categoryId, page, size }, signal),
      enabled: meetingId.length > 0 && accessToken.length > 0,
    }),

  placeDetail: (placeId: string) =>
    queryOptions({
      queryKey: ["catalog", "place", placeId] as const,
      queryFn: ({ signal }) => getPlaceDetail(placeId, signal),
      enabled: placeId.length > 0,
    }),

  firstMeetingPlaces: (q: string) =>
    queryOptions({
      queryKey: ["catalog", "first-meeting-places", q] as const,
      queryFn: ({ signal }) => searchFirstMeetingPlaces(q, signal),
      enabled: q.length > 0,
    }),
};
