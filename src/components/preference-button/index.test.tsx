import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import { PreferenceButton } from "./index";

test("like 타입은 좋아요와 count로 이름이 붙는다", async () => {
  render(<PreferenceButton count={3} type="like" />);
  await expect.element(page.getByRole("button", { name: "좋아요 3" })).toBeEnabled();
});

test("dislike 타입은 싫어요와 count로 이름이 붙는다", async () => {
  render(<PreferenceButton count={2} type="dislike" />);
  await expect.element(page.getByRole("button", { name: "싫어요 2" })).toBeEnabled();
});

test("count가 0이어도 0을 렌더링한다", async () => {
  render(<PreferenceButton count={0} type="like" />);
  await expect.element(page.getByRole("button", { name: "좋아요 0" })).toHaveTextContent("0");
});

test("selected가 true이면 눌린 상태이다", async () => {
  render(<PreferenceButton count={3} selected type="like" />);
  await expect.element(page.getByRole("button", { pressed: true })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { pressed: false })).not.toBeInTheDocument();
});

test("selected가 false이면 눌리지 않은 상태이다", async () => {
  render(<PreferenceButton count={3} type="like" />);
  await expect.element(page.getByRole("button", { pressed: false })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { pressed: true })).not.toBeInTheDocument();
});

test("disabled가 true이면 버튼이 비활성화된다", async () => {
  render(<PreferenceButton count={1} disabled type="like" />);
  await expect.element(page.getByRole("button", { name: "좋아요 1" })).toBeDisabled();
});

test("selected가 false일 때 클릭하면 onToggle이 true로 호출된다", async () => {
  const onToggle = vi.fn();
  render(<PreferenceButton count={1} type="like" onToggle={onToggle} />);

  await userEvent.click(page.getByRole("button", { pressed: false }));

  expect(onToggle).toHaveBeenCalledWith(true);
});

test("selected가 true일 때 클릭하면 onToggle이 false로 호출된다", async () => {
  const onToggle = vi.fn();
  render(<PreferenceButton count={1} selected type="like" onToggle={onToggle} />);

  await userEvent.click(page.getByRole("button", { pressed: true }));

  expect(onToggle).toHaveBeenCalledWith(false);
});

test("disabled이면 클릭해도 onToggle이 호출되지 않는다", async () => {
  const onToggle = vi.fn();
  render(<PreferenceButton count={1} disabled type="like" onToggle={onToggle} />);

  await userEvent.click(page.getByRole("button", { name: "좋아요 1" }), { force: true });

  expect(onToggle).not.toHaveBeenCalled();
});
