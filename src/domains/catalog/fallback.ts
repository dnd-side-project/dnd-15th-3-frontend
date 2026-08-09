import type {
  CategoryResponse,
  MeetingTypeResponse,
  ProfileAvatarResponse,
} from "./api/types";

// 카탈로그 API 3종이 501 을 반환하는 동안 쓰는 값. 목록과 순서는 디자인에 고정돼 있다.
export const MEETING_TYPES: MeetingTypeResponse[] = [
  { id: "1", code: "SOCIAL", name: "친목" },
  { id: "2", code: "DATING_HOBBY", name: "데이트" },
  { id: "3", code: "COMPANY_DINNER", name: "회식" },
  { id: "4", code: "FAMILY", name: "가족" },
  { id: "5", code: "TRAVEL", name: "여행" },
  { id: "6", code: "STUDY", name: "스터디" },
  { id: "7", code: "BUSINESS", name: "비즈니스" },
  { id: "8", code: "ANNIVERSARY_EXERCISE", name: "취미" },
  { id: "9", code: "OTHER", name: "기타" },
];

export const CATEGORIES: CategoryResponse[] = [
  { id: "1", slug: "restaurant", name: "음식점" },
  { id: "2", slug: "cafe", name: "카페" },
  { id: "3", slug: "bar", name: "술 · 바" },
  { id: "4", slug: "walk", name: "산책 · 야경" },
  { id: "5", slug: "shopping", name: "팝업 · 쇼핑" },
  { id: "6", slug: "activity", name: "액티비티" },
  { id: "7", slug: "culture", name: "문화 · 전시" },
  { id: "8", slug: "other", name: "기타" },
];

export const PROFILE_AVATARS: ProfileAvatarResponse[] = [
  { id: "momo-blue", name: "파란 모모" },
  { id: "momo-yellow", name: "노란 모모" },
  { id: "momo-green", name: "초록 모모" },
  { id: "momo-pink", name: "분홍 모모" },
  { id: "momo-purple", name: "보라 모모" },
];
