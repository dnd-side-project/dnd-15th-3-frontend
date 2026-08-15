import type { MeetingTypeCode } from "./api/types";

interface MeetingTypeIcon {
  src: string;
  width: number;
  height: number;
}

// 아이콘이 카드에서 차지하는 크기가 유형마다 다르다.
export const MEETING_TYPE_ICONS: Record<MeetingTypeCode, MeetingTypeIcon> = {
  SOCIAL: { src: "/static/meeting-type-social.webp", width: 51, height: 50 },
  DATING_HOBBY: { src: "/static/meeting-type-dating-hobby.webp", width: 53, height: 53 },
  COMPANY_DINNER: { src: "/static/meeting-type-company-dinner.webp", width: 53, height: 53 },
  FAMILY: { src: "/static/meeting-type-family.webp", width: 50, height: 50 },
  TRAVEL: { src: "/static/meeting-type-travel.webp", width: 50, height: 50 },
  STUDY: { src: "/static/meeting-type-study.webp", width: 50, height: 50 },
  BUSINESS: { src: "/static/meeting-type-business.webp", width: 50, height: 50 },
  ANNIVERSARY_EXERCISE: {
    src: "/static/meeting-type-anniversary-exercise.webp",
    width: 50,
    height: 50,
  },
  OTHER: { src: "/static/meeting-type-other.webp", width: 50, height: 50 },
};
