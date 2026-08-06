import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import CoffeeIcon from "../../assets/icon-coffee.svg?react";
import FootprintsIcon from "../../assets/icon-footprints.svg?react";
import GamepadIcon from "../../assets/icon-gamepad-2.svg?react";
import ImageIcon from "../../assets/icon-image.svg?react";
import UtensilsIcon from "../../assets/icon-utensils.svg?react";
import WineIcon from "../../assets/icon-wine.svg?react";
import { withLayout } from "../layout/index.decorators";
import { Chip, ChipGroup } from "./index";

const ICON_SIZE = 16;

const categories = [
  { value: "food", label: "음식점", icon: <UtensilsIcon height={ICON_SIZE} width={ICON_SIZE} /> },
  { value: "cafe", label: "카페", icon: <CoffeeIcon height={ICON_SIZE} width={ICON_SIZE} /> },
  { value: "bar", label: "술/바", icon: <WineIcon height={ICON_SIZE} width={ICON_SIZE} /> },
  {
    value: "culture",
    label: "문화/전시",
    icon: <ImageIcon height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    value: "activity",
    label: "액티비티",
    icon: <GamepadIcon height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    value: "walk",
    label: "산책/야경",
    icon: <FootprintsIcon height={ICON_SIZE} width={ICON_SIZE} />,
  },
  { value: "popup", label: "팝업/쇼핑" },
  { value: "etc", label: "기타" },
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
          labelSize="md"
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
    size: { control: "inline-radio", options: ["sm", "md"] },
    labelSize: { control: "inline-radio", options: ["sm", "md"] },
    tone: { control: "inline-radio", options: ["default", "strong"] },
    variant: { control: "inline-radio", options: ["filled", "overlay"] },
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
  render: () => <CategoryPicker />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("button", { name: "음식점" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(canvas.getByRole("button", { name: "삭제" })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "카페" }));
    await expect(canvas.getByRole("button", { name: "카페" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  },
};

export const Overlay: Story = {
  render: () => (
    <div style={{ backgroundColor: "#DCE6D0", padding: 16 }}>
      <ChipGroup>
        {categories.slice(0, 3).map((category) => (
          <Chip key={category.value} icon={category.icon} size="sm" variant="overlay">
            {category.label}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  ),
};

export default meta;
