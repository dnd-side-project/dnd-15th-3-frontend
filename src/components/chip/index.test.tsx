import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vite-plus/test";

import { Chip, ChipGroup } from "./index";

test("라벨 텍스트를 렌더링한다", () => {
  render(<Chip>음식점</Chip>);

  expect(screen.getByRole("button", { name: "음식점" })).toBeInTheDocument();
});

test("미선택 상태는 pressed가 false이고 삭제 버튼이 없다", () => {
  render(<Chip>음식점</Chip>);

  expect(screen.getByRole("button", { name: "음식점", pressed: false })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "삭제" })).not.toBeInTheDocument();
});

test("selected가 true면 pressed가 true다", () => {
  render(<Chip selected>전체</Chip>);

  expect(screen.getByRole("button", { name: "전체", pressed: true })).toBeInTheDocument();
});

test("selected이고 onRemove를 전달하면 삭제 버튼이 렌더링된다", () => {
  render(
    <Chip selected onRemove={() => {}}>
      문화·예술
    </Chip>,
  );

  expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument();
});

test("onRemove가 없으면 selected여도 삭제 버튼이 없다 (전체 칩)", () => {
  render(<Chip selected>전체</Chip>);

  expect(screen.getByRole("button", { name: "전체", pressed: true })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "삭제" })).not.toBeInTheDocument();
});

test("selected가 false면 onRemove를 전달해도 삭제 버튼이 없다", () => {
  render(
    <Chip selected={false} onRemove={() => {}}>
      음식점
    </Chip>,
  );

  expect(screen.queryByRole("button", { name: "삭제" })).not.toBeInTheDocument();
});

test("ChipGroup은 자식 칩들을 함께 렌더링한다", () => {
  render(
    <ChipGroup>
      <Chip>전체</Chip>
      <Chip>음식점</Chip>
    </ChipGroup>,
  );

  expect(screen.getByRole("button", { name: "전체" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "음식점" })).toBeInTheDocument();
});

test("칩 본체를 클릭하면 onClick이 호출된다", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<Chip onClick={onClick}>음식점</Chip>);

  await user.click(screen.getByRole("button", { name: "음식점" }));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("삭제 버튼을 클릭하면 onRemove만 호출되고 onClick은 호출되지 않는다", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  const onRemove = vi.fn();
  render(
    <Chip selected onClick={onClick} onRemove={onRemove}>
      문화·예술
    </Chip>,
  );

  await user.click(screen.getByRole("button", { name: "삭제" }));

  expect(onRemove).toHaveBeenCalledTimes(1);
  expect(onClick).not.toHaveBeenCalled();
});
