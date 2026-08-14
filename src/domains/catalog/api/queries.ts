import { queryOptions } from "@tanstack/react-query";

import { filled } from "../../../utils/query";
import {
  getCategories,
  getMeetingTypes,
  getPlaceDetail,
  getProfileAvatars,
  searchFirstMeetingPlaces,
  searchPlaces,
} from "./index";
import type { SearchPlacesParams } from "./index";

export const catalogQueries = {
  meetingTypes: () =>
    queryOptions({
      queryKey: ["catalog", "meeting-types"] as const,
      queryFn: ({ signal }) => getMeetingTypes(signal),
    }),

  categories: () =>
    queryOptions({
      queryKey: ["catalog", "categories"] as const,
      queryFn: ({ signal }) => getCategories(signal),
    }),

  profileAvatars: () =>
    queryOptions({
      queryKey: ["catalog", "profile-avatars"] as const,
      queryFn: ({ signal }) => getProfileAvatars(signal),
    }),

  places: (params: SearchPlacesParams) =>
    queryOptions({
      // 토큰은 캐시 키에서 뺀다. 다시 받아도 같은 목록이다.
      queryKey: [
        "catalog",
        "places",
        params.meetingId,
        params.categoryId,
        params.page,
        params.size,
      ] as const,
      queryFn: ({ signal }) => searchPlaces(params, signal),
      enabled: filled(params.meetingId, params.accessToken),
    }),

  placeDetail: (placeId: string) =>
    queryOptions({
      queryKey: ["catalog", "place", placeId] as const,
      queryFn: ({ signal }) => getPlaceDetail(placeId, signal),
      enabled: filled(placeId),
    }),

  firstMeetingPlaces: (q: string) =>
    queryOptions({
      queryKey: ["catalog", "first-meeting-places", q] as const,
      queryFn: ({ signal }) => searchFirstMeetingPlaces(q, signal),
      enabled: filled(q),
    }),
};
