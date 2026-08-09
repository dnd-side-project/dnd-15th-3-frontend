import { request } from "../../../lib/http";

import type {
  CategoryResponse,
  FirstMeetingPlaceResponse,
  MeetingTypeResponse,
  PlaceSearchResponse,
  ProfileAvatarResponse,
} from "./types";

/** 모임 유형 목록 조회 */
export function getMeetingTypes(signal?: AbortSignal) {
  return request<MeetingTypeResponse[]>("/api/v1/meeting-types", { signal });
}

/** 장소 카테고리 목록 조회 */
export function getCategories(signal?: AbortSignal) {
  return request<CategoryResponse[]>("/api/v1/categories", { signal });
}

/** 프로필 캐릭터 목록 조회 */
export function getProfileAvatars(signal?: AbortSignal) {
  return request<ProfileAvatarResponse[]>("/api/v1/profile-avatars", { signal });
}

/** 추천 장소 검색 */
export function searchPlaces(keyword: string, signal?: AbortSignal) {
  return request<PlaceSearchResponse[]>("/api/v1/places/search", { query: { keyword }, signal });
}

/** 첫 만남 장소 검색 */
export function searchFirstMeetingPlaces(q: string, signal?: AbortSignal) {
  return request<FirstMeetingPlaceResponse[]>("/api/v1/places/firstmeeting_search", {
    query: { q },
    signal,
  });
}
