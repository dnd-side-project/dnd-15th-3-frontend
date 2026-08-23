import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "@/test-utils";

import { MeetingCourseDetailPage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const MEETING = {
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
  recommendations: [],
  selectedCourse: { id: "7", recommendationIds: ["21", "22"] },
};

const COURSE_DETAIL = {
  courseName: "뚜벅이 최적 코스",
  totalDistanceKm: 2.1,
  totalCount: 2,
  route: [
    {
      recommendationId: "21",
      placeId: "101",
      order: 1,
      name: "광장시장 순대볶음",
      category: "음식점",
      categorySlug: "restaurant",
      address: "서울 종로구 예지동 6-1",
      primaryImageUrl: null,
      longitude: 126.9989,
      latitude: 37.5701,
      walkDurationToNextMin: 8,
    },
    {
      recommendationId: "22",
      placeId: "104",
      order: 2,
      name: "을지로 커피한약방",
      category: "카페",
      categorySlug: "cafe",
      address: "서울 중구 삼일대로12길 16-6",
      primaryImageUrl: null,
      longitude: 126.9915,
      latitude: 37.5665,
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

function renderCourseDetail(meeting: unknown = MEETING) {
  fetchMock.mockImplementation((input) => {
    const url = new Request(input).url;
    if (url.includes("/categories")) {
      return Promise.resolve(
        jsonResponse([
          { id: "1", slug: "restaurant", name: "음식점" },
          { id: "2", slug: "cafe", name: "카페" },
        ]),
      );
    }
    if (url.includes("/courses/")) {
      return Promise.resolve(jsonResponse(COURSE_DETAIL));
    }
    return Promise.resolve(jsonResponse(meeting));
  });

  const router = createMemoryRouter(
    [
      { path: "/meeting/:id/detail", Component: MeetingCourseDetailPage },
      { path: "/meeting/:id", Component: () => <p>모임 상세</p> },
      { path: "/meeting/:id/place", Component: () => <p>장소 검색</p> },
      { path: "/meeting/:id/place/:placeId", Component: () => <p>장소 상세</p> },
    ],
    { initialEntries: ["/meeting/1/detail"] },
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
  localStorage.clear();
});

test("코스 순서와 방문 장소 수를 보여준다", async () => {
  renderCourseDetail();

  await expect.element(page.getByText("코스 순서")).toBeInTheDocument();
  await expect.element(page.getByText("음식점")).toBeInTheDocument();
  await expect.element(page.getByText("방문 장소 2")).toBeInTheDocument();
});

test("코스 순서대로 장소를 보여주고 마지막에는 도보 시간을 붙이지 않는다", async () => {
  renderCourseDetail();

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();
  await expect.element(page.getByText("을지로 커피한약방")).toBeInTheDocument();
  await expect.element(page.getByText("도보 8분")).toBeInTheDocument();
  await expect.element(page.getByText("경로 안내")).toBeInTheDocument();
});

test("경로 안내는 다음 장소로 가는 카카오맵 길찾기를 연다", async () => {
  renderCourseDetail();

  await expect
    .element(page.getByRole("link", { name: "경로 안내" }))
    .toHaveAttribute(
      "href",
      "https://map.kakao.com/link/to/%EC%9D%84%EC%A7%80%EB%A1%9C%20%EC%BB%A4%ED%94%BC%ED%95%9C%EC%95%BD%EB%B0%A9,37.5665,126.9915",
    );
});

test("장소를 누르면 장소 상세로 간다", async () => {
  renderCourseDetail();

  await userEvent.click(page.getByRole("button", { name: /광장시장 순대볶음/ }));

  await expect.element(page.getByText("장소 상세")).toBeInTheDocument();
});

test("확정된 코스가 없으면 모임 상세로 돌려보낸다", async () => {
  renderCourseDetail({ ...MEETING, selectedCourse: null });

  await expect.element(page.getByText("모임 상세")).toBeInTheDocument();
});

test("지도 크게 보기를 누르면 전체 화면 지도로 간다", async () => {
  renderCourseDetail();

  await userEvent.click(page.getByRole("button", { name: "지도 크게 보기" }));

  await expect.element(page.getByText("장소 검색")).toBeInTheDocument();
});
