import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import { Chip, ChipGroup } from "./index";

test("라벨 텍스트를 렌더링한다", async () => {
  render(<Chip>음식점</Chip>);

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
});

test("icon을 전달하면 라벨 앞에 아이콘이 렌더링된다", async () => {
  render(<Chip icon={<svg data-testid="chip-icon" />}>음식점</Chip>);

  await expect.element(page.getByTestId("chip-icon")).toBeInTheDocument();
});

test("icon을 전달해도 접근 가능한 이름은 라벨 텍스트만 유지된다", async () => {
  render(<Chip icon={<svg data-testid="chip-icon" />}>음식점</Chip>);

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
});

test("icon이 없으면 아이콘 슬롯이 렌더링되지 않는다", async () => {
  render(<Chip>음식점</Chip>);

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
  await expect.element(page.getByTestId("chip-icon")).not.toBeInTheDocument();
});

test("미선택 상태는 pressed가 false이고 삭제 버튼이 없다", async () => {
  render(<Chip>음식점</Chip>);

  await expect
    .element(page.getByRole("button", { name: "음식점", pressed: false }))
    .toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "삭제" })).not.toBeInTheDocument();
});

test("selected가 true면 pressed가 true다", async () => {
  render(<Chip selected>전체</Chip>);

  await expect
    .element(page.getByRole("button", { name: "전체", pressed: true }))
    .toBeInTheDocument();
});

test("selected이고 onRemove를 전달하면 삭제 버튼이 렌더링된다", async () => {
  render(
    <Chip selected onRemove={() => {}}>
      문화·예술
    </Chip>,
  );

  await expect.element(page.getByRole("button", { name: "문화·예술 삭제" })).toBeInTheDocument();
});

test("onRemove가 없으면 selected여도 삭제 버튼이 없다 (전체 칩)", async () => {
  render(<Chip selected>전체</Chip>);

  await expect
    .element(page.getByRole("button", { name: "전체", pressed: true }))
    .toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "삭제" })).not.toBeInTheDocument();
});

test("selected가 false면 onRemove를 전달해도 삭제 버튼이 없다", async () => {
  render(
    <Chip selected={false} onRemove={() => {}}>
      음식점
    </Chip>,
  );

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "삭제" })).not.toBeInTheDocument();
});

test("ChipGroup은 자식 칩들을 함께 렌더링한다", async () => {
  render(
    <ChipGroup>
      <Chip>전체</Chip>
      <Chip>음식점</Chip>
    </ChipGroup>,
  );

  await expect.element(page.getByRole("button", { name: "전체" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
});

test("칩 본체를 클릭하면 onClick이 호출된다", async () => {
  const onClick = vi.fn();
  render(<Chip onClick={onClick}>음식점</Chip>);

  await userEvent.click(page.getByRole("button", { name: "음식점" }));

  expect(onClick).toHaveBeenCalledOnce();
});

test("삭제 버튼을 클릭하면 onRemove만 호출되고 onClick은 호출되지 않는다", async () => {
  const onClick = vi.fn();
  const onRemove = vi.fn();
  render(
    <Chip selected onClick={onClick} onRemove={onRemove}>
      문화·예술
    </Chip>,
  );

  await userEvent.click(page.getByRole("button", { name: "문화·예술 삭제" }));

  expect(onRemove).toHaveBeenCalledOnce();
  expect(onClick).not.toHaveBeenCalled();
});

test("기본 size는 md이고 높이가 38px다", async () => {
  render(<Chip>음식점</Chip>);

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
  const label = page.getByRole("button", { name: "음식점" }).element();

  expect(label.getBoundingClientRect().height).toBe(38);
});

test("size가 sm이면 높이가 34px다", async () => {
  render(<Chip size="sm">음식점</Chip>);

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
  const label = page.getByRole("button", { name: "음식점" }).element();

  expect(label.getBoundingClientRect().height).toBe(34);
});

test("가로 패딩이 디자인값 16px과 일치한다", async () => {
  render(<Chip>음식점</Chip>);

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
  const label = page.getByRole("button", { name: "음식점" }).element();

  const style = getComputedStyle(label);
  expect(style.paddingLeft).toBe("16px");
  expect(style.paddingRight).toBe("16px");
});

test("variant가 overlay면 토글이 아니므로 aria-pressed를 노출하지 않는다", async () => {
  render(<Chip variant="overlay">음식점</Chip>);

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
  const label = page.getByRole("button", { name: "음식점" }).element();

  expect(label.hasAttribute("aria-pressed")).toBe(false);
});

test("variant가 overlay여도 클릭하면 onClick이 호출된다", async () => {
  const onClick = vi.fn();
  render(
    <Chip variant="overlay" onClick={onClick}>
      음식점
    </Chip>,
  );

  await userEvent.click(page.getByRole("button", { name: "음식점" }));

  expect(onClick).toHaveBeenCalledOnce();
});

test("tone이 strong이면 선택 배경이 더 진하다", async () => {
  render(
    <>
      <Chip selected>기본</Chip>
      <Chip selected tone="strong">
        진하게
      </Chip>
    </>,
  );
  await expect.element(page.getByRole("button", { name: "기본" })).toBeInTheDocument();

  const base = page.getByRole("button", { name: "기본" }).element();
  const strong = page.getByRole("button", { name: "진하게" }).element();

  expect(getComputedStyle(base).backgroundColor).toBe("rgb(96, 96, 96)");
  expect(getComputedStyle(strong).backgroundColor).toBe("rgb(61, 61, 61)");
});

test("삭제 버튼 이름에 칩 라벨이 포함되어 칩마다 구분된다", async () => {
  render(
    <ChipGroup>
      <Chip selected onRemove={() => {}}>
        음식점
      </Chip>
      <Chip selected onRemove={() => {}}>
        카페
      </Chip>
    </ChipGroup>,
  );

  await expect.element(page.getByRole("button", { name: "음식점 삭제" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "카페 삭제" })).toBeInTheDocument();
});
