import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import { render } from "../../../../../../test-utils";
import { PlaceDetailPage } from "./index";

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
  role: "HOST",
  isHost: true,
  placeId: "101",
  firstLocationPlaceId: "101",
  permissions: { canManageMeeting: true, canSelectCourse: true, canShareInvitation: true },
  meetingType: { id: "1", code: "SOCIAL", name: "친목" },
  meetingTypeCode: "SOCIAL",
  host: { userKey: "device-1", nickname: "방장모모", profileAvatarId: "momo-blue" },
  categorySlugs: ["restaurant"],
  firstLocation: {
    id: "101",
    name: "을지로3가역",
    address: "서울 중구",
    latitude: 37.5661,
    longitude: 126.9917,
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
        address: "서울 종로구 예지동 6-1",
        latitude: 37.5701,
        longitude: 126.9989,
      },
      recommendedByParticipantId: "11",
      likeCount: 3,
      dislikeCount: 1,
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

function renderPlaceDetail(placeId: string) {
  fetchMock.mockImplementation((input) => {
    const url = new Request(input).url;
    if (url.includes("/categories")) {
      return Promise.resolve(jsonResponse([{ id: "1", slug: "restaurant", name: "음식점" }]));
    }
    return Promise.resolve(jsonResponse(MEETING));
  });

  const router = createMemoryRouter(
    [
      { path: "/meeting/:id/place/:placeId", Component: PlaceDetailPage },
      { path: "/meeting/:id", Component: () => <p>모임 상세</p> },
      { path: "/meeting/:id/choice", Component: () => <p>추천목록</p> },
    ],
    { initialEntries: [`/meeting/1/place/${placeId}`] },
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

test("추천 목록에 있는 장소의 이름과 주소를 보여준다", async () => {
  renderPlaceDetail("201");

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();
  await expect.element(page.getByText("서울 종로구 예지동 6-1")).toBeInTheDocument();
});

test("카카오맵 상세정보로 나가는 링크를 건다", async () => {
  renderPlaceDetail("201");

  await expect
    .element(page.getByRole("link", { name: "상세정보 보러가기" }))
    .toHaveAttribute(
      "href",
      "https://map.kakao.com/link/search/%EA%B4%91%EC%9E%A5%EC%8B%9C%EC%9E%A5%20%EC%88%9C%EB%8C%80%EB%B3%B6%EC%9D%8C",
    );
});
