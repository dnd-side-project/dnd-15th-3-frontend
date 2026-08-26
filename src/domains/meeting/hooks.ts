import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { generateCourse } from "@/domains/course/api";
import { getAccessToken } from "@/utils/access-token";

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

/** 확정된 코스의 장소. 순서대로 담긴다. */
export function useCoursePlaces() {
  const { data: meeting } = useMeeting();
  const placeOf = new Map((meeting?.recommendations ?? []).map(({ id, place }) => [id, place]));

  return (meeting?.selectedCourse?.recommendationIds ?? [])
    .map((recommendationId) => placeOf.get(recommendationId))
    .filter((place) => place !== undefined);
}

/** 응답 전에는 전부 false 라 수정 UI 가 깜빡이지 않는다. */
export function useMeetingPermissions() {
  const { data } = useMeeting();
  return data?.permissions ?? NO_PERMISSIONS;
}

interface CourseGenerationHandlers {
  onSuccess: () => void;
  onError: () => void;
}

/**
 * 코스 생성을 요청한 뒤, 생성중이면 완료·실패가 날 때까지 상태를 폴링한다.
 * `generate` 로 POST 하고, 응답이 `COURSE_GENERATING` 이면 상태 조회 쿼리의 `refetchInterval` 로 2초 간격으로 폴링한다.
 * 터미널 상태에서는 `refetchInterval` 이 false 를 반환해 폴링이 멈추고, 완료·실패 콜백을 한 번 흘려보낸다.
 */
export function useCourseGeneration(
  meetingId: string,
  { onSuccess, onError }: CourseGenerationHandlers,
) {
  const queryClient = useQueryClient();
  const accessToken = getAccessToken(meetingId);
  const statusOptions = meetingQueries.status(meetingId, accessToken);
  const [polling, setPolling] = useState(false);

  const { mutate: generate, isPending } = useMutation({
    mutationFn: () => generateCourse(meetingId, accessToken, { customization: { type: "SKIP" } }),
    onSuccess: (data) => {
      // 즉시 완료·실패면 폴링 없이 결과를 흘린다.
      if (data.status === "COURSE_GENERATED") {
        onSuccess();
        return;
      }
      if (data.status === "COURSE_GENERATION_FAILED") {
        onError();
        return;
      }
      // 생성중이면 이전 폴링 결과를 비우고 상태 조회 쿼리의 refetchInterval 로 폴링을 켠다.
      queryClient.removeQueries({ queryKey: statusOptions.queryKey, exact: true });
      setPolling(true);
    },
    onError: () => onError(),
  });

  const { data: status } = useQuery({
    ...statusOptions,
    enabled: polling,
    refetchIntervalInBackground: true,
    refetchInterval: (query) => (query.state.data?.status === "COURSE_GENERATING" ? 2000 : false),
  });

  // 폴링 중 터미널 상태가 오면 결과를 흘려보낸다. 콜백은 React Compiler 가 메모이즈하므로
  // status 전환 시점에 한 번만 실행된다. setState 는 쓰지 않는다.
  useEffect(() => {
    if (!polling) {
      return;
    }
    if (status?.status === "COURSE_GENERATED") {
      onSuccess();
    } else if (status?.status === "COURSE_GENERATION_FAILED") {
      onError();
    }
  }, [status, polling, onSuccess, onError]);

  // 생성중일 때만 진행중으로 본다. 터미널 이후엔 refetchInterval 이 false 라 폴링은 멈춘다.
  const isGenerating = isPending || (polling && status?.status === "COURSE_GENERATING");

  return { generate, isGenerating };
}
