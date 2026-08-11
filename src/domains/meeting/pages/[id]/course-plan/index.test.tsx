import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../../test-utils";
import type { CoursePlan } from "../../../api/types";
import { CoursePlanPage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const PLAN: CoursePlan = {
  meetingId: "1",
  maxSteps: 6,
  version: 3,
  categorySteps: [
    { id: "1", name: "음식점", slug: "restaurant", order: 1 },
    { id: "2", name: "카페", slug: "cafe", order: 2 },
  ],
};

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function renderCoursePlan() {
  const router = createMemoryRouter(
    [{ path: "/meeting/:id/course-plan", Component: CoursePlanPage }],
    {
      initialEntries: ["/meeting/1/course-plan"],
    },
  );

  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  localStorage.setItem("momo.access-token.1", "host-session-token");
  fetchMock.mockResolvedValue(jsonResponse(PLAN));
});

afterEach(() => {
  fetchMock.mockReset();
  localStorage.clear();
});

test("저장된 코스를 순서대로 보여준다", async () => {
  renderCoursePlan();

  const course = page.getByRole("button", { pressed: true });
  await expect.element(course.first()).toHaveTextContent("음식점");
  await expect.element(course.last()).toHaveTextContent("카페");
});

test("편집을 누르기 전에는 카테고리 목록을 보여주지 않는다", async () => {
  renderCoursePlan();

  await expect.element(page.getByRole("button", { name: "편집" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "술 · 바" })).not.toBeInTheDocument();

  expect(document.querySelectorAll('[aria-pressed="true"]').length).toBe(2);
});

test("편집 중에 담은 코스를 저장하면 조회한 version 으로 PUT 한다", async () => {
  renderCoursePlan();

  await userEvent.click(page.getByRole("button", { name: "편집" }));
  await userEvent.click(page.getByRole("button", { name: "술 · 바" }));
  await userEvent.click(page.getByRole("button", { name: "저장" }));

  const put = fetchMock.mock.calls.find(([, init]) => init?.method === "PUT");
  expect(put).toBeDefined();
  expect(new Request(put![0]).url).toContain("/api/v1/meetings/1/course-plan?accessToken=");
  expect(JSON.parse(put![1]?.body as string)).toEqual({
    categorySlugs: ["restaurant", "cafe", "bar"],
    version: 3,
  });
});
