import type { Meta, StoryObj } from "@storybook/react-vite";

import { Greeting } from "./index";

const meta = {
  component: Greeting,
  title: "components/Greeting",
  args: {
    name: "DND",
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["normal", "primary"],
    },
    size: {
      control: "inline-radio",
      options: ["md", "lg"],
    },
  },
} satisfies Meta<typeof Greeting>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    tone: "primary",
    size: "lg",
  },
};

export default meta;
