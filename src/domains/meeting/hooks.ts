import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { getAccessToken } from "../../utils/access-token";
import { meetingQueries } from "./api/queries";
import type { MeetingPermissions } from "./api/types";

const NO_PERMISSIONS: MeetingPermissions = {
  canManageMeeting: false,
  canSelectCourse: false,
  canShareInvitation: false,
};

/** 현재 경로의 모임 상세. 모임 하위 화면이 같은 응답을 공유한다. */
export function useMeeting() {
  const { id = "" } = useParams();
  return useQuery(meetingQueries.detail(id, getAccessToken(id)));
}

/** 응답 전에는 전부 false 라 수정 UI 가 깜빡이지 않는다. */
export function useMeetingPermissions() {
  const { data } = useMeeting();
  return data?.permissions ?? NO_PERMISSIONS;
}
