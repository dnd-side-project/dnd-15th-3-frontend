import { request } from "../../../utils/http";
import type {
  CategoryResponse,
  FirstMeetingPlaceResponse,
  MeetingTypeResponse,
  PlaceDetail,
  PlaceSearchResponse,
  ProfileAvatarResponse,
  SimilarPlace,
} from "./types";

export function getMeetingTypes(signal?: AbortSignal) {
  return request<MeetingTypeResponse[]>("/api/v1/meeting-types", { signal });
}

export function getCategories(signal?: AbortSignal) {
  return request<CategoryResponse[]>("/api/v1/categories", { signal });
}

export function getProfileAvatars(signal?: AbortSignal) {
  return request<ProfileAvatarResponse[]>("/api/v1/profile-avatars", { signal });
}

export interface SearchPlacesParams {
  meetingId: string;
  accessToken: string;
  q?: string;
  categoryId?: string;
  page?: number;
  size?: number;
}

/** 모임 기준 위치 반경 안의 장소 목록. `q` 를 주면 서버가 걸러 준다. */
export function searchPlaces(params: SearchPlacesParams, signal?: AbortSignal) {
  return request<PlaceSearchResponse>("/api/v1/places/search", { query: { ...params }, signal });
}

export interface SimilarPlacesParams {
  meetingId: string;
  placeId: string;
  accessToken: string;
  excludeIds?: string[];
  size?: number;
}

export function getSimilarPlaces(
  { meetingId, placeId, accessToken, excludeIds = [], size }: SimilarPlacesParams,
  signal?: AbortSignal,
) {
  return request<SimilarPlace[]>(`/api/v1/meetings/${meetingId}/places/${placeId}/similar`, {
    query: {
      accessToken,
      excludeIds: excludeIds.length === 0 ? undefined : excludeIds.join(","),
      size,
    },
    signal,
  });
}

export function getPlaceDetail(
  placeId: string,
  meetingId: string,
  accessToken: string,
  signal?: AbortSignal,
) {
  return request<PlaceDetail>(`/api/v1/places/${placeId}`, {
    query: { meetingId, accessToken },
    signal,
  });
}

export function searchFirstMeetingPlaces(q: string, signal?: AbortSignal) {
  return request<FirstMeetingPlaceResponse[]>("/api/v1/places/first-meeting", {
    query: { q },
    signal,
  });
}
