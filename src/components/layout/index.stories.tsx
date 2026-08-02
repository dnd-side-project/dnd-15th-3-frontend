import type { Meta, StoryObj } from "@storybook/react-vite";

import { Layout } from "./index";

const meta = {
  component: Layout,
  title: "components/Layout",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: "홈",
  },
} satisfies Meta<typeof Layout>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
