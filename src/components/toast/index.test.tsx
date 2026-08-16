import { expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import { ToastProvider } from "./index";
import { toast } from "./manager";

function Buttons() {
  return (
    <>
      <button type="button" onClick={() => toast.add({ title: "초대 코드가 복사되었습니다." })}>
        초대 코드 복사
      </button>
      <button type="button" onClick={() => toast.add({ title: "링크가 복사되었습니다." })}>
        링크 복사
      </button>
    </>
  );
}

function renderToasts() {
  render(
    <ToastProvider>
      <Buttons />
    </ToastProvider>,
  );
}

test("띄우기 전에는 아무것도 없다", async () => {
  renderToasts();

  await expect.element(page.getByText("초대 코드가 복사되었습니다.")).not.toBeInTheDocument();
});

test("띄우면 나타났다가 스스로 사라진다", async () => {
  renderToasts();

  await userEvent.click(page.getByRole("button", { name: "초대 코드 복사" }));

  await expect.element(page.getByText("초대 코드가 복사되었습니다.")).toBeInTheDocument();
  await expect.element(page.getByText("초대 코드가 복사되었습니다.")).not.toBeInTheDocument();
});

test("잇따라 띄우면 함께 쌓인다", async () => {
  renderToasts();

  await userEvent.click(page.getByRole("button", { name: "초대 코드 복사" }));
  await userEvent.click(page.getByRole("button", { name: "링크 복사" }));

  await expect.element(page.getByText("링크가 복사되었습니다.")).toBeInTheDocument();
  await expect.element(page.getByText("초대 코드가 복사되었습니다.")).toBeInTheDocument();
});
