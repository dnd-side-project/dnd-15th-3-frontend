import type { Meta, StoryObj } from "@storybook/react-vite";

import { withLayout } from "../layout/index.decorators";
import { PreferenceButton } from "./index";

const meta = {
  component: PreferenceButton,
  title: "components/PreferenceButton",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    count: 3,
    selected: false,
    type: "like",
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["like", "dislike"],
    },
    selected: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    count: {
      control: "number",
    },
  },
} satisfies Meta<typeof PreferenceButton>;

type Story = StoryObj<typeof meta>;

export const Like: Story = {};

export const LikeSelected: Story = {
  args: {
    selected: true,
    type: "like",
  },
};

export const Dislike: Story = {
  args: {
    type: "dislike",
  },
};

export const DislikeSelected: Story = {
  args: {
    selected: true,
    type: "dislike",
  },
};

export default meta;
