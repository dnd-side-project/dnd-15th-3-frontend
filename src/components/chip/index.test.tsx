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

test("filled 칩의 높이는 38px다", async () => {
  render(<Chip>음식점</Chip>);

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
  const chip = page.getByRole("button", { name: "음식점" }).element();

  expect(chip.getBoundingClientRect().height).toBe(38);
});

test("overlay 칩의 높이는 33px다", async () => {
  render(<Chip variant="overlay">음식점</Chip>);

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
  const chip = page.getByRole("button", { name: "음식점" }).element();

  expect(chip.getBoundingClientRect().height).toBe(33);
});

test("가로 패딩이 디자인값 11px과 일치한다", async () => {
  render(<Chip>음식점</Chip>);

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
  const chip = page.getByRole("button", { name: "음식점" }).element();

  const style = getComputedStyle(chip);
  expect(style.paddingLeft).toBe("11px");
  expect(style.paddingRight).toBe("11px");
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

test("선택 상태에 따라 배경과 글자색이 바뀐다", async () => {
  render(
    <>
      <Chip selected>카페</Chip>
      <Chip>음식점</Chip>
    </>,
  );
  await expect.element(page.getByRole("button", { name: "카페" })).toBeInTheDocument();

  const on = getComputedStyle(page.getByRole("button", { name: "카페" }).element());
  const off = getComputedStyle(page.getByRole("button", { name: "음식점" }).element());

  expect(on.backgroundColor).toBe("rgb(219, 236, 255)");
  expect(on.color).toBe("rgb(55, 147, 255)");
  expect(off.backgroundColor).toBe("rgb(236, 239, 245)");
  expect(off.color).toBe("rgb(112, 125, 145)");
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
