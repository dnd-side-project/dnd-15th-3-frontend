import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import type { MeetingStatusKind } from "@/domains/meeting/api/types";
import { CourseGeneratingPage } from "@/domains/meeting/pages/[id]/generating";
import { placePhoto, render } from "@/test-utils";

import { ChoicePage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const CATEGORIES = [
  { id: "1", slug: "restaurant", name: "음식점" },
  { id: "2", slug: "cafe", name: "카페" },
  { id: "3", slug: "bar", name: "술 · 바" },
];

const MEETING = {
  id: "1",
  meetingId: "1",
  invitationCode: "DNDF0R",
  participantAccessToken: "host-session-token",
  invitationUrl: "https://momo.example/invite/DNDF0R",
  name: "을지로·성수 나들이",
  date: "2026-08-05",
  time: "18:00",
  role: "HOST",
  isHost: true,
  permissions: { canManageMeeting: true, canSelectCourse: true, canShareInvitation: true },
  meetingType: { id: "1", code: "SOCIAL", name: "친목" },
  meetingTypeCode: "SOCIAL",
  host: { userKey: "device-1", nickname: "방장모모", profileAvatarId: "momo-blue" },
  categorySlugs: ["restaurant", "cafe"],
  firstLocation: {
    id: "101",
    displayName: "을지로3가역",
    address: "서울 중구",
    latitude: 37.5661,
    longitude: 126.9917,
    syncVersion: 1,
  },
  viewerParticipantId: "11",
  participants: [],
  categorySteps: [],
  recommendations: [
    {
      id: "21",
      categoryId: "1",
      place: {
        id: "201",
        name: "광장시장 순대볶음",
        address: "서울 종로구",
        latitude: 1,
        longitude: 2,
      },
      previewPhoto: placePhoto("/static/popup-momo.webp"),
      recommendedByParticipantId: "11",
      likeCount: 3,
      dislikeCount: 1,
      viewerPreference: "LIKE",
    },
    {
      id: "22",
      categoryId: "2",
      place: {
        id: "202",
        name: "성수 카페 모모",
        address: "서울 성동구",
        latitude: 1,
        longitude: 2,
      },
      previewPhoto: null,
      recommendedByParticipantId: "12",
      likeCount: 2,
      dislikeCount: 0,
      viewerPreference: null,
    },
  ],
  selectedCourse: null,
};

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

const preferenceCalls: { url: string; body: unknown }[] = [];
const generateCalls: { url: string; method: string }[] = [];
const pollCalls: { url: string; status: string }[] = [];

interface RenderOptions {
  failed?: boolean;
  generateStatus?: MeetingStatusKind;
  pollStatuses?: MeetingStatusKind[];
}

function renderChoice(meeting: typeof MEETING = MEETING, options: RenderOptions = {}) {
  const { failed = false, generateStatus = "COURSE_GENERATED", pollStatuses = [] } = options;
  let pollIndex = 0;

  fetchMock.mockImplementation((input, init) => {
    const url = new Request(input).url;
    if (url.includes("/categories")) {
      return Promise.resolve(jsonResponse(CATEGORIES));
    }
    if (url.includes("/preference")) {
      preferenceCalls.push({ url, body: JSON.parse(init?.body as string) });
      return Promise.resolve(jsonResponse({ likeCount: 0, dislikeCount: 0, myPreference: null }));
    }
    if (url.includes("/meetings/1/courses") && init?.method === "POST") {
      generateCalls.push({ url, method: init.method ?? "POST" });
      return Promise.resolve(
        jsonResponse({ status: generateStatus, confirmedCourseCandidateId: null }),
      );
    }
    // getMeetingStatus: GET /api/v1/meetings/:id (복수형)
    if (
      url.includes("/meetings/1") &&
      !url.includes("/courses") &&
      init?.method !== "POST" &&
      pollStatuses.length > 0
    ) {
      const status = pollStatuses[Math.min(pollIndex, pollStatuses.length - 1)]!;
      pollIndex += 1;
      pollCalls.push({ url, status });
      return Promise.resolve(jsonResponse({ status, confirmedCourseCandidateId: null }));
    }
    if (failed) {
      return Promise.resolve(new Response("", { status: 500 }));
    }
    return Promise.resolve(jsonResponse(meeting));
  });

  const router = createMemoryRouter(
    [
      { path: "/meeting/:id/choice", Component: ChoicePage },
      { path: "/meeting/:id/place", Component: () => <p>지도</p> },
      { path: "/meeting/:id/questionnaire", Component: () => <p>모임 질문</p> },
      { path: "/meeting/:id/generating", Component: CourseGeneratingPage },
      {
        path: "/meeting/:id/course",
        Component: () => <p data-testid="course-page">코스 페이지</p>,
      },
    ],
    { initialEntries: ["/meeting/1/choice"] },
  );

  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  localStorage.setItem("momo.access-token.1", "host-session-token");
});

afterEach(() => {
  fetchMock.mockReset();
  preferenceCalls.length = 0;
  generateCalls.length = 0;
  pollCalls.length = 0;
  localStorage.clear();
});

test("추천 장소와 선호도 수를 보여준다", async () => {
  renderChoice();

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();
  await expect
    .element(page.getByRole("button", { name: "좋아요 3" }))
    .toHaveAttribute("aria-pressed", "true");
  await expect
    .element(page.getByRole("button", { name: "싫어요 1" }))
    .toHaveAttribute("aria-pressed", "false");
});

