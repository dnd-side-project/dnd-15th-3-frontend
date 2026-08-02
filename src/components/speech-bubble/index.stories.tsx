import type { Meta, StoryObj } from "@storybook/react-vite";

import { CtaButton } from "../cta-button/index";
import { SpeechBubble } from "./index";

const meta = {
  component: SpeechBubble,
  title: "components/SpeechBubble",
  args: {
    children: "코스 둘러보는 중",
  },
} satisfies Meta<typeof SpeechBubble>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomIcon: Story = {
  args: {
    children: "저장 완료!",
    icon: "✓",
  },
};

export const WithCtaButton: Story = {
  render: (args) => (
    <div>
      <SpeechBubble {...args} />
      <CtaButton>다음</CtaButton>
    </div>
  ),
};

export default meta;
