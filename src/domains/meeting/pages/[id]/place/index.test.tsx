import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { ToastProvider } from "@/components/toast";
import { placePhoto, render } from "@/test-utils";

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
      previewPhoto: placePhoto("/static/popup-momo.webp"),
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

const searchRequests: string[] = [];

function renderPlaceSearch(
  places: unknown = PLACES,
  placesStatus = 200,
  meeting: unknown = MEETING,
  opts: { recommendationStatus?: number; recommendationBody?: unknown } = {},
) {
  searchRequests.length = 0;
  fetchMock.mockImplementation((input, init) => {
    const request = new Request(input, init);
    const url = request.url;
    if (url.includes("/places/search")) {
      searchRequests.push(url);
      return Promise.resolve(jsonResponse(places, placesStatus));
    }
    if (url.includes("/categories")) {
      return Promise.resolve(jsonResponse([{ id: "1", slug: "restaurant", name: "음식점" }]));
    }
    if (url.includes("/recommendations") && request.method === "POST") {
      return Promise.resolve(
        jsonResponse(
          opts.recommendationBody ?? { id: "r1", categoryId: "1" },
          opts.recommendationStatus ?? 201,
        ),
      );
    }
    return Promise.resolve(jsonResponse(meeting));
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
  searchRequests.length = 0;
});

test("타이핑이 멎은 뒤에 검색어를 한 번만 서버로 넘긴다", async () => {
  renderPlaceSearch();
  const input = page.getByRole("textbox", { name: "장소 검색" });
  await expect.element(input).toBeInTheDocument();

  for (const step of ["광", "광장", "광장시", "광장시장"]) {
    await userEvent.fill(input, step);
  }
  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();

  const queried = searchRequests.map((url) => new URL(url).searchParams.get("q")).filter(Boolean);
  expect(queried).toEqual(["광장시장"]);
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

const MEETING_WITH_SAVED = {
  ...MEETING,
  recommendations: [
    {
      id: "r301",
      categoryId: "1",
      place: { id: "301", name: "광장시장 순대볶음", address: "서울 종로구 예지동 6-1" },
      previewPhoto: null,
      recommendedByParticipantId: "11",
      likeCount: 0,
      dislikeCount: 0,
    },
  ],
};

test("+ 버튼을 누르면 장소를 저장하고 toast를 띄운다", async () => {
  renderPlaceSearch();

  await userEvent.fill(page.getByRole("textbox", { name: "장소 검색" }), "광장시장");
  await userEvent.click(page.getByRole("button", { name: "코스에 담기" }));

  await expect.element(page.getByText("장소가 저장되었습니다.")).toBeInTheDocument();
});

test("이미 저장된 장소는 파란 하트로 보인다", async () => {
  renderPlaceSearch(PLACES, 200, MEETING_WITH_SAVED);

  await userEvent.fill(page.getByRole("textbox", { name: "장소 검색" }), "광장시장");

  await expect.element(page.getByRole("button", { name: "코스에 담김" })).toBeDisabled();
});

test("저장에 실패하면 서버 메시지를 toast로 띄운다", async () => {
  renderPlaceSearch(PLACES, 200, MEETING, {
    recommendationStatus: 409,
    recommendationBody: { message: "이미 모임에 추가된 장소입니다." },
  });

  await userEvent.fill(page.getByRole("textbox", { name: "장소 검색" }), "광장시장");
  await userEvent.click(page.getByRole("button", { name: "코스에 담기" }));

  await expect.element(page.getByText("이미 모임에 추가된 장소입니다.")).toBeInTheDocument();
});
