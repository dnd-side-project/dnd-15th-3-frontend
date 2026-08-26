import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { CourseCommentSheet } from "@/components/course-comment";
import { withLayout } from "@/components/layout/index.decorators";
import type { CourseComment, CourseDetail, CourseRouteStep } from "@/domains/course/api/types";

import { CourseRouteSheet, type CourseTone } from "./index";

const MEETING_ID = "meeting-1";
const COURSE_CANDIDATE_ID = "course-1";
const ACCESS_TOKEN = "token-1";

const sampleComments: CourseComment[] = [
  {
    commentId: "1",
    nickname: "테스터",
    profileAvatarId: "momo-blue",
    authorRole: "MEMBER",
    isMine: false,
    content: "이 코스 좋아요!",
    createdAt: "2026-08-22T10:00:00.000Z",
  },
];

const sampleRoute: CourseRouteStep[] = [
  {
    recommendationId: "rec-1",
    placeId: "place-1",
    order: 1,
    name: "경복궁",
    category: "문화",
    categorySlug: "culture",
    address: "서울 종로구 사직로 161",
    previewPhoto: null,
    longitude: 126.9748,
    latitude: 37.5796,
    walkDurationToNextMin: 8,
  },
  {
    recommendationId: "rec-2",
    placeId: "place-2",
    order: 2,
    name: "통인시장",
    category: "쇼핑",
    categorySlug: "shopping",
    address: "서울 종로구 통인동 10-2",
    previewPhoto: null,
    longitude: 126.9712,
    latitude: 37.5775,
    walkDurationToNextMin: 5,
  },
  {
    recommendationId: "rec-3",
    placeId: "place-3",
    order: 3,
    name: "참북카페",
    category: "카페",
    categorySlug: "cafe",
    address: "서울 종로구 통인동 15-1",
    previewPhoto: null,
    longitude: 126.9705,
    latitude: 37.5772,
    walkDurationToNextMin: 3,
  },
  {
    recommendationId: "rec-4",
    placeId: "place-4",
    order: 4,
    name: "터치오슬로",
    category: "음식",
    categorySlug: "restaurant",
    address: "서울 종로구 누하동 5-1",
    previewPhoto: null,
    longitude: 126.9698,
    latitude: 37.5768,
    walkDurationToNextMin: null,
  },
];

const sampleCourseDetail: CourseDetail = {
  courseName: "뚜벅이 최적 코스",
  totalDistanceKm: 2.1,
  totalCount: 4,
  route: sampleRoute,
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: Infinity } },
});
queryClient.setQueryData(["course", MEETING_ID, "comments", COURSE_CANDIDATE_ID], sampleComments);
queryClient.setQueryData(["course", MEETING_ID, "detail", COURSE_CANDIDATE_ID], sampleCourseDetail);

const meta = {
  component: CourseRouteSheet,
  title: "domains/course/CourseRouteSheet",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CourseRouteSheet>;

export default meta;

interface ToneStoryProps {
  tone: CourseTone;
  badgeLabel: string;
}

function ToneStory({ tone, badgeLabel }: ToneStoryProps) {
  const [snapIndex, setSnapIndex] = useState(1);
  const [isRouteSheetOpen, setIsRouteSheetOpen] = useState(true);
  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <button onClick={() => setIsRouteSheetOpen(true)} type="button">
          코스 루트 시트 열기
        </button>
        <CourseRouteSheet
          isOpen={isRouteSheetOpen}
          onClose={() => setIsRouteSheetOpen(false)}
          onSelectCourse={() => {
            alert("코스 선택!");
            setIsRouteSheetOpen(false);
          }}
          selectDisabled={false}
          onOpenComments={() => setIsCommentSheetOpen(true)}
          courseBadgeLabel={badgeLabel}
          meetingId={MEETING_ID}
          courseCandidateId={COURSE_CANDIDATE_ID}
          accessToken={ACCESS_TOKEN}
          tone={tone}
          onSelectPlace={(placeId) => alert(`장소 클릭: ${placeId}`)}
          snapIndex={snapIndex}
          onSnapIndexChange={setSnapIndex}
        />
        <CourseCommentSheet
          accessToken={ACCESS_TOKEN}
          avatarId="momo-blue"
          courseCandidateId={COURSE_CANDIDATE_ID}
          isOpen={isCommentSheetOpen}
          isHost
          meetingId={MEETING_ID}
          onClose={() => setIsCommentSheetOpen(false)}
        />
      </div>
    </QueryClientProvider>
  );
}

export const Blue: StoryObj = {
  render: () => <ToneStory badgeLabel="A 코스" tone="blue" />,
};

export const Pink: StoryObj = {
  render: () => <ToneStory badgeLabel="B 코스" tone="pink" />,
};

export const Purple: StoryObj = {
  render: () => <ToneStory badgeLabel="C 코스" tone="purple" />,
};
