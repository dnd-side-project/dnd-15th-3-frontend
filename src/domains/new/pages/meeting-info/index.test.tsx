import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import { newMeetingLayout } from "../../layout";
import { MeetingInfoPage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const MEETING_TYPES = [
  { id: "1", code: "SOCIAL", name: "친목" },
  { id: "2", code: "DATING_HOBBY", name: "데이트" },
  { id: "3", code: "COMPANY_DINNER", name: "회식" },
  { id: "4", code: "FAMILY", name: "가족" },
  { id: "5", code: "TRAVEL", name: "여행" },
  { id: "6", code: "STUDY", name: "스터디" },
  { id: "7", code: "BUSINESS", name: "비즈니스" },
  { id: "8", code: "ANNIVERSARY_EXERCISE", name: "취미" },
  { id: "9", code: "OTHER", name: "기타" },
];

function renderMeetingInfo() {
  fetchMock.mockResolvedValue(
    new Response(JSON.stringify(MEETING_TYPES), {
      status: 200,
      headers: { "content-type": "application/json" },
    }),
  );

  const router = createMemoryRouter(
    [
      {
        path: "/new",
        Component: newMeetingLayout,
        children: [
          { path: "meeting-info", Component: MeetingInfoPage },
          { path: "meeting-course", Component: () => <p>위치 및 코스</p> },
        ],
      },
    ],
    { initialEntries: ["/new/meeting-info"] },
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

afterEach(() => {
  fetchMock.mockReset();
});

test("이름과 카테고리를 모두 채워야 다음으로 넘어갈 수 있다", async () => {
  renderMeetingInfo();

  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();

  await userEvent.fill(page.getByRole("textbox", { name: "모임 이름" }), "성수 나들이");
  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();

  await userEvent.click(page.getByRole("button", { name: "친목" }));
  await expect.element(page.getByRole("button", { name: "다음" })).toBeEnabled();
});

test("선택한 카테고리 하나만 눌린 상태로 표시한다", async () => {
  renderMeetingInfo();

  await userEvent.click(page.getByRole("button", { name: "친목" }));
  await expect
    .element(page.getByRole("button", { name: "친목" }))
    .toHaveAttribute("aria-pressed", "true");

  await userEvent.click(page.getByRole("button", { name: "여행" }));
  await expect
    .element(page.getByRole("button", { name: "여행" }))
    .toHaveAttribute("aria-pressed", "true");
  await expect
    .element(page.getByRole("button", { name: "친목" }))
    .toHaveAttribute("aria-pressed", "false");
});

test("모두 입력하면 위치·코스 단계로 이동한다", async () => {
  renderMeetingInfo();

  await userEvent.fill(page.getByRole("textbox", { name: "모임 이름" }), "성수 나들이");
  await userEvent.click(page.getByRole("button", { name: "친목" }));
  await userEvent.click(page.getByRole("button", { name: "다음" }));

  await expect.element(page.getByText("위치 및 코스")).toBeInTheDocument();
});
