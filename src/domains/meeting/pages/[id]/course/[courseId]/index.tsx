import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import PenSmallIcon from "@/assets/icon-pen-small.svg?react";
import { CourseCommentSheet } from "@/components/course-comment";
import type { RouteMarkerTone } from "@/components/route-marker";
import { Tabs } from "@/components/tabs";
import { confirmCourse } from "@/domains/course/api";
import { courseQueries } from "@/domains/course/api/queries";
import { CourseRouteSheet, type CourseTone } from "@/domains/course/components/course-route-sheet";
import { MapScreen } from "@/domains/meeting/components/map-screen";
import { useMeeting, useMeetingPermissions } from "@/domains/meeting/hooks";
import { palette } from "@/styles/palette";
import { getAccessToken } from "@/utils/access-token";

import { editFab, tabs } from "./index.css";

// Kakao Maps Polyline 의 strokeColor 는 실제 색상 문자열이 필요해 CSS 변수(vars.color.course)를 쓸 수 없다.
const COURSE_TONES: Record<RouteMarkerTone, { primary: string; label: string }> = {
  blue: { primary: palette.blue23, label: "A 코스" },
  pink: { primary: palette.purple2, label: "B 코스" },
  purple: { primary: palette.indigo2, label: "C 코스" },
};

const TONES: RouteMarkerTone[] = ["blue", "pink", "purple"];

export function CourseDetailPage() {
  const navigate = useNavigate();
  const { id = "", courseId = "" } = useParams();
  const accessToken = getAccessToken(id);
  const { data: meeting } = useMeeting();
  const { canManageMeeting } = useMeetingPermissions();

  const { data: candidates } = useQuery(courseQueries.candidates(id, accessToken));
  const { data: courseDetail } = useQuery(courseQueries.detail(id, courseId, accessToken));

  const queryClient = useQueryClient();
  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);
  const [snapIndex, setSnapIndex] = useState(1);

  const currentCandidate = candidates?.courseCandidates.find(
    (candidate) => candidate.courseCandidateId === courseId,
  );
  const tone: CourseTone = TONES[(currentCandidate?.order ?? 1) - 1] ?? "blue";
  const toneStyle = COURSE_TONES[tone];

  const { mutate: confirm, isPending: isConfirming } = useMutation({
    mutationFn: () => confirmCourse(id, courseId, accessToken),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["meeting", id] });
      void navigate(`/meeting/${id}`);
    },
  });

  const me = meeting?.participants.find(
    (participant) => participant.id === meeting.viewerParticipantId,
  );

  const tabItems =
    candidates?.courseCandidates.map((candidate) => {
      const candidateTone = TONES[(candidate.order - 1) % TONES.length] ?? "blue";
      return {
        label: COURSE_TONES[candidateTone].label,
        value: candidate.courseCandidateId,
        content: null,
      };
    }) ?? [];

  const places =
    courseDetail?.route.map((step) => ({
      id: step.placeId,
      name: step.name,
      latitude: step.latitude,
      longitude: step.longitude,
      previewUrl: step.primaryImageUrl,
    })) ?? [];

  return (
    <MapScreen
      bottomOffset={197}
      hideChips
      hideToggle
      header={
        tabItems.length > 0 ? (
          <div className={tabs}>
            <Tabs
              items={tabItems}
              label="코스 선택"
              value={courseId}
              onChange={(next) => void navigate(`/meeting/${id}/course/${next}`)}
            />
          </div>
        ) : null
      }
      places={places}
      tone={tone}
      routeLineColor={toneStyle.primary}
      onSelectPlace={(placeId) =>
        void navigate(`/meeting/${id}/course/${courseId}/place/${placeId}`)
      }
    >
      {canManageMeeting ? (
        <button
          aria-label="코스 수정"
          className={editFab}
          type="button"
          onClick={() => void navigate(`/meeting/${id}/course/${courseId}/edit`)}
        >
          <PenSmallIcon aria-hidden height={32} width={32} />
        </button>
      ) : null}

      <CourseRouteSheet
        isOpen
        onClose={() => void navigate(`/meeting/${id}`)}
        onSelectCourse={() => confirm()}
        selectDisabled={!canManageMeeting || isConfirming}
        onOpenComments={() => setIsCommentSheetOpen(true)}
        courseBadgeLabel={toneStyle.label}
        meetingId={id}
        courseCandidateId={courseId}
        accessToken={accessToken}
        tone={tone}
        onSelectPlace={(placeId) =>
          void navigate(`/meeting/${id}/course/${courseId}/place/${placeId}`)
        }
        snapIndex={snapIndex}
        onSnapIndexChange={setSnapIndex}
      />

      <CourseCommentSheet
        isOpen={isCommentSheetOpen}
        onClose={() => setIsCommentSheetOpen(false)}
        meetingId={id}
        courseCandidateId={courseId}
        accessToken={accessToken}
        avatarId={me?.profileAvatarId ?? "momo-blue"}
        isHost={meeting?.isHost ?? false}
      />
    </MapScreen>
  );
}
