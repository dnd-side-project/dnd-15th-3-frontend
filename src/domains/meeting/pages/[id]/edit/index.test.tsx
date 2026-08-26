import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { ToastProvider } from "@/components/toast";
import { render } from "@/test-utils";

import { CourseEditPage } from "./index";

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

const COURSE_DETAIL = {
  courseName: "뚜벅이 최적 코스",
  totalDistanceKm: 2.1,
  totalCount: 1,
  route: [
    {
      recommendationId: "21",
      placeId: "101",
      order: 1,
      name: "광장시장 순대볶음",
      category: "음식점",
      categorySlug: "restaurant",
      address: "서울 종로구 예지동 6-1",
      previewPhoto: null,
      longitude: 126.9989,
      latitude: 37.5701,
      walkDurationToNextMin: null,
    },
  ],
};

function savedPlace(recommendationId: string, name: string, categorySlug: string) {
  return {
    recommendationId,
    category: "카페",
    categorySlug,
    name,
    address: "서울 중구 삼일대로12길 16-6",
    likeCount: 2,
    dislikeCount: 1,
    myPreference: null,
  };
}

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

const requests: string[] = [];
const bodies: string[] = [];

function renderCourseEdit() {
  fetchMock.mockImplementation((input, init) => {
    const request = new Request(input, init);
    requests.push(`${request.method} ${request.url}`);
    if (typeof init?.body === "string") {
      bodies.push(init.body);
    }

    const url = request.url;
    if (url.includes("/categories")) {
      return Promise.resolve(
        jsonResponse([
          { id: "1", slug: "restaurant", name: "음식점" },
          { id: "2", slug: "cafe", name: "카페" },
        ]),
      );
    }
    if (url.includes("/excluded-places")) {
      const category = new URL(url).searchParams.get("category");
      return Promise.resolve(
        jsonResponse({
          items:
            category === "cafe"
              ? [savedPlace("24", "을지로 커피한약방", "cafe")]
              : [
                  savedPlace("22", "테니스센터", "activity"),
                  savedPlace("21", "광장시장 순대볶음", "restaurant"),
                ],
          totalCount: 2,
        }),
      );
    }
    if (url.includes("/places")) {
      return Promise.resolve(jsonResponse(COURSE_DETAIL));
    }
    if (url.includes("/courses/")) {
      return Promise.resolve(jsonResponse(COURSE_DETAIL));
    }
    return Promise.resolve(jsonResponse(MEETING));
  });

  const router = createMemoryRouter(
    [
      { path: "/meeting/:id/edit", Component: CourseEditPage },
      { path: "/meeting/:id/detail", Component: () => <p>모임 코스</p> },
      { path: "/meeting/:id/edit/place", Component: () => <p>장소 검색</p> },
    ],
    { initialEntries: ["/meeting/1/edit"] },
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
  bodies.length = 0;
});

test("코스에 담긴 장소와 함께 저장된 장소를 보여준다", async () => {
  renderCourseEdit();

  await expect.element(page.getByText("현재 선택된 장소")).toBeInTheDocument();
  await expect.element(page.getByText("방문 장소")).toBeInTheDocument();
  await expect.element(page.getByText("테니스센터")).toBeInTheDocument();
});

test("카테고리를 고르면 그 카테고리만 받아 온다", async () => {
  renderCourseEdit();
  await expect.element(page.getByText("테니스센터")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "카페" }));

  await expect.element(page.getByText("을지로 커피한약방")).toBeInTheDocument();
  await expect.element(page.getByText("테니스센터")).not.toBeInTheDocument();
});

test("이미 코스에 담긴 장소를 고르면 알려 준다", async () => {
  renderCourseEdit();

  await userEvent.click(page.getByRole("button", { name: /광장시장 순대볶음/ }).last());

  await expect.element(page.getByText("이미 추가된 장소입니다.")).toBeInTheDocument();
});

test("저장하면 코스 순서대로 보내고 코스 상세로 간다", async () => {
  renderCourseEdit();
  await expect.element(page.getByText("테니스센터")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "해당 코스로 선택하기" }));

  await expect.element(page.getByText("모임 코스")).toBeInTheDocument();
  expect(bodies).toContain(JSON.stringify({ recommendationIds: ["21"] }));
  expect(requests.some((request) => request.startsWith("PUT"))).toBe(true);
});

test("코스 끝의 장소 추가를 누르면 장소 검색으로 간다", async () => {
  renderCourseEdit();

  await userEvent.click(page.getByLabelText("장소 추가"));

  await expect.element(page.getByText("장소 검색")).toBeInTheDocument();
});

test("목록 위 장소 추가 카드도 장소 검색으로 간다", async () => {
  renderCourseEdit();

  await userEvent.click(page.getByText("장소 추가"));

  await expect.element(page.getByText("장소 검색")).toBeInTheDocument();
});
