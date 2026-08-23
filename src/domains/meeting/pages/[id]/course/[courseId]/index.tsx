import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import PenSmallIcon from "../../../../../../assets/icon-pen-small.svg?react";
import { CourseCommentSheet } from "../../../../../../components/course-comment";
import type { RouteMarkerTone } from "../../../../../../components/route-marker";
import { Tabs } from "../../../../../../components/tabs";
import { confirmCourse } from "../../../../../../domains/course/api";
import { courseQueries } from "../../../../../../domains/course/api/queries";
import {
  CourseRouteSheet,
  type CourseTone,
} from "../../../../../../domains/course/components/course-route-sheet";
import { getAccessToken } from "../../../../../../utils/access-token";
import { MapScreen } from "../../../../components/map-screen";
import { useMeeting, useMeetingPermissions } from "../../../../hooks";

import { editFab, tabs } from "./index.css";

const COURSE_TONES: Record<RouteMarkerTone, { primary: string; label: string }> = {
  blue: { primary: "#3793FF", label: "A 코스" },
  pink: { primary: "#FF46A9", label: "B 코스" },
  purple: { primary: "#A754EB", label: "C 코스" },
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
      onSelectPlace={(placeId) => void navigate(`/meeting/${id}/place/${placeId}`)}
    >
      {canManageMeeting ? (
        <button
          aria-label="코스 수정"
          className={editFab}
          type="button"
          onClick={() => alert("TODO: 코스 수정")}
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
        onSelectPlace={(placeId) => void navigate(`/meeting/${id}/place/${placeId}`)}
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
