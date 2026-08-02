import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Chip, ChipGroup } from "./index";

const meta = {
  component: Chip,
  title: "components/Chip",
  args: {
    children: "음식점",
    selected: false,
    onClick: fn(),
  },
  argTypes: {
    selected: { control: "boolean" },
  },
} satisfies Meta<typeof Chip>;

type Story = StoryObj<typeof meta>;

/** 미선택 상태: 연회색 배경, 어두운 텍스트, 아이콘 없음 */
export const Unselected: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "음식점" });

    await expect(button).toHaveAttribute("aria-pressed", "false");
    await expect(canvas.queryByRole("button", { name: "삭제" })).not.toBeInTheDocument();

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** 미선택 상태에서 onRemove가 전달돼도 × 아이콘은 절대 보이지 않아야 한다 */
export const UnselectedWithOnRemoveIgnored: Story = {
  args: {
    selected: false,
    onRemove: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("button", { name: "음식점" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    await expect(canvas.queryByRole("button", { name: "삭제" })).not.toBeInTheDocument();
  },
};

/** 선택 + 삭제 가능 상태: 진회색 배경, 흰 텍스트, 우측 × 아이콘 */
export const SelectedRemovable: Story = {
  args: {
    selected: true,
    onRemove: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByRole("button", { name: "음식점" });
    const remove = canvas.getByRole("button", { name: "삭제" });

    await expect(label).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(remove);
    await expect(args.onRemove).toHaveBeenCalledTimes(1);
    // × 클릭이 라벨의 onClick까지 트리거하지 않아야 한다.
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** "전체" 상태: 선택 스타일과 동일하지만 삭제 불가(× 없음) */
export const SelectedNotRemovable: Story = {
  args: {
    children: "전체",
    selected: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "전체" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(canvas.queryByRole("button", { name: "삭제" })).not.toBeInTheDocument();
  },
};

/** 카테고리 필터처럼 여러 칩을 flex-wrap으로 나열한 그룹 예시 */
export const Group: Story = {
  render: () => (
    <ChipGroup>
      <Chip selected>전체</Chip>
      <Chip>음식점</Chip>
      <Chip>카페</Chip>
      <Chip>술집</Chip>
      <Chip selected onRemove={() => {}}>
        문화·예술
      </Chip>
      <Chip>액티비티</Chip>
      <Chip>산책·드라이브</Chip>
      <Chip>모임소통</Chip>
      <Chip>기타</Chip>
    </ChipGroup>
  ),
};

export default meta;
