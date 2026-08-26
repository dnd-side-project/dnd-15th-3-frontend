import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import type { CourseDetail } from "@/domains/course/api/types";
import type { MeetingScreen, MeetingStatus } from "@/domains/meeting/api/types";
import { render } from "@/test-utils";

vi.mock("motion/react", async () => {
  const actual = await vi.importActual("motion/react");
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});

import { CardPage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const MEETING: MeetingScreen = {
  id: "1",
  meetingId: "1",
  invitationCode: "DNDF0R",
  participantAccessToken: "host-session-token",
  invitationUrl: "https://momo.example/invite/DNDF0R",
  name: "을지로·성수 나들이",
  date: "2026-08-05",
  time: "18:00",
  courseImageUrl: null,
  role: "HOST",
  isHost: true,
  permissions: { canManageMeeting: true, canSelectCourse: true, canShareInvitation: true },
  meetingType: { id: "1", code: "SOCIAL", name: "친목" },
  meetingTypeCode: "SOCIAL",
  host: { userKey: "device-1", nickname: "방장모모", profileAvatarId: "momo-blue" },
  categorySlugs: ["restaurant"],
  firstLocation: {
    id: "101",
    displayName: "을지로3가역",
    address: "서울 중구",
    latitude: 37.5661,
    longitude: 126.9917,
    syncVersion: 1,
  },
  viewerParticipantId: "11",
  participants: [{ id: "11", nickname: "방장모모", role: "HOST", profileAvatarId: "momo-blue" }],
  categorySteps: [],
  recommendations: [],
  selectedCourse: null,
};

const STATUS: MeetingStatus = {
  status: "COURSE_CONFIRMED",
  confirmedCourseCandidateId: "course-1",
};

const COURSE_DETAIL: CourseDetail = {
  courseName: "성수 다이닝 코스",
  totalDistanceKm: 2.1,
  totalCount: 3,
  route: [
    {
      recommendationId: "rec-1",
      placeId: "place-1",
      order: 1,
      name: "성수다이닝",
      category: "음식",
      categorySlug: "restaurant",
      address: "서울 성동구 성수동",
      previewPhoto: null,
      longitude: 127.056,
      latitude: 37.544,
      walkDurationToNextMin: 8,
    },
    {
      recommendationId: "rec-2",
      placeId: "place-2",
      order: 2,
      name: "서울숲",
      category: "문화",
      categorySlug: "culture",
      address: "서울 성동구 성수동",
      previewPhoto: null,
      longitude: 127.044,
      latitude: 37.547,
      walkDurationToNextMin: 5,
    },
    {
      recommendationId: "rec-3",
      placeId: "place-3",
      order: 3,
      name: "왕십리골목",
      category: "여가",
      categorySlug: "activity",
      address: "서울 성동구 행당동",
      previewPhoto: null,
      longitude: 127.043,
      latitude: 37.561,
      walkDurationToNextMin: null,
    },
  ],
};

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function renderCard() {
  fetchMock.mockImplementation((input) => {
    const url = new Request(input).url;
    if (url.includes("/courses/course-1")) {
      return Promise.resolve(jsonResponse(COURSE_DETAIL));
    }
    if (url.includes("/meetings/1")) {
      return Promise.resolve(jsonResponse(STATUS));
    }
    return Promise.resolve(jsonResponse(MEETING));
  });

  const router = createMemoryRouter([{ path: "/meeting/:id/card", Component: CardPage }], {
    initialEntries: ["/meeting/1/card"],
  });

  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  localStorage.setItem("momo.access-token.1", "host-session-token");
});

afterEach(() => {
  fetchMock.mockReset();
  localStorage.clear();
});

test("초기 화면에 우편함과 안내 문구를 보여준다", async () => {
  renderCard();

  await expect.element(page.getByText("편지를 클릭해 확인하세요!")).toBeInTheDocument();
});

test("편지 확인 버튼이 렌더링된다", async () => {
  renderCard();

  await expect.element(page.getByRole("button", { name: "편지 확인하기" })).toBeInTheDocument();
});

