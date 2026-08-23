import { createMemoryRouter, RouterProvider } from "react-router";
import { expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import { render } from "@/test-utils";

import { HomePage } from "./index";

function renderHome() {
  render(<RouterProvider router={createMemoryRouter([{ path: "/", Component: HomePage }])} />);
}

test("모임 생성과 모임 참여 진입점을 렌더링한다", async () => {
  renderHome();

  await expect.element(page.getByRole("link", { name: /모임 생성/ })).toBeInTheDocument();
  await expect.element(page.getByRole("link", { name: /모임 참여/ })).toBeInTheDocument();
});

test("모임 생성은 프로필 작성으로, 모임 참여는 참여 화면으로 연결한다", async () => {
  renderHome();

  await expect
    .element(page.getByRole("link", { name: /모임 생성/ }))
    .toHaveAttribute("href", "/new/profile");
  await expect
    .element(page.getByRole("link", { name: /모임 참여/ }))
    .toHaveAttribute("href", "/join");
});
