import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { withLayout } from "../layout/index.decorators";
import type { TabItem, TabsProps } from "./index";
import { Tabs } from "./index";

const items: TabItem[] = [
  { label: "코스A", value: "a", content: "코스A의 장소 목록이 표시됩니다." },
  { label: "코스B", value: "b", content: "코스B의 장소 목록이 표시됩니다." },
  { label: "코스C", value: "c", content: "코스C의 장소 목록이 표시됩니다." },
];

function InteractiveTabs({ items, value: initialValue, onChange, label }: TabsProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div style={{ padding: "20px" }}>
      <Tabs
        items={items}
        label={label}
        value={value}
        onChange={(next) => {
          setValue(next);
          onChange(next);
        }}
      />
    </div>
  );
}

const meta = {
  component: Tabs,
  title: "components/Tabs",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    items,
    label: "코스 선택",
    value: "a",
    onChange: fn(),
  },
} satisfies Meta<typeof Tabs>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <InteractiveTabs {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tabB = canvas.getByRole("tab", { name: "코스B" });
    await userEvent.click(tabB);
    await expect(tabB).toHaveAttribute("aria-selected", "true");

    const tabC = canvas.getByRole("tab", { name: "코스C" });
    await userEvent.click(tabC);
    await expect(tabC).toHaveAttribute("aria-selected", "true");
    await expect(tabB).toHaveAttribute("aria-selected", "false");
  },
};

export default meta;
