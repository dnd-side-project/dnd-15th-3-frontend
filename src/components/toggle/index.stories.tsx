import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { withLayout } from "../layout/index.decorators";
import type { ToggleProps } from "./index";
import { Toggle } from "./index";

function InteractiveToggle({ value: initialValue, onChange }: ToggleProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <Toggle
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange(next);
      }}
    />
  );
}

const meta = {
  component: Toggle,
  title: "components/Toggle",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    value: "map",
    onChange: fn(),
  },
} satisfies Meta<typeof Toggle>;

type Story = StoryObj<typeof meta>;

export const MapSelected: Story = {
  args: {
    value: "map",
  },
};

export const ListSelected: Story = {
  args: {
    value: "list",
  },
};

export const Interactive: Story = {
  render: (args) => <InteractiveToggle {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const mapButton = canvas.getByRole("button", { name: "지도로 보기" });
    const listButton = canvas.getByRole("button", { name: "목록으로 보기" });

    await expect(mapButton).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(listButton);
    await expect(listButton).toHaveAttribute("aria-pressed", "true");
    await expect(mapButton).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(mapButton);
    await expect(mapButton).toHaveAttribute("aria-pressed", "true");
    await expect(listButton).toHaveAttribute("aria-pressed", "false");
  },
};

export default meta;
