import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import { newMeetingLayout } from "../../layout";
import { MeetingSchedulePage } from "./index";

function renderMeetingSchedule() {
  const router = createMemoryRouter(
    [
      {
        path: "/new",
        Component: newMeetingLayout,
        children: [
          { path: "meeting-schedule", Component: MeetingSchedulePage },
          { path: "complete", Component: () => <p>모임 방이 만들어졌어요</p> },
        ],
      },
    ],
    { initialEntries: ["/new/meeting-schedule"] },
  );

  render(<RouterProvider router={router} />);
}

beforeEach(() => {
  sessionStorage.clear();
});

test("날짜와 시간을 모두 정해야 다음으로 넘어갈 수 있다", async () => {
  renderMeetingSchedule();

  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();

  await userEvent.click(page.getByRole("button", { name: /YY.MM.DD/ }));
  await userEvent.click(page.getByRole("button", { name: "15" }));
  await userEvent.click(page.getByRole("button", { name: "확인" }));

  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();
});

test("고른 날짜를 YYYY-MM-DD 로 저장한다", async () => {
  renderMeetingSchedule();

  await userEvent.click(page.getByRole("button", { name: /YY.MM.DD/ }));
  await userEvent.click(page.getByRole("button", { name: "15" }));
  await userEvent.click(page.getByRole("button", { name: "확인" }));

  const draft = JSON.parse(sessionStorage.getItem("momo.meeting-draft") ?? "{}") as {
    date?: string;
  };
  expect(draft.date).toMatch(/^\d{4}-\d{2}-15$/);
});
