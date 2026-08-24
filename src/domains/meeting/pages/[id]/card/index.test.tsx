import { createMemoryRouter, RouterProvider } from "react-router";
import { expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import { render } from "@/test-utils";

import { CardPage } from "./index";

function renderCard() {
  const router = createMemoryRouter([{ path: "/meeting/:id/card", Component: CardPage }], {
    initialEntries: ["/meeting/1/card"],
  });
  render(<RouterProvider router={router} />);
}

test("편지 유도 텍스트를 렌더링한다", async () => {
  renderCard();

  await expect.element(page.getByText("편지를 클릭해 확인하세요!")).toBeInTheDocument();
});

test("편지 확인하기 버튼을 렌더링한다", async () => {
  renderCard();

  await expect.element(page.getByRole("button", { name: "편지 확인하기" })).toBeInTheDocument();
});

test("뒤로 가기 버튼을 렌더링한다", async () => {
  renderCard();

  await expect.element(page.getByRole("button", { name: "뒤로 가기" })).toBeInTheDocument();
});
