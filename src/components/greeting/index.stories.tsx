import type { Meta, StoryObj } from "@storybook/react-vite";

import { Greeting } from "./index";

const meta = {
  component: Greeting,
  title: "components/Greeting",
} satisfies Meta<typeof Greeting>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "DND",
  },
};

export default meta;
