import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import CoffeeIcon from "../../assets/icon-coffee.svg?react";
import EllipsisIcon from "../../assets/icon-ellipsis.svg?react";
import FootprintsIcon from "../../assets/icon-footprints.svg?react";
import GamepadIcon from "../../assets/icon-gamepad-2.svg?react";
import ImageIcon from "../../assets/icon-image.svg?react";
import ShoppingBagIcon from "../../assets/icon-shopping-bag.svg?react";
import UtensilsIcon from "../../assets/icon-utensils.svg?react";
import WineIcon from "../../assets/icon-wine.svg?react";
import { withLayout } from "../layout/index.decorators";
import { Chip, ChipGroup } from "./index";

const ICON_SIZE = 16;

const meta = {
  component: Chip,
  title: "components/Chip",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
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
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

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

export const WithIcon: Story = {
  args: {
    icon: <UtensilsIcon height={ICON_SIZE} width={ICON_SIZE} />,
  },
};

export const WithIconSelected: Story = {
  args: {
    icon: <UtensilsIcon height={ICON_SIZE} width={ICON_SIZE} />,
    selected: true,
    onRemove: fn(),
  },
};

export const CategoryGroup: Story = {
  render: () => (
    <ChipGroup>
      <Chip icon={<UtensilsIcon height={ICON_SIZE} width={ICON_SIZE} />}>음식점</Chip>
      <Chip icon={<CoffeeIcon height={ICON_SIZE} width={ICON_SIZE} />}>카페</Chip>
      <Chip icon={<WineIcon height={ICON_SIZE} width={ICON_SIZE} />}>술/바</Chip>
      <Chip icon={<ImageIcon height={ICON_SIZE} width={ICON_SIZE} />}>문화/전시</Chip>
      <Chip icon={<GamepadIcon height={ICON_SIZE} width={ICON_SIZE} />}>액티비티</Chip>
      <Chip icon={<FootprintsIcon height={ICON_SIZE} width={ICON_SIZE} />}>산책/야경</Chip>
      <Chip icon={<ShoppingBagIcon height={ICON_SIZE} width={ICON_SIZE} />}>팝업/쇼핑</Chip>
      <Chip icon={<EllipsisIcon height={ICON_SIZE} width={ICON_SIZE} />}>기타</Chip>
    </ChipGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <ChipGroup>
      <Chip icon={<UtensilsIcon height={ICON_SIZE} width={ICON_SIZE} />}>md (38px)</Chip>
      <Chip icon={<UtensilsIcon height={ICON_SIZE} width={ICON_SIZE} />} size="sm">
        sm (34px)
      </Chip>
    </ChipGroup>
  ),
};

export const FilterBar: Story = {
  render: () => (
    <ChipGroup>
      <Chip selected tone="strong">
        전체
      </Chip>
      <Chip>음식점</Chip>
      <Chip>카페</Chip>
      <Chip>술/바</Chip>
      <Chip>문화/전시</Chip>
    </ChipGroup>
  ),
};

export const Overlay: Story = {
  render: () => (
    <div style={{ backgroundColor: "#DCE6D0", borderRadius: 8, padding: 16 }}>
      <ChipGroup>
        <Chip
          icon={<UtensilsIcon height={ICON_SIZE} width={ICON_SIZE} />}
          size="sm"
          variant="overlay"
        >
          음식점
        </Chip>
        <Chip
          icon={<CoffeeIcon height={ICON_SIZE} width={ICON_SIZE} />}
          size="sm"
          variant="overlay"
        >
          카페
        </Chip>
        <Chip icon={<WineIcon height={ICON_SIZE} width={ICON_SIZE} />} size="sm" variant="overlay">
          술/바
        </Chip>
      </ChipGroup>
    </div>
  ),
};

export const SelectedTones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <ChipGroup>
        <Chip selected>기본 #606060</Chip>
        <Chip selected tone="strong">
          strong #3D3D3D
        </Chip>
      </ChipGroup>
      <p style={{ color: "#6D6D6D", fontSize: 12, margin: 0 }}>
        시안마다 선택 배경이 달라 두 가지를 모두 지원합니다. 디자이너 확인 후 하나로 통일하고 이
        스토리를 삭제하세요.
      </p>
    </div>
  ),
};

export default meta;
