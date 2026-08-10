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

  await userEvent.click(button, { force: true });

  expect(onClick).not.toHaveBeenCalled();
});

test("icon을 전달하면 라벨과 함께 렌더링한다", async () => {
  render(<CtaButton icon={<span data-testid="cta-icon" />}>공유하기</CtaButton>);

  await expect.element(page.getByRole("button", { name: "공유하기" })).toBeInTheDocument();
  await expect.element(page.getByTestId("cta-icon")).toBeInTheDocument();
});

test("보조 버튼이 아이콘만일 때 secondaryAriaLabel로 이름을 붙인다", async () => {
  const onSecondary = vi.fn();
  render(
    <CtaButtonRow
      primaryLabel="다음"
      secondaryAriaLabel="공유하기"
      secondaryLabel={<span data-testid="share-icon" />}
      onPrimary={() => {}}
      onSecondary={onSecondary}
    />,
  );

  const shareButton = page.getByRole("button", { name: "공유하기" });
  await expect.element(shareButton).toBeInTheDocument();

  await shareButton.click();

  expect(onSecondary).toHaveBeenCalledOnce();
});

test("CtaButtonRow는 기본 보조/주요 버튼을 함께 렌더링한다", async () => {
  render(<CtaButtonRow primaryLabel="다음" onSecondary={() => {}} onPrimary={() => {}} />);

  await expect.element(page.getByRole("button", { name: "뒤로" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "다음" })).toBeInTheDocument();
});

test("CtaButtonRow의 보조 버튼 라벨을 커스텀할 수 있다", async () => {
  render(
    <CtaButtonRow
      secondaryLabel="이전"
      primaryLabel="다음"
      onSecondary={() => {}}
      onPrimary={() => {}}
    />,
  );

  await expect.element(page.getByRole("button", { name: "이전" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "뒤로" })).not.toBeInTheDocument();
});

test("CtaButtonRow는 primaryDisabled일 때 주요 버튼만 비활성화한다", async () => {
  render(
    <CtaButtonRow
      primaryDisabled
      primaryLabel="다음"
      onSecondary={() => {}}
      onPrimary={() => {}}
    />,
  );

  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();
  await expect.element(page.getByRole("button", { name: "뒤로" })).toBeEnabled();
});

test("CtaButtonRow의 보조 버튼을 클릭하면 onSecondary만 호출된다", async () => {
  const onSecondary = vi.fn();
  const onPrimary = vi.fn();
  render(<CtaButtonRow primaryLabel="다음" onSecondary={onSecondary} onPrimary={onPrimary} />);

  const backButton = page.getByRole("button", { name: "뒤로" });
  await expect.element(backButton).toBeInTheDocument();

  await userEvent.click(backButton);

  expect(onSecondary).toHaveBeenCalledOnce();
  expect(onPrimary).not.toHaveBeenCalled();
});

test("CtaButtonRow의 주요 버튼을 클릭하면 onPrimary만 호출된다", async () => {
  const onSecondary = vi.fn();
  const onPrimary = vi.fn();
  render(<CtaButtonRow primaryLabel="다음" onSecondary={onSecondary} onPrimary={onPrimary} />);

  const nextButton = page.getByRole("button", { name: "다음" });
  await expect.element(nextButton).toBeInTheDocument();

  await userEvent.click(nextButton);

  expect(onPrimary).toHaveBeenCalledOnce();
  expect(onSecondary).not.toHaveBeenCalled();
});

test("CtaButtonRow는 primaryDisabled일 때 주요 버튼을 클릭해도 onPrimary가 호출되지 않는다", async () => {
  const onSecondary = vi.fn();
  const onPrimary = vi.fn();
  render(
    <CtaButtonRow
      primaryDisabled
      primaryLabel="다음"
      onSecondary={onSecondary}
      onPrimary={onPrimary}
    />,
  );

  const nextButton = page.getByRole("button", { name: "다음" });
  await expect.element(nextButton).toBeDisabled();

  await userEvent.click(nextButton, { force: true });

  expect(onPrimary).not.toHaveBeenCalled();
  expect(onSecondary).not.toHaveBeenCalled();
});
