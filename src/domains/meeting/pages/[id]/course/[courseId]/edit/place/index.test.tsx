import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { ToastProvider } from "@/components/toast";
import { render } from "@/test-utils";

import { CourseCandidatePlaceAddPage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const MEETING_ID = "1";
const COURSE_ID = "c1";

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
      return Promise.resolve(jsonResponse({ id: "rec-33", categoryId: "1" }, 201));
    }
    if (request.url.includes("/courses/")) {
      return Promise.resolve(
        jsonResponse({ courseName: "", totalDistanceKm: 0, totalCount: 1, route: [] }),
      );
    }
    if (request.url.includes("/places/search")) {
      return Promise.resolve(jsonResponse(PLACES));
    }
    return Promise.resolve(jsonResponse({}));
  });

  const router = createMemoryRouter(
    [
      {
        path: "/meeting/:id/course/:courseId/edit/place",
        Component: CourseCandidatePlaceAddPage,
      },
      {
        path: "/meeting/:id/course/:courseId/edit",
        Component: () => <p>코스 수정</p>,
      },
    ],
    { initialEntries: [`/meeting/${MEETING_ID}/course/${COURSE_ID}/edit/place`] },
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
});

test("장소를 고르면 추천에 올린 뒤 URL 의 courseId 로 코스에 담는다", async () => {
  renderAddPlace();

  await userEvent.fill(page.getByPlaceholder("장소를 검색하세요"), "테니스");
  await userEvent.click(page.getByRole("button", { name: /테니스센터/ }));

  await expect.element(page.getByText("코스 수정")).toBeInTheDocument();
  expect(requests).toContain("POST /api/v1/meetings/1/recommendations");
  expect(requests).toContain(`POST /api/v1/meetings/1/courses/${COURSE_ID}/places`);
});

test("이미 담긴 장소면 알려 준다", async () => {
  renderAddPlace({ conflict: true });

  await userEvent.fill(page.getByPlaceholder("장소를 검색하세요"), "테니스");
  await userEvent.click(page.getByRole("button", { name: /테니스센터/ }));

  await expect.element(page.getByText("이미 추가된 장소입니다.")).toBeInTheDocument();
});
