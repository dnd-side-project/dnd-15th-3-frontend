import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import type { CourseCandidateList } from "@/domains/course/api/types";
import { render } from "@/test-utils";

import { CoursePage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const CANDIDATES: CourseCandidateList = {
  courseCandidates: [
    { courseCandidateId: "c1", order: 1 },
    { courseCandidateId: "c2", order: 2 },
    { courseCandidateId: "c3", order: 3 },
  ],
  totalCount: 3,
};

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function renderCoursePage() {
  fetchMock.mockImplementation(() => Promise.resolve(jsonResponse(CANDIDATES)));

  const router = createMemoryRouter(
    [
      { path: "/meeting/:id/course", Component: CoursePage },
      {
        path: "/meeting/:id/course/:courseId",
        Component: () => <p data-testid="course-detail">코스 상세 페이지</p>,
      },
    ],
    { initialEntries: ["/meeting/1/course"] },
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

test("첫 번째 코스 후보로 이동한다", async () => {
  renderCoursePage();

  await expect.element(page.getByTestId("course-detail")).toBeInTheDocument();
});
