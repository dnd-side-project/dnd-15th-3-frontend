import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { fn } from "storybook/test";

import { CourseCommentSheet } from "../../../../components/course-comment";
import { withLayout } from "../../../../components/layout/index.decorators";
import type { CourseComment } from "../../api/types";
import { CourseRouteSheet } from "./index";

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

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: Infinity } },
});
queryClient.setQueryData(["course", MEETING_ID, "comments", COURSE_CANDIDATE_ID], sampleComments);

const meta = {
  component: CourseRouteSheet,
  title: "domains/course/CourseRouteSheet",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CourseRouteSheet>;

export default meta;

function DefaultStory() {
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

export const Default: StoryObj = {
  render: () => <DefaultStory />,
};

function DisabledStory() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} type="button">
        코스 루트 시트 열기
      </button>
      <CourseRouteSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectCourse={fn()}
        selectDisabled
        onOpenComments={fn()}
      />
    </div>
  );
}

export const Disabled: StoryObj = {
  render: () => <DisabledStory />,
};
