import type { Meta, StoryObj } from "@storybook/react-vite";

import { withLayout } from "../layout/index.decorators";
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

// 앱 프레임(모바일 폭 + 레터박스) 안에서 렌더링하는 예시
export const InFrame: Story = {
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
