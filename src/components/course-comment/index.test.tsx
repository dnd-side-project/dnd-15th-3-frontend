import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import type { CourseComment } from "@/domains/course/api/types";
import { render } from "@/test-utils";

import { CourseCommentSheet } from "./index";

const MEETING_ID = "meeting-1";
const COURSE_CANDIDATE_ID = "course-1";
const ACCESS_TOKEN = "token-1";

const COMMENTS: CourseComment[] = [
  {
    commentId: "1",
    nickname: "가나디가 조아",
    profileAvatarId: "momo-mint",
    authorRole: "MEMBER",
    isMine: false,
    content: "야 이 식당 맛있어?",
    createdAt: "2026-08-19T15:37:00.000Z",
  },
  {
    commentId: "2",
    nickname: "나",
    profileAvatarId: "momo-blue",
    authorRole: "MEMBER",
    isMine: true,
    content: "오케이!",
    createdAt: "2026-08-19T15:38:00.000Z",
  },
];

const fetchMock = vi.spyOn(globalThis, "fetch");

let store: CourseComment[];

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function respondStore() {
  fetchMock.mockImplementation((_input, init) => {
    if (init?.method === "POST") {
      const raw = (init.body as string | undefined) ?? "";
      const body = raw ? (JSON.parse(raw) as { content: string }) : { content: "" };
      const newComment: CourseComment = {
        commentId: String(Date.now()),
        nickname: "나",
        profileAvatarId: "momo-blue",
        authorRole: "HOST",
        isMine: true,
        content: body.content,
        createdAt: new Date().toISOString(),
      };
      store = [...store, newComment];
      return Promise.resolve(
        jsonResponse({
          commentId: newComment.commentId,
          content: newComment.content,
          createdAt: newComment.createdAt,
        }),
      );
    }
    return Promise.resolve(jsonResponse(store));
  });
}

function renderSheet() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={queryClient}>
      <CourseCommentSheet
        accessToken={ACCESS_TOKEN}
        avatarId="momo-blue"
        courseCandidateId={COURSE_CANDIDATE_ID}
        isOpen
        isHost
        meetingId={MEETING_ID}
        onClose={() => {}}
      />
    </QueryClientProvider>,
  );
}

afterEach(() => {
  fetchMock.mockReset();
});

test("댓글 목록을 불러와 표시한다", async () => {
  store = [...COMMENTS];
  respondStore();
  renderSheet();

  await expect.element(page.getByText("야 이 식당 맛있어?")).toBeInTheDocument();
});

test("댓글을 보내면 POST 후 목록에 추가된다", async () => {
  store = [...COMMENTS];
  respondStore();
  renderSheet();

  await userEvent.type(page.getByRole("textbox", { name: "코스 댓글" }), "새 댓글");
  await userEvent.click(page.getByRole("button", { name: "댓글 보내기" }));

  await expect.element(page.getByText("새 댓글")).toBeInTheDocument();
});
