import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { withLayout } from "../layout/index.decorators";
import type { TabItem } from "./index";
import { Tabs } from "./index";

const items: TabItem[] = [
  { label: "코스A", value: "a" },
  { label: "코스B", value: "b" },
  { label: "코스C", value: "c" },
];

const meta = {
  component: Tabs,
  title: "components/Tabs",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    items,
    value: "a",
    onChange: fn(),
  },
} satisfies Meta<typeof Tabs>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecondSelected: Story = {
  args: {
    value: "b",
  },
};

export const ThirdSelected: Story = {
  args: {
    value: "c",
  },
};

export const Interactive: Story = {
  render: (args) => {
    function InteractiveTabs() {
      const [value, setValue] = useState(args.value);

      return (
        <Tabs
          items={args.items}
          value={value}
          onChange={(next) => {
            setValue(next);
            args.onChange(next);
          }}
        />
      );
    }

    return <InteractiveTabs />;
  },
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
