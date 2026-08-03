import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import { Chip, ChipGroup } from "./index";

test("라벨 텍스트를 렌더링한다", async () => {
  render(<Chip>음식점</Chip>);

  await expect.element(page.getByRole("button", { name: "음식점" })).toBeInTheDocument();
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

  await expect.element(page.getByRole("button", { name: "삭제" })).toBeInTheDocument();
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

  await userEvent.click(page.getByRole("button", { name: "삭제" }));

  expect(onRemove).toHaveBeenCalledOnce();
  expect(onClick).not.toHaveBeenCalled();
});
