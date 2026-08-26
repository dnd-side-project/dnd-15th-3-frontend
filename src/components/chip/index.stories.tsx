import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import ActivityIcon from "@/assets/icon-place-activity.svg?react";
import BarIcon from "@/assets/icon-place-bar.svg?react";
import CafeIcon from "@/assets/icon-place-cafe.svg?react";
import CultureIcon from "@/assets/icon-place-culture.svg?react";
import OtherIcon from "@/assets/icon-place-other.svg?react";
import RestaurantIcon from "@/assets/icon-place-restaurant.svg?react";
import ShoppingIcon from "@/assets/icon-place-shopping.svg?react";
import WalkIcon from "@/assets/icon-place-walk.svg?react";
import { withLayout } from "@/components/layout/index.decorators";

import { Chip, ChipGroup } from "./index";

const ICON_SIZE = 20;

const categories = [
  { value: "food", label: "음식점", icon: <RestaurantIcon height={ICON_SIZE} width={ICON_SIZE} /> },
  { value: "cafe", label: "카페", icon: <CafeIcon height={ICON_SIZE} width={ICON_SIZE} /> },
  { value: "bar", label: "술 · 바", icon: <BarIcon height={ICON_SIZE} width={ICON_SIZE} /> },
  {
    value: "culture",
    label: "문화 · 전시",
    icon: <CultureIcon height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    value: "activity",
    label: "액티비티",
    icon: <ActivityIcon height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    value: "walk",
    label: "산책 · 야경",
    icon: <WalkIcon height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    value: "popup",
    label: "팝업 · 쇼핑",
    icon: <ShoppingIcon height={ICON_SIZE} width={ICON_SIZE} />,
  },
  { value: "etc", label: "기타", icon: <OtherIcon height={ICON_SIZE} width={ICON_SIZE} /> },
];

function CategoryPicker() {
  const [selected, setSelected] = useState<string[]>(["food"]);

  const toggle = (value: string) =>
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );

  return (
    <ChipGroup>
      {categories.map((category) => (
        <Chip
          key={category.value}
          icon={category.icon}
          selected={selected.includes(category.value)}
          onClick={() => toggle(category.value)}
          onRemove={() => toggle(category.value)}
        >
          {category.label}
        </Chip>
      ))}
    </ChipGroup>
  );
}

const meta = {
  component: Chip,
  title: "components/Chip",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: "음식점",
    onClick: fn(),
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["filled", "solid", "overlay"] },
    selected: { control: "boolean" },
  },
} satisfies Meta<typeof Chip>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole("button", { name: "음식점" });

    await expect(chip).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(chip);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Categories: Story = {
  parameters: { controls: { disable: true } },
  render: () => <CategoryPicker />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("button", { name: "음식점" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(canvas.getByRole("button", { name: "음식점 삭제" })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "카페" }));
    await expect(canvas.getByRole("button", { name: "카페" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  },
};

export const FilterBar: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ padding: "0 0 0 20px" }}>
      <ChipGroup scroll>
        <Chip selected>전체</Chip>
        {categories.map((category) => (
          <Chip key={category.value}>{category.label}</Chip>
        ))}
      </ChipGroup>
    </div>
  ),
};

export const CourseOrder: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ backgroundColor: "#DCE6D0", padding: 16 }}>
      <ChipGroup connected>
        {categories.slice(0, 5).map((category) => (
          <Chip key={category.value} icon={category.icon} variant="solid">
            {category.label}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  ),
};

export const Overlay: Story = {
  args: {
    variant: "overlay",
    icon: <RestaurantIcon height={ICON_SIZE} width={ICON_SIZE} />,
  },
  render: (args) => (
    <div
      style={{
        background:
          "repeating-linear-gradient(45deg, #DCE6D0 0 9px, #6E9455 9px 18px, #E9D9B8 18px 27px)",
        padding: 16,
      }}
    >
      <ChipGroup>
        <Chip {...args} />
      </ChipGroup>
    </div>
  ),
};

export default meta;
