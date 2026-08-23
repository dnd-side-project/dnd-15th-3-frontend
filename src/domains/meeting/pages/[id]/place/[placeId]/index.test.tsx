import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { ToastProvider } from "../../../../../../components/toast";
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
        previewUrl: "/static/popup-momo.webp",
      },
      recommendedByParticipantId: "11",
      likeCount: 3,
      dislikeCount: 1,
      viewerPreference: null,
    },
  ],
  selectedCourse: null,
};

const PLACE_DETAIL = {
  placeId: "201",
  category: "음식점",
  categorySlug: "restaurant",
  name: "광장시장 순대볶음",
  address: "서울 종로구 예지동 6-1",
  imageUrls: ["/static/popup-momo.webp", "/static/complete-momo.webp"],
  previewUrl: "/static/popup-momo.webp",
};

function similarPlaces(names: string[]) {
  return names.map((name, at) => ({
    id: `3${at}`,
    categoryId: "1",
    name,
    address: `서울 종로구 ${at + 1}`,
    previewUrl: null,
  }));
}

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

const requests: string[] = [];

function renderPlaceDetail(placeId: string) {
  requests.length = 0;
  fetchMock.mockImplementation((input) => {
    const url = new Request(input).url;
    requests.push(url);
    if (url.includes("/categories")) {
      return Promise.resolve(jsonResponse([{ id: "1", slug: "restaurant", name: "음식점" }]));
    }
    if (url.includes("/similar")) {
      const excluded = new URL(url).searchParams.get("excludeIds") !== null;
      return Promise.resolve(
        jsonResponse(similarPlaces(excluded ? ["다음 장소"] : ["비슷한 장소 1", "비슷한 장소 2"])),
      );
    }
    if (url.includes("/recommendations")) {
      return Promise.resolve(jsonResponse({}));
    }
    if (url.includes("/places/")) {
      return Promise.resolve(jsonResponse(PLACE_DETAIL));
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
  requests.length = 0;
});

// 빠뜨리면 400 이라 상세가 통째로 빈다.
test("장소 상세를 조회할 때 meetingId 를 함께 보낸다", async () => {
  renderPlaceDetail("301");

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();

  const detail = requests.find((url) => /\/api\/v1\/places\/301(\?|$)/.test(url));
  expect(detail).toBeDefined();
  expect(new URL(detail ?? "").searchParams.get("meetingId")).toBe("1");
});

test("추천 목록에 있는 장소의 이름과 주소를 보여준다", async () => {
  renderPlaceDetail("201");

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();
  await expect.element(page.getByText("서울 종로구 예지동 6-1")).toBeInTheDocument();
});

test("장소 상세의 사진을 모두 보여준다", async () => {
  renderPlaceDetail("201");

  await expect.element(page.getByAltText("광장시장 순대볶음 사진 1")).toBeInTheDocument();
  await expect.element(page.getByAltText("광장시장 순대볶음 사진 2")).toBeInTheDocument();
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

test("같은 카테고리의 비슷한 장소를 보여준다", async () => {
  renderPlaceDetail("201");

  await expect.element(page.getByText("이 장소와 비슷한 장소에요!")).toBeInTheDocument();
  await expect.element(page.getByText("비슷한 장소 1")).toBeInTheDocument();
  await expect.element(page.getByText("비슷한 장소 2")).toBeInTheDocument();
});

test("다른 장소 추천받기를 누르면 보고 있던 곳을 빼고 다시 받는다", async () => {
  renderPlaceDetail("201");
  await expect.element(page.getByText("비슷한 장소 1")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "다른 장소 추천받기" }));

  await expect.element(page.getByText("다음 장소")).toBeInTheDocument();
  await expect.element(page.getByText("비슷한 장소 1")).not.toBeInTheDocument();
});

test("코스에 담으면 저장했다고 알려준다", async () => {
  renderPlaceDetail("301");

  await userEvent.click(page.getByRole("button", { exact: true, name: "코스에 담기" }));

  await expect.element(page.getByText("장소가 저장되었습니다.")).toBeInTheDocument();
});

test("이미 담은 장소는 담기 버튼을 다르게 보여준다", async () => {
  renderPlaceDetail("201");

  await expect.element(page.getByRole("button", { name: "코스에 담김" })).toBeDisabled();
});
