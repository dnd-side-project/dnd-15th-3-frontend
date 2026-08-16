import { createMemoryRouter, RouterProvider } from "react-router";
import { expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import { JoinErrorPage } from "./index";

function renderError() {
  const router = createMemoryRouter(
    [
      { path: "/join/error", Component: JoinErrorPage },
      { path: "/join", Component: () => <p>모임 참여</p> },
    ],
    { initialEntries: ["/join/error"] },
  );

  render(<RouterProvider router={router} />);
}

test("타이틀과 설명을 렌더링한다", async () => {
  renderError();

  await expect.element(page.getByText("앗, 길을 잃은 것 같아요!")).toBeInTheDocument();
  await expect.element(page.getByText("초대 링크나 코드를 다시 확인해주세요.")).toBeInTheDocument();
});

test("말풍선 텍스트를 렌더링한다", async () => {
  renderError();

  await expect.element(page.getByText("찾을 수 없어요...")).toBeInTheDocument();
});

test("다시 시도 버튼을 누르면 /join 으로 이동한다", async () => {
  renderError();

  await userEvent.click(page.getByRole("button", { name: "다시 시도" }));

  await expect.element(page.getByText("모임 참여")).toBeInTheDocument();
});
