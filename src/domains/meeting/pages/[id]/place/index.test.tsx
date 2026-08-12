import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../../test-utils";
import { PlaceSearchPage } from "./index";

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
  selectedCourse: null,
};

const PLACES = {
  items: [
    {
      id: "301",
      name: "광장시장 순대볶음",
      address: "서울 종로구 예지동 6-1",
      category: { id: "1", slug: "restaurant", name: "음식점" },
      latitude: 37.5701,
      longitude: 126.9989,
      distanceMeters: 320,
      previewUrl: "/static/popup-momo.webp",
    },
  ],
  page: 0,
  size: 20,
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

function renderPlaceSearch(places: unknown = PLACES, placesStatus = 200) {
  fetchMock.mockImplementation((input) => {
    const url = new Request(input).url;
    if (url.includes("/places/search")) {
      return Promise.resolve(jsonResponse(places, placesStatus));
    }
    if (url.includes("/categories")) {
      return Promise.resolve(jsonResponse([{ id: "1", slug: "restaurant", name: "음식점" }]));
    }
    return Promise.resolve(jsonResponse(MEETING));
  });

  const router = createMemoryRouter(
    [
      { path: "/meeting/:id/place", Component: PlaceSearchPage },
      { path: "/meeting/:id/place/:placeId", Component: () => <p>장소 상세</p> },
      { path: "/meeting/:id/choice", Component: () => <p>추천목록</p> },
    ],
    { initialEntries: ["/meeting/1/place"] },
  );

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

test("모임의 코스 카테고리를 지도 위에 순서대로 겹쳐 보여준다", async () => {
  renderPlaceSearch();

  await expect.element(page.getByText("음식점")).toBeInTheDocument();
});

test("검색어를 넣으면 장소 목록을 보여준다", async () => {
  renderPlaceSearch();

  await userEvent.fill(page.getByRole("textbox", { name: "장소 검색" }), "광장시장");

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();
  await expect.element(page.getByText("서울 종로구 예지동 6-1")).toBeInTheDocument();
});

test("검색 결과가 없으면 입력한 검색어를 되짚어 준다", async () => {
  renderPlaceSearch({ ...PLACES, items: [], total: 0 });

  await userEvent.fill(page.getByRole("textbox", { name: "장소 검색" }), "메밀");

  await expect.element(page.getByText("‘메밀'에 대한 검색 결과가 없어요")).toBeInTheDocument();
  await expect.element(page.getByText("검색어를 다시 확인해주세요.")).toBeInTheDocument();
});

test("장소 목록 조회가 실패하면 다시 시도하라고 알린다", async () => {
  renderPlaceSearch(null, 500);

  await userEvent.fill(page.getByRole("textbox", { name: "장소 검색" }), "광장시장");

  await expect.element(page.getByText("장소 정보를 불러오지 못했습니다.")).toBeInTheDocument();
  await expect.element(page.getByText("잠시 후 다시 시도해주세요.")).toBeInTheDocument();
});

test("장소를 아직 모으는 중이면 결과 없음 대신 수집 중임을 알린다", async () => {
  renderPlaceSearch({ ...PLACES, items: [], total: 0, collectionStatus: "RUNNING" });

  await userEvent.fill(page.getByRole("textbox", { name: "장소 검색" }), "광장시장");

  await expect.element(page.getByText("주변 장소를 모으는 중이에요")).toBeInTheDocument();
});

test("검색 결과를 누르면 장소 상세로 간다", async () => {
  renderPlaceSearch();

  await userEvent.fill(page.getByRole("textbox", { name: "장소 검색" }), "광장시장");
  await userEvent.click(page.getByText("광장시장 순대볶음"));

  await expect.element(page.getByText("장소 상세")).toBeInTheDocument();
});

test("목록 보기로 바꾸면 추천목록으로 간다", async () => {
  renderPlaceSearch();

  await userEvent.click(page.getByRole("button", { name: "목록으로 보기" }));

  await expect.element(page.getByText("추천목록")).toBeInTheDocument();
});