test("모임 상세, 상태, 코스 상세 API를 호출한다", async () => {
  renderCard();

  await expect.element(page.getByText("편지를 클릭해 확인하세요!")).toBeInTheDocument();

  const requestedUrls = fetchMock.mock.calls.map((call) => new Request(call[0]).url);

  expect(requestedUrls.some((url) => url.includes("/api/v1/meeting/1"))).toBe(true);
  expect(requestedUrls.some((url) => url.includes("/api/v1/meetings/1"))).toBe(true);
  expect(requestedUrls.some((url) => url.includes("/meetings/1/courses/course-1"))).toBe(true);
});

test("access token을 query parameter로 포함한다", async () => {
  renderCard();

  await expect.element(page.getByText("편지를 클릭해 확인하세요!")).toBeInTheDocument();

  const requestedUrls = fetchMock.mock.calls.map((call) => new Request(call[0]).url);

  expect(requestedUrls.every((url) => url.includes("accessToken=host-session-token"))).toBe(true);
});

test("편지 확인 후 모임카드에 모임 이름과 날짜·시간이 표시된다", async () => {
  renderCard();

  await expect.element(page.getByText("편지를 클릭해 확인하세요!")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "편지 확인하기" }), { force: true });

  await expect
    .element(page.getByRole("heading", { name: "을지로·성수 나들이" }).first())
    .toBeInTheDocument();
  await expect.element(page.getByText("2026.08.05 18:00").first()).toBeInTheDocument();
});

test("편지 확인 후 모임카드에 코스 경로가 표시된다", async () => {
  renderCard();

  await expect.element(page.getByText("편지를 클릭해 확인하세요!")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "편지 확인하기" }), { force: true });

  await expect.element(page.getByText("성수다이닝").first()).toBeInTheDocument();
  await expect.element(page.getByText("TODAY'S ROUTE").first()).toBeInTheDocument();
});

test("편지 확인 후 공유하기와 이미지 저장 버튼이 표시된다", async () => {
  renderCard();

  await expect.element(page.getByText("편지를 클릭해 확인하세요!")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "편지 확인하기" }), { force: true });

  await expect.element(page.getByRole("button", { name: "공유하기" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "이미지 저장" })).toBeInTheDocument();
});

test("API 응답의 모든 코스 경로가 모임카드에 표시된다", async () => {
  renderCard();

  await expect.element(page.getByText("편지를 클릭해 확인하세요!")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "편지 확인하기" }), { force: true });

  await expect.element(page.getByText("성수다이닝").first()).toBeInTheDocument();
  await expect.element(page.getByText("서울숲").first()).toBeInTheDocument();
  await expect.element(page.getByText("왕십리골목").first()).toBeInTheDocument();
});

test("공유하기 버튼 클릭 시 navigator.share가 호출된다", async () => {
  const shareMock = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "share", {
    value: shareMock,
    writable: true,
    configurable: true,
  });

  renderCard();

  await expect.element(page.getByText("편지를 클릭해 확인하세요!")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "편지 확인하기" }), { force: true });
  await expect.element(page.getByRole("button", { name: "공유하기" })).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "공유하기" }));

  await expect.poll(() => shareMock).toHaveBeenCalled();
  expect(shareMock).toHaveBeenCalledWith(
    expect.objectContaining({
      title: "을지로·성수 나들이",
      url: expect.stringContaining("/meeting/1"),
    }),
  );
});

test("navigator.share 미지원 시 클립보드에 복사된다", async () => {
  Object.defineProperty(navigator, "share", {
    value: undefined,
    writable: true,
    configurable: true,
  });
  const writeTextMock = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator.clipboard, "writeText", {
    value: writeTextMock,
    writable: true,
    configurable: true,
  });

  renderCard();

  await expect.element(page.getByText("편지를 클릭해 확인하세요!")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "편지 확인하기" }), { force: true });
  await expect.element(page.getByRole("button", { name: "공유하기" })).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "공유하기" }));

  await expect.poll(() => writeTextMock).toHaveBeenCalled();
  expect(writeTextMock).toHaveBeenCalledWith(expect.stringContaining("/meeting/1"));
});
