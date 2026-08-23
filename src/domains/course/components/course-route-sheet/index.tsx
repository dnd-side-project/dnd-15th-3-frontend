import { useQuery } from "@tanstack/react-query";

import { MultiViewBottomSheet } from "../../../../components/bottom-sheet";
import { CtaButton } from "../../../../components/cta-button";
import { CourseFeedbackInput } from "../../../../components/text-input";
import { courseQueries } from "../../api/queries";
import { CourseTimeline } from "../course-timeline";

import {
  buttonRow,
  courseBadge,
  courseHeader,
  courseTitle,
  footer,
  inputRow,
  statLabel,
  statValue,
  statsRow,
  timelineScroll,
  view2Body,
} from "./index.css";

const COURSE_TONES = {
  blue: { primary: "#3793FF", surface: "#F1F8FF" },
  pink: { primary: "#FF46A9", surface: "#FFECF6" },
  purple: { primary: "#A754EB", surface: "#F6EEFD" },
} as const;

export type CourseTone = keyof typeof COURSE_TONES;

export interface CourseRouteSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: () => void;
  selectDisabled?: boolean;
  onOpenComments: () => void;
  courseBadgeLabel?: string;
  meetingId: string;
  courseCandidateId: string;
  accessToken: string;
  tone?: CourseTone;
  onSelectPlace?: (placeId: string) => void;
  initialSnapIndex?: number;
  snapIndex?: number;
  onSnapIndexChange?: (index: number) => void;
}

export function CourseRouteSheet({
  isOpen,
  onClose,
  onSelectCourse,
  selectDisabled = false,
  onOpenComments,
  courseBadgeLabel,
  meetingId,
  courseCandidateId,
  accessToken,
  tone = "blue",
  onSelectPlace,
  initialSnapIndex,
  snapIndex,
  onSnapIndexChange,
}: CourseRouteSheetProps) {
  const { data: courseDetail } = useQuery({
    ...courseQueries.detail(meetingId, courseCandidateId, accessToken),
    enabled: isOpen,
  });
  const toneStyle = {
    ["--course-tone" as string]: COURSE_TONES[tone].primary,
    ["--course-tone-surface" as string]: COURSE_TONES[tone].surface,
  };
  const views = [
    {
      snapIndex: 1,
      height: 183,
      children: (
        <div className={footer({ shadow: false })}>
          <div className={inputRow}>
            <CourseFeedbackInput
              readOnly
              tabIndex={-1}
              onClick={onOpenComments}
              onSend={onOpenComments}
            />
          </div>
          <div className={buttonRow}>
            <CtaButton disabled={selectDisabled} onClick={onSelectCourse}>
              해당 코스로 선택하기
            </CtaButton>
          </div>
        </div>
      ),
    },
    {
      snapIndex: 2,
      height: 730,
      children: courseDetail ? (
        <div className={view2Body} style={toneStyle}>
          <section className={courseHeader}>
            {courseBadgeLabel ? <span className={courseBadge}>{courseBadgeLabel}</span> : null}
            <h2 className={courseTitle}>{courseDetail.courseName}</h2>
            <div className={statsRow}>
              <span className={statLabel}>
                이동거리 <span className={statValue}>{courseDetail.totalDistanceKm}km</span>
              </span>
              <span className={statLabel}>
                방문 장소 <span className={statValue}>{courseDetail.totalCount}</span>
              </span>
            </div>
          </section>

          <div className={timelineScroll}>
            <CourseTimeline onSelectPlace={onSelectPlace} route={courseDetail.route} />
          </div>

          <div className={footer({ shadow: true })}>
            <div className={inputRow}>
              <CourseFeedbackInput
                readOnly
                tabIndex={-1}
                onClick={onOpenComments}
                onSend={onOpenComments}
              />
            </div>
            <div className={buttonRow}>
              <CtaButton disabled={selectDisabled} onClick={onSelectCourse}>
                해당 코스로 선택하기
              </CtaButton>
            </div>
          </div>
        </div>
      ) : (
        <div className={view2Body}>
          <p className={timelineScroll}>코스 불러오는 중</p>
        </div>
      ),
    },
  ];

  return (
    <MultiViewBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      hasBackdrop
      topBorderRadius="md"
      views={views}
      disableDismiss
      avoidKeyboard={false}
      initialSnapIndex={initialSnapIndex}
      snapIndex={snapIndex}
      onSnapIndexChange={onSnapIndexChange}
    />
  );
}
