import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vite-plus/test";

import { PreferenceButton } from "./index";

test("count를 렌더링한다", () => {
  render(<PreferenceButton count={3} type="like" />);
  expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
});

test("count가 0이어도 0을 렌더링한다", () => {
  render(<PreferenceButton count={0} type="like" />);
  expect(screen.getByRole("button", { name: "0" })).toBeInTheDocument();
});

test("selected가 true이면 눌린 상태이다", () => {
  render(<PreferenceButton count={3} selected type="like" />);
  expect(screen.getByRole("button", { pressed: true })).toBeInTheDocument();
  expect(screen.queryByRole("button", { pressed: false })).not.toBeInTheDocument();
});

test("selected가 false이면 눌리지 않은 상태이다", () => {
  render(<PreferenceButton count={3} type="like" />);
  expect(screen.getByRole("button", { pressed: false })).toBeInTheDocument();
  expect(screen.queryByRole("button", { pressed: true })).not.toBeInTheDocument();
});

test("disabled가 true이면 버튼이 비활성화된다", () => {
  render(<PreferenceButton count={1} disabled type="like" />);
  expect(screen.getByRole("button", { name: "1" })).toBeDisabled();
});

test("like 타입이 버튼으로 렌더링된다", () => {
  render(<PreferenceButton count={1} type="like" />);
  expect(screen.getByRole("button", { name: "1" })).toBeEnabled();
});

test("dislike 타입이 버튼으로 렌더링된다", () => {
  render(<PreferenceButton count={2} type="dislike" />);
  expect(screen.getByRole("button", { name: "2" })).toBeEnabled();
});

test("클릭하면 onToggle이 호출된다", async () => {
  const user = userEvent.setup();
  const onToggle = vi.fn();
  render(<PreferenceButton count={1} type="like" onToggle={onToggle} />);

  await user.click(screen.getByRole("button", { name: "1" }));

  expect(onToggle).toHaveBeenCalledTimes(1);
});

test("selected가 false일 때 클릭하면 onToggle이 true로 호출된다", async () => {
  const user = userEvent.setup();
  const onToggle = vi.fn();
  render(<PreferenceButton count={1} type="like" onToggle={onToggle} />);

  await user.click(screen.getByRole("button", { pressed: false }));

  expect(onToggle).toHaveBeenCalledWith(true);
});

test("selected가 true일 때 클릭하면 onToggle이 false로 호출된다", async () => {
  const user = userEvent.setup();
  const onToggle = vi.fn();
  render(<PreferenceButton count={1} selected type="like" onToggle={onToggle} />);

  await user.click(screen.getByRole("button", { pressed: true }));

  expect(onToggle).toHaveBeenCalledWith(false);
});

test("disabled이면 클릭해도 onToggle이 호출되지 않는다", async () => {
  const user = userEvent.setup();
  const onToggle = vi.fn();
  render(<PreferenceButton count={1} disabled type="like" onToggle={onToggle} />);

  await user.click(screen.getByRole("button", { name: "1" }));

  expect(onToggle).not.toHaveBeenCalled();
});
