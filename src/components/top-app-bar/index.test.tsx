import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import { TopAppBar } from "./index";

test("제목을 렌더링한다", async () => {
  render(<TopAppBar title="모임 만들기" />);

  await expect.element(page.getByText("모임 만들기")).toBeInTheDocument();
});

test("onBack이 없으면 뒤로 가기 버튼을 렌더링하지 않는다", async () => {
  render(<TopAppBar title="모임 만들기" />);

  await expect.element(page.getByRole("button", { name: "뒤로 가기" })).not.toBeInTheDocument();
});

test("onBack이 있으면 뒤로 가기 버튼을 클릭해 호출한다", async () => {
  const onBack = vi.fn();
  render(<TopAppBar title="모임 만들기" onBack={onBack} />);

  await userEvent.click(page.getByRole("button", { name: "뒤로 가기" }));

  expect(onBack).toHaveBeenCalledTimes(1);
});

test("action을 오른쪽 슬롯에 렌더링한다", async () => {
  render(<TopAppBar title="모임 만들기" action={<button type="button">다음</button>} />);

  await expect.element(page.getByRole("button", { name: "다음" })).toBeInTheDocument();
});

test("바 높이는 64px이다", async () => {
  render(<TopAppBar title="모임 만들기" onBack={vi.fn()} />);

  const bar = page.getByRole("banner");
  await expect.element(bar).toBeInTheDocument();

  expect(bar.element().getBoundingClientRect().height).toBe(64);
});
