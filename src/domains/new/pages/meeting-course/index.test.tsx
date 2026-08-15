import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import { formLayout } from "../../test-utils";
import { MeetingCoursePage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const CATEGORIES = [
  { id: "1", slug: "restaurant", name: "음식점" },
  { id: "2", slug: "cafe", name: "카페" },
  { id: "3", slug: "bar", name: "술 · 바" },
  { id: "4", slug: "walk", name: "산책 · 야경" },
  { id: "5", slug: "shopping", name: "팝업 · 쇼핑" },
  { id: "6", slug: "activity", name: "액티비티" },
  { id: "7", slug: "culture", name: "문화 · 전시" },
  { id: "8", slug: "other", name: "기타" },
];

function renderMeetingCourse() {
  fetchMock.mockImplementation((input) => {
    const url = new Request(input).url;
    const body = url.includes("/categories") ? CATEGORIES : [];
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
  });

  const router = createMemoryRouter(
    [
      {
        path: "/new",
        Component: formLayout({ nickname: "면킬러", name: "을지로 나들이" }),
        children: [
          { path: "meeting-course", Component: MeetingCoursePage },
          { path: "meeting-schedule", Component: () => <p>날짜와 시간</p> },
        ],
      },
    ],
    { initialEntries: ["/new/meeting-course"] },
  );

  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

afterEach(() => {
  fetchMock.mockReset();
});

test("코스를 고르기 전에는 안내 문구를 보여준다", async () => {
  renderMeetingCourse();

  await expect.element(page.getByText("아직 코스를 선택하지 않았어요!")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "음식점" }));

  await expect.element(page.getByText("아직 코스를 선택하지 않았어요!")).not.toBeInTheDocument();
});

test("카테고리를 고르면 코스 순서에 차례로 쌓인다", async () => {
  renderMeetingCourse();

  await userEvent.click(page.getByRole("button", { name: "음식점" }));
  await userEvent.click(page.getByRole("button", { name: "카페" }));

  const course = page.getByRole("button", { pressed: true });
  await expect.element(course.first()).toHaveTextContent("음식점");
  await expect.element(course.last()).toHaveTextContent("카페");
});

test("코스에 담은 카테고리를 다시 누르면 빠진다", async () => {
  renderMeetingCourse();

  await userEvent.click(page.getByRole("button", { name: "음식점" }));
  await expect.element(page.getByRole("button", { pressed: true })).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { pressed: true }));
  await expect.element(page.getByRole("button", { pressed: true })).not.toBeInTheDocument();
});

test("코스는 6개까지만 담긴다", async () => {
  renderMeetingCourse();

  for (const name of ["음식점", "카페", "술 · 바", "산책 · 야경", "팝업 · 쇼핑", "액티비티"]) {
    await userEvent.click(page.getByRole("button", { name }));
  }
  await userEvent.click(page.getByRole("button", { name: "문화 · 전시" }));

  expect(document.querySelectorAll('[aria-pressed="true"]').length).toBe(6);
});

test("위치와 코스를 모두 정해야 다음으로 넘어갈 수 있다", async () => {
  renderMeetingCourse();

  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();

  await userEvent.click(page.getByRole("button", { name: "음식점" }));
  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();
});
