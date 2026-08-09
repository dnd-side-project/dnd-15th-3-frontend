import { request } from "../../../lib/http";

import type {
  CategoryResponse,
  FirstMeetingPlaceResponse,
  MeetingTypeResponse,
  PlaceSearchResponse,
  ProfileAvatarResponse,
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

export function searchPlaces(keyword: string, signal?: AbortSignal) {
  return request<PlaceSearchResponse[]>("/api/v1/places/search", { query: { keyword }, signal });
}

export function searchFirstMeetingPlaces(q: string, signal?: AbortSignal) {
  return request<FirstMeetingPlaceResponse[]>("/api/v1/places/firstmeeting_search", {
    query: { q },
    signal,
  });
}
