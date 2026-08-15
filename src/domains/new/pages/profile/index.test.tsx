import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import { NewMeetingLayout } from "../../layout";
import { ProfilePage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const PROFILE_AVATARS = [
  { id: "momo-blue", name: "파란 모모" },
  { id: "momo-yellow", name: "노란 모모" },
  { id: "momo-green", name: "초록 모모" },
  { id: "momo-pink", name: "분홍 모모" },
  { id: "momo-mint", name: "민트 모모" },
  { id: "momo-purple", name: "보라 모모" },
];

function renderProfile(initialEntry = "/new/profile") {
  fetchMock.mockResolvedValue(
    new Response(JSON.stringify(PROFILE_AVATARS), {
      status: 200,
      headers: { "content-type": "application/json" },
    }),
  );

  const router = createMemoryRouter(
    [
      {
        path: "/new",
        Component: NewMeetingLayout,
        children: [
          { path: "profile", Component: ProfilePage },
          { path: "meeting-info", Component: () => <p>모임명 및 카테고리</p> },
        ],
      },
    ],
    { initialEntries: [initialEntry] },
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

test("닉네임이 비어 있으면 다음으로 넘어갈 수 없다", async () => {
  renderProfile();

  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();
});

test("닉네임을 입력하면 다음 단계로 이동한다", async () => {
  renderProfile();

  await userEvent.fill(page.getByRole("textbox", { name: "닉네임" }), "면킬러");
  await userEvent.click(page.getByRole("button", { name: "다음" }));

  await expect.element(page.getByText("모임명 및 카테고리")).toBeInTheDocument();
});

test("프로필 이미지 변경을 누르면 캐릭터 선택 시트가 열린다", async () => {
  renderProfile();

  await userEvent.click(page.getByRole("button", { name: "프로필 이미지 변경" }));

  await expect.element(page.getByText("원하는 모습을 선택해주세요!")).toBeInTheDocument();
});

test("시트에서 고른 캐릭터를 저장하면 프로필에 반영한다", async () => {
  renderProfile();

  await userEvent.click(page.getByRole("button", { name: "프로필 이미지 변경" }));
  await userEvent.click(page.getByRole("button", { name: "노란 모모" }));
  await userEvent.click(page.getByRole("button", { name: "저장" }));

  await expect
    .element(page.getByRole("img", { name: "내 프로필" }))
    .toHaveAttribute("src", "/static/avatar-momo-yellow.webp");
});

test("닉네임 없이 다음 단계 URL 로 들어오면 프로필 작성으로 돌려보낸다", async () => {
  renderProfile("/new/meeting-info");

  await expect.element(page.getByText("닉네임을 적어볼까요?")).toBeInTheDocument();
});
