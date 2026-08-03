import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vite-plus/test";

import { CtaButton, CtaButtonRow } from "./index";

test("라벨을 가진 버튼을 렌더링한다", () => {
  render(<CtaButton>다음</CtaButton>);

  expect(screen.getByRole("button", { name: "다음" })).toBeEnabled();
});

test("disabled를 전달하면 버튼이 비활성화된다", () => {
  render(<CtaButton disabled>다음</CtaButton>);

  expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
});

test("버튼을 클릭하면 onClick이 호출된다", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<CtaButton onClick={onClick}>다음</CtaButton>);

  await user.click(screen.getByRole("button", { name: "다음" }));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("disabled 상태에서는 클릭해도 onClick이 호출되지 않는다", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(
    <CtaButton disabled onClick={onClick}>
      다음
    </CtaButton>,
  );

  await user.click(screen.getByRole("button", { name: "다음" }));

  expect(onClick).not.toHaveBeenCalled();
});

test("CtaButtonRow는 기본 backLabel과 nextLabel 버튼을 함께 렌더링한다", () => {
  render(<CtaButtonRow nextLabel="다음" onBack={() => {}} onNext={() => {}} />);

  expect(screen.getByRole("button", { name: "위로" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "다음" })).toBeInTheDocument();
});

test("CtaButtonRow의 backLabel을 커스텀할 수 있다", () => {
  render(<CtaButtonRow backLabel="이전" nextLabel="다음" onBack={() => {}} onNext={() => {}} />);

  expect(screen.getByRole("button", { name: "이전" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "위로" })).not.toBeInTheDocument();
});

test("CtaButtonRow는 nextDisabled일 때 next 버튼만 비활성화한다", () => {
  render(<CtaButtonRow nextDisabled nextLabel="다음" onBack={() => {}} onNext={() => {}} />);

  expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "위로" })).toBeEnabled();
});

test("CtaButtonRow의 back 버튼을 클릭하면 onBack만 호출된다", async () => {
  const user = userEvent.setup();
  const onBack = vi.fn();
  const onNext = vi.fn();
  render(<CtaButtonRow nextLabel="다음" onBack={onBack} onNext={onNext} />);

  await user.click(screen.getByRole("button", { name: "위로" }));

  expect(onBack).toHaveBeenCalledTimes(1);
  expect(onNext).not.toHaveBeenCalled();
});

test("CtaButtonRow의 next 버튼을 클릭하면 onNext만 호출된다", async () => {
  const user = userEvent.setup();
  const onBack = vi.fn();
  const onNext = vi.fn();
  render(<CtaButtonRow nextLabel="다음" onBack={onBack} onNext={onNext} />);

  await user.click(screen.getByRole("button", { name: "다음" }));

  expect(onNext).toHaveBeenCalledTimes(1);
  expect(onBack).not.toHaveBeenCalled();
});

test("CtaButtonRow는 nextDisabled일 때 next 버튼을 클릭해도 onNext가 호출되지 않는다", async () => {
  const user = userEvent.setup();
  const onBack = vi.fn();
  const onNext = vi.fn();
  render(<CtaButtonRow nextDisabled nextLabel="다음" onBack={onBack} onNext={onNext} />);

  await user.click(screen.getByRole("button", { name: "다음" }));

  expect(onNext).not.toHaveBeenCalled();
  expect(onBack).not.toHaveBeenCalled();
});
