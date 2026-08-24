import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { ToastProvider } from "@/components/toast";
import { render } from "@/test-utils";

import { CoursePlaceDetailPage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const MEETING_ID = "1";
const COURSE_ID = "c1";

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

const COURSE_DETAIL = {
  courseName: "뚜벅이 최적 코스",
  totalDistanceKm: 2.1,
  totalCount: 1,
  route: [
    {
      recommendationId: "21",
      placeId: "201",
      order: 1,
      name: "광장시장 순대볶음",
      category: "음식점",
      categorySlug: "restaurant",
      address: "서울 종로구 예지동 6-1",
      primaryImageUrl: null,
      longitude: 126.9989,
      latitude: 37.5701,
      walkDurationToNextMin: null,
    },
  ],
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

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const requests: string[] = [];

function renderCoursePlaceDetail(
  placeId: string,
  { conflict = false }: { conflict?: boolean } = {},
) {
  requests.length = 0;
  fetchMock.mockImplementation((input, init) => {
    const request = new Request(input, init);
    requests.push(`${request.method} ${request.url}`);

    const url = request.url;
    if (url.includes("/categories")) {
      return Promise.resolve(jsonResponse([{ id: "1", slug: "restaurant", name: "음식점" }]));
    }
    if (url.includes("/similar")) {
      const excluded = new URL(url).searchParams.get("excludeIds") !== null;
      return Promise.resolve(
        jsonResponse(similarPlaces(excluded ? ["다음 장소"] : ["비슷한 장소 1", "비슷한 장소 2"])),
      );
    }
    if (request.method === "POST" && url.includes("/recommendations")) {
      return Promise.resolve(jsonResponse({ id: "rec-new", categoryId: "1" }, 201));
    }
    if (request.method === "POST" && url.includes(`/courses/${COURSE_ID}/places`)) {
      if (conflict) {
        return Promise.resolve(jsonResponse({ message: "이미 추가된 장소" }, 409));
      }
      return Promise.resolve(jsonResponse(COURSE_DETAIL));
    }
    if (url.includes(`/courses/${COURSE_ID}`)) {
      return Promise.resolve(jsonResponse(COURSE_DETAIL));
    }
    if (url.includes("/places/")) {
      return Promise.resolve(jsonResponse(PLACE_DETAIL));
    }
    return Promise.resolve(jsonResponse(MEETING));
  });

  const router = createMemoryRouter(
    [
      {
        path: "/meeting/:id/course/:courseId/place/30",
        Component: () => <p>다른 코스 장소</p>,
      },
      {
        path: "/meeting/:id/course/:courseId/place/:placeId",
        Component: CoursePlaceDetailPage,
      },
      {
        path: "/meeting/:id/course/:courseId",
        Component: () => <p>코스 상세</p>,
      },
    ],
    { initialEntries: [`/meeting/${MEETING_ID}/course/${COURSE_ID}/place/${placeId}`] },
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
  localStorage.setItem(`momo.access-token.${MEETING_ID}`, "host-session-token");
});

afterEach(() => {
  fetchMock.mockReset();
  localStorage.clear();
  requests.length = 0;
});

// 빠뜨리면 400 이라 상세가 통째로 빈다.
test("장소 상세를 조회할 때 meetingId 를 함께 보낸다", async () => {
  renderCoursePlaceDetail("301");

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();

  const detail = requests.find((r) => /GET .*\/api\/v1\/places\/301(\?|$)/.test(r));
  expect(detail).toBeDefined();
  const detailUrl = detail?.replace(/^GET /, "") ?? "";
  expect(new URL(detailUrl).searchParams.get("meetingId")).toBe(MEETING_ID);
});

test("코스 상세를 URL 의 courseId 로 불러온다", async () => {
  renderCoursePlaceDetail("301");

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();

  expect(requests.some((r) => r.includes(`/courses/${COURSE_ID}`))).toBe(true);
});

test("추천 목록에 있는 장소의 이름과 주소를 보여준다", async () => {
  renderCoursePlaceDetail("201");

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();
  await expect.element(page.getByText("서울 종로구 예지동 6-1")).toBeInTheDocument();
});

test("장소 상세의 사진을 모두 보여준다", async () => {
  renderCoursePlaceDetail("201");

  await expect.element(page.getByAltText("광장시장 순대볶음 사진 1")).toBeInTheDocument();
  await expect.element(page.getByAltText("광장시장 순대볶음 사진 2")).toBeInTheDocument();
});

test("카카오맵 상세정보로 나가는 링크를 건다", async () => {
  renderCoursePlaceDetail("201");

  await expect
    .element(page.getByRole("link", { name: "상세정보 보러가기" }))
    .toHaveAttribute(
      "href",
      "https://map.kakao.com/link/search/%EA%B4%91%EC%9E%A5%EC%8B%9C%EC%9E%A5%20%EC%88%9C%EB%8C%80%EB%B3%B6%EC%9D%8C",
    );
});

test("같은 카테고리의 비슷한 장소를 보여준다", async () => {
  renderCoursePlaceDetail("201");

  await expect.element(page.getByText("이 장소와 비슷한 장소에요!")).toBeInTheDocument();
  await expect.element(page.getByText("비슷한 장소 1")).toBeInTheDocument();
  await expect.element(page.getByText("비슷한 장소 2")).toBeInTheDocument();
});

test("다른 장소 추천받기를 누르면 보고 있던 곳을 빼고 다시 받는다", async () => {
  renderCoursePlaceDetail("201");
  await expect.element(page.getByText("비슷한 장소 1")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "다른 장소 추천받기" }));

  await expect.element(page.getByText("다음 장소")).toBeInTheDocument();
  await expect.element(page.getByText("비슷한 장소 1")).not.toBeInTheDocument();
});

test("코스에 담으면 추천에 올린 뒤 코스에 담는다", async () => {
  renderCoursePlaceDetail("301");

  await userEvent.click(page.getByRole("button", { exact: true, name: "코스에 담기" }));

  await expect.element(page.getByText("장소가 저장되었습니다.")).toBeInTheDocument();
  expect(requests.some((r) => r.startsWith("POST") && r.includes("/recommendations"))).toBe(true);
  expect(
    requests.some((r) => r.startsWith("POST") && r.includes(`/courses/${COURSE_ID}/places`)),
  ).toBe(true);
});

test("이미 코스에 담긴 장소는 담기 버튼을 다르게 보여준다", async () => {
  renderCoursePlaceDetail("201");

  await expect.element(page.getByRole("button", { name: "코스에 담김" })).toBeDisabled();
});

test("비슷한 장소를 누르면 코스 전용 경로로 이동한다", async () => {
  renderCoursePlaceDetail("201");
  await expect.element(page.getByText("비슷한 장소 1")).toBeInTheDocument();

  await userEvent.click(page.getByText("비슷한 장소 1"));

  await expect.element(page.getByText("다른 코스 장소")).toBeInTheDocument();
});

test("이미 담긴 장소면 알려 준다", async () => {
  renderCoursePlaceDetail("301", { conflict: true });

  await userEvent.click(page.getByRole("button", { exact: true, name: "코스에 담기" }));

  await expect.element(page.getByText("이미 추가된 장소입니다.")).toBeInTheDocument();
});
