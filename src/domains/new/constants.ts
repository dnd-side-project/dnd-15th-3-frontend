import type { FirstMeetingPlaceResponse } from "@/domains/catalog/api/types";
import type { CategorySlug, MeetingTypeCode, ProfileAvatarId } from "@/domains/catalog/api/types";

export interface MeetingDraft {
  nickname: string;
  profileAvatarId: ProfileAvatarId;
  name: string;
  meetingTypeCode: MeetingTypeCode | null;
  firstLocation: FirstMeetingPlaceResponse | null;
  categorySlugs: CategorySlug[];
  /** YYYY-MM-DD */
  date: string;
  /** HH:mm */
  time: string;
}

export const EMPTY_DRAFT: MeetingDraft = {
  nickname: "",
  profileAvatarId: "momo-blue",
  name: "",
  meetingTypeCode: null,
  firstLocation: null,
  categorySlugs: [],
  date: "",
  time: "",
};

export const FIRST_STEP = "/new/profile";

/**
 * 각 단계에 들어가려면 앞 단계가 채워져 있어야 한다. 폼은 메모리에만 있으므로
 * 새로고침하거나 URL 로 바로 들어오면 조건을 못 채워 첫 단계로 돌아간다.
 */
export const STEP_REQUIRES: Record<string, (draft: MeetingDraft) => boolean> = {
  "/new/meeting-info": (draft) => draft.nickname !== "",
  "/new/meeting-course": (draft) => draft.nickname !== "" && draft.name !== "",
  "/new/meeting-schedule": (draft) =>
    draft.firstLocation !== null && draft.categorySlugs.length > 0,
  "/new/complete": (draft) => draft.date !== "" && draft.time !== "",
};
