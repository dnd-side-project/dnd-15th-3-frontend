import { createContext, use, useCallback, useMemo, useState, type ReactNode } from "react";

import type { FirstMeetingPlaceResponse } from "../catalog/api/types";
import type { CategorySlug, MeetingTypeCode, ProfileAvatarId } from "../catalog/api/types";

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

const EMPTY_DRAFT: MeetingDraft = {
  nickname: "",
  profileAvatarId: "momo-blue",
  name: "",
  meetingTypeCode: null,
  firstLocation: null,
  categorySlugs: [],
  date: "",
  time: "",
};

const STORAGE_KEY = "momo.meeting-draft";

function readDraft(): MeetingDraft {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored === null) {
    return EMPTY_DRAFT;
  }

  try {
    return { ...EMPTY_DRAFT, ...(JSON.parse(stored) as Partial<MeetingDraft>) };
  } catch {
    return EMPTY_DRAFT;
  }
}

interface DraftContextValue {
  draft: MeetingDraft;
  patch: (values: Partial<MeetingDraft>) => void;
  clear: () => void;
}

const DraftContext = createContext<DraftContextValue | null>(null);

export function MeetingDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState(readDraft);

  // 새로고침이나 뒤로 가기에도 단계별 입력이 남아 있도록 세션에 함께 저장한다.
  const patch = useCallback((values: Partial<MeetingDraft>) => {
    setDraft((previous) => {
      const next = { ...previous, ...values };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setDraft(EMPTY_DRAFT);
  }, []);

  const value = useMemo(() => ({ draft, patch, clear }), [draft, patch, clear]);

  return <DraftContext value={value}>{children}</DraftContext>;
}

export function useMeetingDraft() {
  const value = use(DraftContext);
  if (value === null) {
    throw new Error("useMeetingDraft 는 MeetingDraftProvider 안에서만 쓸 수 있어요");
  }
  return value;
}
