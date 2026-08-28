import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { ToastProvider } from "@/components/toast";
import { render } from "@/test-utils";

import { CoursePlaceAddPage } from "./index";

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
  participants: [],
  categorySteps: [],
  recommendations: [],
  selectedCourse: { id: "7", recommendationIds: ["21"] },
};

const PLACES = {
  items: [
    {
      id: "102",
      name: "테니스센터",
      address: "서울 종로구 예지동 6-1",
      category: { id: "1", slug: "activity", name: "액티비티" },
      latitude: 37.57,
      longitude: 126.99,
      distanceMeters: 100,
      previewPhoto: null,
    },
  ],
  page: 0,
  size: 50,
  total: 1,
  hasNext: false,
  collectionStatus: "READY",
  lastSyncedAt: null,
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const requests: string[] = [];

function renderAddPlace({ conflict = false } = {}) {
  requests.length = 0;
  fetchMock.mockImplementation((input, init) => {
    const request = new Request(input, init);
    requests.push(`${request.method} ${new URL(request.url).pathname}`);

    if (request.url.includes("/categories")) {
      return Promise.resolve(jsonResponse([{ id: "1", slug: "activity", name: "액티비티" }]));
    }
    if (request.url.includes("/recommendations")) {
      if (conflict) {
        return Promise.resolve(jsonResponse({ message: "이미 추가된 장소" }, 409));
      }
      return Promise.resolve(jsonResponse({ id: "33", categoryId: "1" }, 201));
    }
    if (request.url.includes("/courses/")) {
      return Promise.resolve(
        jsonResponse({ courseName: "", totalDistanceKm: 0, totalCount: 2, route: [] }),
      );
    }
    if (request.url.includes("/places/search")) {
      return Promise.resolve(jsonResponse(PLACES));
    }
    return Promise.resolve(jsonResponse(MEETING));
  });

  const router = createMemoryRouter(
    [
      { path: "/meeting/:id/edit/place", Component: CoursePlaceAddPage },
      { path: "/meeting/:id/edit", Component: () => <p>코스 수정</p> },
      { path: "/meeting/:id/place/:placeId", Component: () => <p>장소 상세</p> },
    ],
    { initialEntries: ["/meeting/1/edit/place"] },
  );

  render(
    <QueryClientProvider client={new QueryClient()}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
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

test("코스 수정에서 열면 검색 시트를 지도 위에 띄운다", async () => {
  renderAddPlace();

  await expect.element(page.getByText("코스수정")).toBeInTheDocument();
  await expect.element(page.getByPlaceholder("장소를 검색하세요")).toBeInTheDocument();
});

test("장소를 누르면 장소 상세로 간다", async () => {
  renderAddPlace();

  await userEvent.fill(page.getByPlaceholder("장소를 검색하세요"), "테니스");
  await userEvent.click(page.getByRole("button", { name: /테니스센터/ }));

  await expect.element(page.getByText("장소 상세")).toBeInTheDocument();
});

test("+ 버튼을 누르면 추천에 올린 뒤 코스에 담고 toast를 띄운다", async () => {
  renderAddPlace();

  await userEvent.fill(page.getByPlaceholder("장소를 검색하세요"), "테니스");
  await userEvent.click(page.getByRole("button", { name: "코스에 담기" }));

  await expect.element(page.getByText("코스에 장소를 추가했어요")).toBeInTheDocument();
  expect(requests).toContain("POST /api/v1/meetings/1/recommendations");
  expect(requests).toContain("POST /api/v1/meetings/1/courses/7/places");
});

test("이미 담긴 장소면 서버 메시지를 toast로 알려 준다", async () => {
  renderAddPlace({ conflict: true });

  await userEvent.fill(page.getByPlaceholder("장소를 검색하세요"), "테니스");
  await userEvent.click(page.getByRole("button", { name: "코스에 담기" }));

  await expect.element(page.getByText("이미 추가된 장소")).toBeInTheDocument();
});
