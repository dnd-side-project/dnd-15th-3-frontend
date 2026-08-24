import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { ToastProvider } from "../../../../../../../components/toast";
import { render } from "../../../../../../../test-utils";
import { CourseCandidateEditPage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const MEETING_ID = "1";
const COURSE_ID = "c1";

const CATEGORIES = [
  { id: "1", slug: "restaurant", name: "음식점" },
  { id: "2", slug: "cafe", name: "카페" },
];

const INITIAL_DETAIL = {
  courseName: "뚜벅이 최적 코스",
  totalDistanceKm: 2.1,
  totalCount: 1,
  route: [
    {
      recommendationId: "rec-1",
      placeId: "place-1",
      order: 1,
      name: "경복궁",
      category: "문화",
      categorySlug: "culture",
      address: "서울 종로구 사직로 161",
      primaryImageUrl: null,
      longitude: 126.9748,
      latitude: 37.5796,
      walkDurationToNextMin: null,
    },
  ],
};

const SAVED_DETAIL = {
  courseName: "뚜벅이 최적 코스",
  totalDistanceKm: 3.5,
  totalCount: 2,
  route: [
    {
      recommendationId: "rec-1",
      placeId: "place-1",
      order: 1,
      name: "경복궁",
      category: "문화",
      categorySlug: "culture",
      address: "서울 종로구 사직로 161",
      primaryImageUrl: null,
      longitude: 126.9748,
      latitude: 37.5796,
      walkDurationToNextMin: 8,
    },
    {
      recommendationId: "rec-2",
      placeId: "place-2",
      order: 2,
      name: "통인시장",
      category: "쇼핑",
      categorySlug: "shopping",
      address: "서울 종로구 통인동 10-2",
      primaryImageUrl: null,
      longitude: 126.9712,
      latitude: 37.5775,
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

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const requests: string[] = [];
const bodies: string[] = [];

function renderCourseCandidateEdit() {
  fetchMock.mockImplementation((input, init) => {
    const request = new Request(input, init);
    requests.push(`${request.method} ${request.url}`);
    if (typeof init?.body === "string") {
      bodies.push(init.body);
    }

    const url = request.url;
    if (url.includes("/categories")) {
      return Promise.resolve(jsonResponse(CATEGORIES));
    }
    if (url.includes("/excluded-places")) {
      return Promise.resolve(
        jsonResponse({
          items: [savedPlace("rec-9", "을지로 커피한약방", "cafe")],
          totalCount: 1,
        }),
      );
    }
    if (request.method === "PUT" && url.includes("/places")) {
      return Promise.resolve(jsonResponse(SAVED_DETAIL));
    }
    if (url.includes(`/courses/${COURSE_ID}`)) {
      return Promise.resolve(jsonResponse(INITIAL_DETAIL));
    }
    return Promise.resolve(jsonResponse({}));
  });

  const router = createMemoryRouter(
    [
      { path: "/meeting/:id/course/:courseId/edit", Component: CourseCandidateEditPage },
      { path: "/meeting/:id/course/:courseId", Component: () => <p>코스 상세</p> },
      {
        path: "/meeting/:id/course/:courseId/edit/place",
        Component: () => <p>장소 검색</p>,
      },
    ],
    { initialEntries: [`/meeting/${MEETING_ID}/course/${COURSE_ID}/edit`] },
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
  bodies.length = 0;
});

test("코스 상세를 URL 의 courseId 로 불러온다", async () => {
  renderCourseCandidateEdit();

  await expect.element(page.getByText("경복궁")).toBeInTheDocument();
  expect(requests.some((r) => r.includes(`/courses/${COURSE_ID}`))).toBe(true);
});

test("저장하면 PUT 으로 recommendationIds 를 보내고 화면에 머무른다", async () => {
  renderCourseCandidateEdit();
  await expect.element(page.getByText("경복궁")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "해당 코스로 선택하기" }));

  expect(bodies).toContain(JSON.stringify({ recommendationIds: ["rec-1"] }));
  expect(requests.some((r) => r.startsWith("PUT"))).toBe(true);
  await expect.element(page.getByText("해당 코스로 선택하기")).toBeInTheDocument();
  await expect.element(page.getByText("코스 상세")).not.toBeInTheDocument();
});

test("저장 후 PUT 응답으로 화면이 갱신된다", async () => {
  renderCourseCandidateEdit();
  await expect.element(page.getByText("2.1km")).toBeInTheDocument();
  const getDetailCount = () =>
    requests.filter((r) => r.startsWith("GET") && r.includes(`/courses/${COURSE_ID}?`)).length;

  await userEvent.click(page.getByRole("button", { name: "해당 코스로 선택하기" }));

  await expect.element(page.getByText("3.5km")).toBeInTheDocument();
  await expect.element(page.getByText("통인시장")).toBeInTheDocument();
  expect(getDetailCount()).toBe(1);
});

test("장소 추가를 누르면 코스 후보 edit/place 로 이동한다", async () => {
  renderCourseCandidateEdit();

  await userEvent.click(page.getByLabelText("장소 추가"));

  await expect.element(page.getByText("장소 검색")).toBeInTheDocument();
});
