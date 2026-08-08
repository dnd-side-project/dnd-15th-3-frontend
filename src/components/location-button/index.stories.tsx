import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { withLayout } from "../layout/index.decorators";
import { LocationButton } from "./index";

const meta = {
  component: LocationButton,
  title: "components/LocationButton",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof LocationButton>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <LocationButton {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <LocationButton {...args} />
    </div>
  ),
};

export const OnMap: Story = {
  render: (args) => (
    <div
      style={{
        position: "relative",
        height: "360px",
        background:
          "repeating-linear-gradient(0deg, #E8E8E3 0 1px, transparent 1px 40px)," +
          "repeating-linear-gradient(90deg, #E8E8E3 0 1px, transparent 1px 40px), #F5F5F0",
      }}
    >
      <div style={{ position: "absolute", bottom: "24px", left: "29px" }}>
        <LocationButton {...args} />
      </div>
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "현재 위치" }));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export default meta;