test("아직 누르지 않은 장소의 좋아요를 누르면 좋아요를 보낸다", async () => {
  renderChoice();

  await userEvent.click(page.getByRole("button", { name: "좋아요 2" }));

  await expect.poll(() => preferenceCalls).toHaveLength(1);
  expect(preferenceCalls[0].url).toContain("/meetings/1/places/22/preference");
  expect(preferenceCalls[0].body).toEqual({ preference: "LIKE" });
});

test("이미 누른 좋아요를 다시 누르면 취소한다", async () => {
  renderChoice();

  await userEvent.click(page.getByRole("button", { name: "좋아요 3" }));

  await expect.poll(() => preferenceCalls).toHaveLength(1);
  expect(preferenceCalls[0].body).toEqual({ preference: null });
});

test("좋아요를 누른 장소의 싫어요를 누르면 싫어요로 바꾼다", async () => {
  renderChoice();

  await userEvent.click(page.getByRole("button", { name: "싫어요 1" }));

  await expect.poll(() => preferenceCalls).toHaveLength(1);
  expect(preferenceCalls[0].body).toEqual({ preference: "DISLIKE" });
});

test("카테고리를 고르면 해당 장소만 남는다", async () => {
  renderChoice();

  await expect.element(page.getByText("전체 2")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "카페", exact: true }));

  await expect.element(page.getByText("카페 1")).toBeInTheDocument();
  await expect.element(page.getByText("광장시장 순대볶음")).not.toBeInTheDocument();
});

test("지도 보기로 바꾸면 지도 화면으로 간다", async () => {
  renderChoice();

  await userEvent.click(page.getByRole("button", { name: "지도로 보기" }));

  await expect.element(page.getByText("지도")).toBeInTheDocument();
});

test("코스 생성하기를 누르면 확인 모달이 뜨고, 괜찮아요를 누르면 코스 생성 POST를 보낸 뒤 코스 페이지로 이동한다", async () => {
  renderChoice();

  await userEvent.click(page.getByRole("button", { name: "코스 생성하기" }));
  await expect
    .element(page.getByRole("dialog", { name: "이번 모임, 어떻게 보내볼까요?" }))
    .toBeInTheDocument();
  await userEvent.click(page.getByRole("button", { name: "괜찮아요" }));

  await expect.poll(() => generateCalls).toHaveLength(1);
  expect(generateCalls[0].url).toContain("/meetings/1/courses");
  expect(generateCalls[0].method).toBe("POST");
  await expect.element(page.getByTestId("course-page")).toBeInTheDocument();
});

test("좋아요!를 누르면 설문 페이지로 이동한다", async () => {
  renderChoice();

  await userEvent.click(page.getByRole("button", { name: "코스 생성하기" }));
  await userEvent.click(page.getByRole("button", { name: "좋아요!" }));

  await expect.element(page.getByText("모임 질문")).toBeInTheDocument();
  expect(generateCalls).toHaveLength(0);
});

test("코스 생성중이면 폴링 후 완료되면 코스 페이지로 이동한다", async () => {
  renderChoice(MEETING, {
    generateStatus: "COURSE_GENERATING",
    pollStatuses: ["COURSE_GENERATING", "COURSE_GENERATED"],
  });

  await expect.element(page.getByRole("button", { name: "코스 생성하기" })).toBeInTheDocument();
  await userEvent.click(page.getByRole("button", { name: "코스 생성하기" }));
  await userEvent.click(page.getByRole("button", { name: "괜찮아요" }));

  // refetchInterval(2초) 로 폴링: 첫 폴링은 생성중, 두 번째 폴링에서 완료된다.
  await expect.poll(() => pollCalls, { timeout: 6000, interval: 100 }).toHaveLength(2);
  expect(pollCalls[0].status).toBe("COURSE_GENERATING");
  expect(pollCalls[1].status).toBe("COURSE_GENERATED");
  await expect.element(page.getByTestId("course-page")).toBeInTheDocument();
});

test("코스 생성 실패 시 에러 팝업을 보여주고 이동하지 않는다", async () => {
  renderChoice(MEETING, { generateStatus: "COURSE_GENERATION_FAILED" });

  await userEvent.click(page.getByRole("button", { name: "코스 생성하기" }));
  await userEvent.click(page.getByRole("button", { name: "괜찮아요" }));

  await expect.poll(() => generateCalls).toHaveLength(1);
  await expect
    .element(page.getByRole("dialog", { name: "코스 생성에 실패했어요" }))
    .toBeInTheDocument();
  await expect.element(page.getByTestId("course-page")).not.toBeInTheDocument();
});

test("보여줄 장소가 없으면 빈 상태를 보여주고 코스 생성을 막는다", async () => {
  renderChoice({ ...MEETING, recommendations: [] });

  await expect.element(page.getByText("아직 저장된 장소가 없어요")).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "코스 생성하기" })).toBeDisabled();
});

test("고른 카테고리에만 장소가 없으면 코스 생성은 막지 않는다", async () => {
  renderChoice();

  await userEvent.click(page.getByRole("button", { name: "술 · 바" }));

  await expect.element(page.getByText("이 카테고리에 저장된 장소가 없어요")).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "코스 생성하기" })).toBeEnabled();
});

test("불러오지 못하면 다시 시도를 보여준다", async () => {
  renderChoice(MEETING, { failed: true });

  await expect.element(page.getByText("추천 장소를 불러오지 못했습니다.")).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "다시 시도" })).toBeInTheDocument();
});
