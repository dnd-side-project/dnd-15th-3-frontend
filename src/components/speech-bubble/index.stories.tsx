import type { Meta, StoryObj } from "@storybook/react-vite";

import LoaderIcon from "../../assets/icon-loader-circle.svg?react";
import { withLayout } from "../layout/index.decorators";
import { SpeechBubble } from "./index";

const meta = {
  component: SpeechBubble,
  title: "components/SpeechBubble",
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <Story />
      </div>
    ),
    withLayout,
  ],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: "원하는 모습을 선택해보세요!",
  },
} satisfies Meta<typeof SpeechBubble>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    children: "코스 불러오는 중",
    icon: <LoaderIcon aria-hidden height={20} width={20} />,
  },
};

export default meta;
