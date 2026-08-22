import { queryOptions } from "@tanstack/react-query";

import { filled } from "../../../utils/query";
import {
  getCategories,
  getMeetingTypes,
  getPlaceDetail,
  getProfileAvatars,
  getSimilarPlaces,
  searchFirstMeetingPlaces,
  searchPlaces,
} from "./index";
import type { SearchPlacesParams, SimilarPlacesParams } from "./index";

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

  similarPlaces: (params: SimilarPlacesParams) =>
    queryOptions({
      queryKey: [
        "catalog",
        "similar-places",
        params.meetingId,
        params.placeId,
        params.excludeIds,
      ] as const,
      queryFn: ({ signal }) => getSimilarPlaces(params, signal),
      enabled: filled(params.meetingId, params.placeId, params.accessToken),
    }),

  placeDetail: (placeId: string, accessToken: string) =>
    queryOptions({
      queryKey: ["catalog", "place", placeId] as const,
      queryFn: ({ signal }) => getPlaceDetail(placeId, accessToken, signal),
      enabled: filled(placeId, accessToken),
    }),

  firstMeetingPlaces: (q: string) =>
    queryOptions({
      queryKey: ["catalog", "first-meeting-places", q] as const,
      queryFn: ({ signal }) => searchFirstMeetingPlaces(q, signal),
      enabled: filled(q),
    }),
};
