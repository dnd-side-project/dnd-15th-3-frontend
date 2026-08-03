import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import { CtaButton, CtaButtonRow } from "./index";

test("라벨을 가진 버튼을 렌더링한다", async () => {
  render(<CtaButton>다음</CtaButton>);

  await expect.element(page.getByRole("button", { name: "다음" })).toBeEnabled();
});

test("disabled를 전달하면 버튼이 비활성화된다", async () => {
  render(<CtaButton disabled>다음</CtaButton>);

  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();
});

test("버튼을 클릭하면 onClick이 호출된다", async () => {
  const onClick = vi.fn();
  render(<CtaButton onClick={onClick}>다음</CtaButton>);

  const button = page.getByRole("button", { name: "다음" });
  await expect.element(button).toBeInTheDocument();

  await userEvent.click(button);

  expect(onClick).toHaveBeenCalledOnce();
});

test("disabled 상태에서는 클릭해도 onClick이 호출되지 않는다", async () => {
  const onClick = vi.fn();
  render(
    <CtaButton disabled onClick={onClick}>
      다음
    </CtaButton>,
  );

  const button = page.getByRole("button", { name: "다음" });
  await expect.element(button).toBeDisabled();

  // 비활성 버튼은 actionability 검사를 통과하지 못하므로 force로 실제 클릭만 발생시킨다.
  await userEvent.click(button, { force: true });

  expect(onClick).not.toHaveBeenCalled();
});

test("CtaButtonRow는 기본 backLabel과 nextLabel 버튼을 함께 렌더링한다", async () => {
  render(<CtaButtonRow nextLabel="다음" onBack={() => {}} onNext={() => {}} />);

  await expect.element(page.getByRole("button", { name: "위로" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "다음" })).toBeInTheDocument();
});

test("CtaButtonRow의 backLabel을 커스텀할 수 있다", async () => {
  render(<CtaButtonRow backLabel="이전" nextLabel="다음" onBack={() => {}} onNext={() => {}} />);

  await expect.element(page.getByRole("button", { name: "이전" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "위로" })).not.toBeInTheDocument();
});

test("CtaButtonRow는 nextDisabled일 때 next 버튼만 비활성화한다", async () => {
  render(<CtaButtonRow nextDisabled nextLabel="다음" onBack={() => {}} onNext={() => {}} />);

  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();
  await expect.element(page.getByRole("button", { name: "위로" })).toBeEnabled();
});

test("CtaButtonRow의 back 버튼을 클릭하면 onBack만 호출된다", async () => {
  const onBack = vi.fn();
  const onNext = vi.fn();
  render(<CtaButtonRow nextLabel="다음" onBack={onBack} onNext={onNext} />);

  const backButton = page.getByRole("button", { name: "위로" });
  await expect.element(backButton).toBeInTheDocument();

  await userEvent.click(backButton);

  expect(onBack).toHaveBeenCalledOnce();
  expect(onNext).not.toHaveBeenCalled();
});

test("CtaButtonRow의 next 버튼을 클릭하면 onNext만 호출된다", async () => {
  const onBack = vi.fn();
  const onNext = vi.fn();
  render(<CtaButtonRow nextLabel="다음" onBack={onBack} onNext={onNext} />);

  const nextButton = page.getByRole("button", { name: "다음" });
  await expect.element(nextButton).toBeInTheDocument();

  await userEvent.click(nextButton);

  expect(onNext).toHaveBeenCalledOnce();
  expect(onBack).not.toHaveBeenCalled();
});

test("CtaButtonRow는 nextDisabled일 때 next 버튼을 클릭해도 onNext가 호출되지 않는다", async () => {
  const onBack = vi.fn();
  const onNext = vi.fn();
  render(<CtaButtonRow nextDisabled nextLabel="다음" onBack={onBack} onNext={onNext} />);

  const nextButton = page.getByRole("button", { name: "다음" });
  await expect.element(nextButton).toBeDisabled();

  // 비활성 버튼은 actionability 검사를 통과하지 못하므로 force로 실제 클릭만 발생시킨다.
  await userEvent.click(nextButton, { force: true });

  expect(onNext).not.toHaveBeenCalled();
  expect(onBack).not.toHaveBeenCalled();
});
