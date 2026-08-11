import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import { newMeetingLayout } from "../../layout";
import { MeetingCoursePage } from "./index";

function renderMeetingCourse() {
  const router = createMemoryRouter(
    [
      {
        path: "/new",
        Component: newMeetingLayout,
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

beforeEach(() => {
  sessionStorage.clear();
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
